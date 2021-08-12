const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const passport = require("passport");
const updateLastSeen = require("../middleware/updateLastSeen");
const upload = require("../utils/multer");

//localhost:3001/api/auth/login
router.post("/auth/login", controller.login);
//localhost:3001/api/auth/register
router.post("/auth/register", controller.register);
//localhost:3001/api/auth/register
router.get(
  "/auth/me",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.getMe
);
//localhost:3001/api/auth/logout
router.get(
  "/auth/logout",
  passport.authenticate("jwt", { session: false }),
  controller.logout
);
//localhost:3001/api/findUsers?query=
router.get(
  "/findUsers",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.findUsers
);
//localhost:3001/api/upload_avatar
router.post(
  "/upload_avatar",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  upload.single("image"),
  controller.uploadAvatar
);

module.exports = router;
