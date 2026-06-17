const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require(
  "../utils/generateToken"
);

exports.register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const exists =
      await User.findOne({
        email
      });

    if (exists) {
      return res.status(400).json({
        message:
          "User Already Exists"
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword
      });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(
        user._id
      )
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid Credentials"
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(400).json({
        message:
          "Invalid Credentials"
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(
        user._id
      )
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProfile =
  async (req, res) => {
    res.json(req.user);
  };