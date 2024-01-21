const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const {
  getAllAdmins,
  getAdmin,
} = require("../controllers/admin/adminController");

router.route("/").get(verifyRoles(ROLES_LIST.Admin), getAllAdmins);
router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getAdmin);
module.exports = router;
