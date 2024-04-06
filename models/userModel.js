const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, "Username is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

module.exports = mongoose.model('User', userSchema)
