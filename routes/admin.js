const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { getAllAdmins } = require("../controllers/admin/adminController");

router.route("/").get(verifyRoles(ROLES_LIST.Admin), getAllAdmins);

module.exports = router;
