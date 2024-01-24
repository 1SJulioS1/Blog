const express = require("express");
const router = express.Router();
const verifySelfOrAdministrator = require("../middleware/verifySelfOrAdministrator");
const verifyAdministrator = require("../middleware/verifySelfOrAdministrator");
const {
  createReader,
  getReader,
} = require("../controllers/reader/readerController");
router.route("/").post(createReader);
router.route("/:id").get(verifySelfOrAdministrator, getReader);

module.exports = router;
