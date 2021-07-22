const MessageModel = require("../models/Message");
const errorHandler = require("../utils/errorHandler");

module.exports.getMessages = async (req, res) => {
  const messages = await MessageModel.find({ dialog: req.query.dialog_id })
    .populate(["dialog", "user"])
    .exec(function (err, messages) {
      if (err) {
        return res.status(404).json({
          status: "error",
          message: "Messages not found",
        });
      }
      res.status(200).json(messages);
    });

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
    await message.populate(["user", "dialog"]).execPopulate();

    // Socket.io send message

    res.status(200).json(message);
  } catch (e) {
    errorHandler(e);
  }
};

module.exports.deleteMessage = async (req, res) => {};
