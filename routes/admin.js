const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const { getAllAdmins } = require("../controllers/admin/adminController");
const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/user/userController");
const verifyAdministrator = require("../middleware/verifySelfOrAdministrator");

router
  .route("/")
  .get(verifyAdministrator, getAllAdmins)
  .post(verifyAdministrator, createUser);

router
  .route("/:id")
  .get(verifyAdministrator, getUser)
  .put(verifyAdministrator, updateUser);

module.exports = router;
