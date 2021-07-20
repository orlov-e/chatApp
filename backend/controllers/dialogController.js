const Dialog = require("../models/Dialog");
const errorHandler = require("../utils/errorHandler");

module.exports.getAllDialogs = async function (req, res) {
  const dialogs = await Dialog.find({ initiator: req.user._id })
    .populate("partner")
    .exec(function (err, dialogs) {
      if (err) {
        return res.status(404).json({
          message: "Dialogs not found",
        });
      }
      return res.status(200).json(dialogs);
    });
};

module.exports.createDialog = async function (req, res) {
  const postData = {
    initiator: req.user._id,
    partner: req.body.partner,
  };

  let dialog = await Dialog.findOne(
    {
      initiator: req.user._id,
      partner: req.body.partner,
    },
    (err, dialog) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err,
        });
      }
    }
  );

  if (dialog) {
    res.status(409).json({ message: "dialog is already exsists" });
  } else {
    dialog = new Dialog({
      initiator: req.user._id,
      partner: req.body.partner,
    });

    try {
      await dialog.save();

      res.status(201).json({ message: "dialog was created" });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

module.exports.deleteDialog = async function (req, res) {
  const postData = {
    initiator: req.user._id,
    partner: req.body.partner,
  };

  let dialog = await Dialog.findOne(
    {
      initiator: req.user._id,
      partner: req.body.partner,
    },
    (err, dialog) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err,
        });
      }
    }
  );

  if (dialog) {
    res.status(409).json({ message: "dialog is already exsists" });
  } else {
    dialog = new Dialog({
      initiator: req.user._id,
      partner: req.body.partner,
    });

    try {
      await dialog.save();

      res.status(201).json({ message: "dialog was created" });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

module.exports.deleteDialog = async function (req, res) {};
