const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const {
  createEditor,
  getEditors,
} = require("../controllers/editor/editorController");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.Admin), createEditor)
  .get(verifyRoles(ROLES_LIST.Admin), getEditors);

module.exports = router;
