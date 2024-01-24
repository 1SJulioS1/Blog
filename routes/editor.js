const express = require("express");
const router = express.Router();
const verifySelfOrAdministrator = require("../middleware/verifySelfOrAdministrator");
const verifyAdministrator = require("../middleware/verifySelfOrAdministrator");
const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/user/userController");

router.route("/").post(verifyAdministrator, createUser);

router
  .route("/:id")
  .get(verifySelfOrAdministrator, getUser)
  .put(verifySelfOrAdministrator, updateUser);

module.exports = router;
