const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/dialogController");
const updateLastSeen = require("../middleware/updateLastSeen");

//localhost:3001/api/dialogs
router.get(
  "/dialogs",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.getAllDialogs
);
//localhost:3001/api/dialogs
router.post(
  "/dialogs",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.createDialog
);
//localhost:3001/api/dialogs/:id
router.delete(
  "/dialogs/:id",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.deleteDialog
);
//localhost:3001/api/dialogs/search
router.get(
  "/dialogs/search",
  passport.authenticate("jwt", { session: false }),
  updateLastSeen,
  controller.searchDialogs
);

module.exports = router;
