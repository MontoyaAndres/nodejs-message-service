const express = require("express");
const mongoose = require("mongoose");
const argon2 = require("argon2");
const cors = require("cors");

const { user } = require("./models/user");
const { message: messageModel } = require("./models/message");
const { createToken, isAuth } = require("./auth");

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())
  .post("/register", async function(request, response) {
    const { email, password } = request.body;

    if (!/^\S{3,}@test.com+$/.test(email)) {
      return response.send({
        response: false,
        error: "You only can register with @test.com emails"
      });
    }

    const userData = await user.findOne({ email });

    if (userData) {
      return response.send({
        response: false,
        error: "The user already exists"
      });
    }

    await user.create({ email, password });

    return response.send({ response: true });
  })
  .post("/login", async function(request, response) {
    const { email, password } = request.body;

    const userData = await user.findOne({ email });

    if (!userData) {
      return response.send({ response: false, error: "Wrong user" });
    }

    const isPassword = await argon2.verify(userData.password, password);

    if (!isPassword) {
      return response.send({ response: false, error: "Wrong user" });
    }

    const { accessToken } = createToken(userData);

    return response.send({ response: true, token: accessToken });
  })
  .post("/message/:receiverId", isAuth, async function(request, response) {
    const { message } = request.body;
    const { receiverId } = request.params;
    const senderId = request.user;

    await messageModel.create({ message, receiverId, senderId });

    return response.send({ response: true });
  })
  .get("/message/:receiverId", isAuth, async function(request, response) {
    const { receiverId } = request.params;
    const senderId = request.user;

    const data = await messageModel
      .find({
        $or: [
          { $and: [{ receiverId }, { senderId }] },
          { $and: [{ senderId: receiverId }, { receiverId: senderId }] }
        ]
      })
      .sort({ createdAt: -1 });

    return response.send({ response: true, data });
  })
  .get("/users", isAuth, async function(_, response) {
    const data = await user.find({}, { password: 0 });

    return response.send({ response: true, data });
  });

mongoose
  .connect("mongodb://localhost/service", { useNewUrlParser: true })
  .then(() => app.listen(process.env.PORT || 3000));
