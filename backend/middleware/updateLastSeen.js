const express = require("express");
const User = require("../models/User");

module.exports = async(req, res, next) => {
  if (req.user) {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        last_seen: new Date(),
      },
      { new: true, useFindAndModify: false }
    );
  }
  next();
};
