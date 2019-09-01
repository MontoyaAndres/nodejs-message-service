const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashed = await argon2.hash(this.password);
    this.password = hashed;

    return next();
  } catch (err) {
    return next(err);
  }
});

const user = mongoose.model("User", userSchema);

module.exports = { user };
