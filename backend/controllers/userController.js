const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const errorHandler = require("../utils/errorHandler");
const cloudinary = require("../core/cloudinary");

module.exports.login = async function (req, res) {
  const candidate = await UserModel.findOne({
    email: req.body.email,
  });

  if (req.body.rememberMe) {
    expiresIn = "7d";
  } else {
    expiresIn = "1h";
  }

  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: expiresIn,
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
    res.status(404).json({
      message: "user not exists, invalid email",
    });
  }
};

module.exports.register = async function (req, res) {
  const candidate = await UserModel.findOne({
    email: req.body.email,
  });

  if (candidate) {
    res.status(409).json({
      message: "user already exists",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new UserModel({
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
  const user = await UserModel.findById(id);

  if (!user) {
    res.status(403).json({
      message: "user not found",
    });
  } else {
    res.status(200).json(user);
  }
};

module.exports.logout = async function (req, res) {
  req.logout();
  res.status(200).json({ message: "Logout Successful" });
};

module.exports.findUsers = async function (req, res) {
  const query = req.query.query;

  const firstWord = query.split(" ")[0];
  const secondWord = query.split(" ")[1];

  const users = await UserModel.find().or([
    { email: new RegExp(query, "i") },
    {
      firstName: new RegExp(firstWord, "i"),
      lastName: new RegExp(secondWord, "i"),
    },
    {
      firstName: new RegExp(secondWord, "i"),
      lastName: new RegExp(firstWord, "i"),
    },
  ]);

  if (!users) {
    res.status(404).json({
      status: "error",
      message: "users not found",
    });
  }

  res.status(200).json(users);
};

module.exports.uploadAvatar = async function (req, res) {
  const id = req.user._id;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    if (!result) {
      res.status(404).json({ message: "Cannot upload this file" });
    }

    const user = await UserModel.findById(id);

    user.avatar = result.secure_url;
    await user.save();
    res.json(user);
  } catch (e) {
    errorHandler(res, e);
  }
};
