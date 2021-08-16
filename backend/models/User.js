const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const differenceInMinutes = require("date-fns/differenceInMinutes");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    sendEmails: {
      type: Boolean,
    },
    avatar: String,
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

userSchema.virtual("isOnline").get(function () {
  return differenceInMinutes(new Date(), this.last_seen) < 4;
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.sendEmails;

  return userObject;
};

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Users", userSchema);
