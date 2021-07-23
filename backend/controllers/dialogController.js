const DialogModel = require("../models/Dialog");
const MessageModel = require("../models/Message");
const errorHandler = require("../utils/errorHandler");

module.exports.getAllDialogs = async function (req, res) {
  await DialogModel.find()
    .or([{ initiator: req.user._id }, { partner: req.user._id }])
    .sort({ updatedAt: "descending" })
    .populate(["partner", "initiator"])
    .exec(function (err, dialogs) {
      if (err) {
        return res.status(404).json({
          message: "Dialogs not found",
        });
      }
      res.status(200).json(dialogs);
    });
};

module.exports.createDialog = async function (req, res) {
  const postData = {
    initiator: req.user._id,
    partner: req.body.partner,
  };

  let dialog = await DialogModel.findOne(postData, (err, dialog) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  });

  if (dialog) {
    res.status(409).json({ message: "dialog is already exsists" });
  } else {
    dialog = new DialogModel({
      initiator: req.user._id,
      partner: req.body.partner,
    });

    try {
      await dialog.save().then((dialogObj) => {
        const message = new MessageModel({
          text: req.body.text,
          dialog: dialogObj._id,
          user: req.user._id,
        });

        message
          .save()
          .then(() => {
            dialogObj.lastMessage = message._id;
            dialogObj.save().then(() => {
              res.status(201).json({ message: "dialog was created" });
              req.io.emit("SERVER:DIALOG_CREATED", dialogObj);
            });
          })
          .catch((e) => {
            errorHandler(res, e);
          });
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

module.exports.deleteDialog = async function (req, res) {
  const id = req.params.id;
  DialogModel.findOneAndRemove({ _id: id })
    .then((dialog) => {
      if (dialog) {
        res.json({
          message: `Dialog deleted`,
        });
      }
    })
    .catch(() => {
      res.json({
        message: `Dialog not found`,
      });
    });
};
