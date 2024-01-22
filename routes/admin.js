const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const {
  getAllAdmins,
  getAdmin,
  getAdminId,
  createAdmin,
  updateAdmin,
} = require("../controllers/admin/adminController");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), getAllAdmins)
  .post(verifyRoles(ROLES_LIST.Admin), createAdmin);

router.route("/id").post(verifyRoles(ROLES_LIST.Admin), getAdminId);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), getAdmin)
  .put(verifyRoles(ROLES_LIST.Admin), updateAdmin);

module.exports = router;
