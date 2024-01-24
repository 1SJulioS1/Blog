const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const verifySelfOrAdministrator = require("../middleware/verifySelfOrAdministrator");
const verifyAdministrator = require("../middleware/verifySelfOrAdministrator");
const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/user/userController");

router.route("/").post(verifyRoles(ROLES_LIST.Admin), createUser);

router
  .route("/:id")
  .get(verifySelfOrAdministrator, getUser)
  .put(verifySelfOrAdministrator, updateUser);

module.exports = router;
