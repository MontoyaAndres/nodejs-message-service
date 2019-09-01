const express = require("express");
const mongoose = require("mongoose");
const argon2 = require("argon2");

const { user } = require("./models/user");
const { message: messageModel } = require("./models/message");
const { createToken, isAuth } = require("./auth");

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .post("/register", async function(request, response) {
    const { email, password } = request.body;

    if (!/^\S{3,}@test.com+$/.test(email)) {
      response.send({
        response: false,
        error: "You only can register with @test.com emails"
      });
    }

    const userData = await user.findOne({ email });

    if (userData) {
      response.send({ response: false, error: "The user already exists" });
    }

    await user.create({ email, password });

    response.send({ response: true });
  })
  .post("/login", async function(request, response) {
    const { email, password } = request.body;

    const userData = await user.findOne({ email });
    const isPassword = await argon2.verify(userData.password, password);

    if (!userData || !isPassword) {
      response.send({ response: false, error: "Wrong user" });
    }

    const { accessToken } = createToken(userData);

    response.send({ response: true, token: accessToken });
  })
  .post("/message/:receiverId", isAuth, async function(request, response) {
    const { message } = request.body;
    const { receiverId } = request.params;
    const senderId = request.user;

    await messageModel.create({ message, receiverId, senderId });

    response.send({ response: true });
  })
  .get("/message/:receiverId", isAuth, async function(request, response) {
    const { receiverId } = request.params;
    const senderId = request.user;

    const data = await messageModel.find({ receiverId, senderId });

    response.send({ response: true, data });
  })
  .get("/users", isAuth, async function(_, response) {
    const data = await user.find({}, { password: 0 });

    response.send({ response: true, data });
  });

mongoose
  .connect("mongodb://localhost/service", { useNewUrlParser: true })
  .then(() => app.listen(process.env.PORT || 3000));
