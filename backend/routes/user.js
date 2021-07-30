const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const passport = require("passport");
const updateLastSeen = require("../middleware/updateLastSeen");

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
//localhost:3001/api/auth/findUsers?query=
router.get(
  "/findUsers",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.findUsers
);

module.exports = router;
