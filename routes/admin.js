const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { getAllAdmins } = require("../controllers/admin/adminController");
const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/user/userController");
router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), getAllAdmins)
  .post(verifyRoles(ROLES_LIST.Admin), createUser);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), getUser)
  .put(verifyRoles(ROLES_LIST.Admin), updateUser);

module.exports = router;
