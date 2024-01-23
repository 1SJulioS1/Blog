const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const verifySelfOrAdministrator = require("../middleware/verifySelfOrAdministrator");
const {
  createEditor,
  getEditors,
  getEditor,
} = require("../controllers/editor/editorController");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.Admin), createEditor)
  .get(verifyRoles(ROLES_LIST.Admin), getEditors);

router.route("/:id").get(verifySelfOrAdministrator, getEditor);

module.exports = router;
