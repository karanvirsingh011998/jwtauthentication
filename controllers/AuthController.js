const User = require("../models/userModel");
const Todo = require("../models/todoModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, userName, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, userName, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ message: "Fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ message: "Incorrect email or password" });
    }
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
      return res.json({ message: "Incorrect password" });
    }

    const token = createSecretToken(existingUser._id);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });
    res
      .status(200)
      .json({
        message: "User logged in Succesful...!",
        secure: true,
        token: token,
      });
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports.userVerification = (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status == 400;
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      res.status = 400;
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user });
      else return res.json({ status: false });
    }
  });
};

module.exports.todoList = (req, res) => {
  const { todoName, token } = req.body;
  if (!token) {
    res.status == 401;
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      res.status = 400;
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      const todo = await Todo.create({ todoName, createdBy: user?._id });
      if (todo)
        return res.json({ message: "Todo Created", status: true, todo: todo });
      else return res.json({ status: false });
    }
  });
};
