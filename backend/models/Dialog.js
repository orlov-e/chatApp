const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dialogSchema = new Schema(
  {
    initiator: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Messages",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dialogs", dialogSchema);
