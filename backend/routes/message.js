const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/messageController");
const updateLastSeen = require("../middleware/updateLastSeen");

//localhost:3001/api/messages
router.get(
  "/messages",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.getMessages
);
//localhost:3001/api/messages
router.post(
  "/messages",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.createMessage
);
//localhost:3001/api/messages
router.delete(
  "/messages",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.deleteMessage
);

module.exports = router;
