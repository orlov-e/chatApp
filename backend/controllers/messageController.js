const MessageModel = require("../models/Message");
const DialogModel = require("../models/Dialog");
const errorHandler = require("../utils/errorHandler");

module.exports.getMessages = async (req, res) => {
  const messages = await MessageModel.find({
    dialog: req.query.dialog_id,
  }).populate(["dialog", "user"]);
  if (!messages) {
    res.status(404).json({
      status: "error",
      message: "messages not found",
    });
  }
  res.status(200).json(messages);
};

module.exports.createMessage = async (req, res) => {
  const postData = {
    text: req.body.text,
    dialog: req.body.dialogId,
    user: req.user._id,
  };

  const message = new MessageModel(postData);

  try {
    await message.save();
    await DialogModel.findOneAndUpdate(
      { _id: postData.dialog },
      { lastMessage: message._id },
      { upsert: true },
      function (err) {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: err,
          });
        }
      }
    );
    await message.populate(["user", "dialog"]).execPopulate();

    req.io.emit("SERVER:SEND_MESSAGE", message);
    req.io.emit("SERVER:DIALOG_UPDATE_TIME", message.createdAt);

    res.status(200).json({
      status: "success",
      message: "message created",
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.deleteMessage = async (req, res) => {};
