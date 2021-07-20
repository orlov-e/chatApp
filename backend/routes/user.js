const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const passport = require("passport");
const updateLastSeen = require("../middleware/updateLastSeen");

//localhost:3001/api/auth/login
router.post("/login", controller.login)
//localhost:3001/api/auth/register
router.post("/register", controller.register)
//localhost:3001/api/auth/register
router.get("/me", passport.authenticate("jwt", {session: false}), updateLastSeen, controller.getMe)

module.exports = router;