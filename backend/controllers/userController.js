const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email,
  });

  if (candidate) {
    // Password check, user is exsists
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      // Token generation
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      res.status(401).json({
        message: "passwords did't match",
      });
    }
  } else {
    // user not exists
    res.status(404).json({
      message: "user not exists, invalid email",
    });
  }
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email,
  });

  if (candidate) {
    // user already exists
    res.status(409).json({
      message: "user already exists",
    });
  } else {
    // creating a new user
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      sendEmails: req.body.sendEmails,
    });
    try {
      await user.save();
      res.status(201).json({
        message: "user was created",
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

module.exports.getMe = async function (req, res) {
  const id = req.user._id;
  const user = await User.findById(id);

  if (!user) {
    res.status(403).json({
      message: "user not found",
    });
  } else {
    res.status(200).json(user);
  }
};
