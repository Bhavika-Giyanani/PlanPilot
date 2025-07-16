const User = require("../model/userModel.js");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const generateToken = (userId) => {
  return jwt.sign({ user_id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//^ Create
const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//^ Read
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "Incorrect email or password." });

    const passwordCorrect = await user.comparePassword(req.body.password);
    if (!passwordCorrect)
      return res.status(400).json({ message: "Incorrect email or password." });

    const token = await generateToken(user._id);
    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Login failed. " + error.message });
  }
};

module.exports = {
  createUser,
  getUser,
};
