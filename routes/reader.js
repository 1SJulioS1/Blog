const express = require("express");
const router = express.Router();
const verifySelfOrAdministrator = require("../middleware/verifySelfOrAdministrator");
const verifyAdministrator = require("../middleware/verifySelfOrAdministrator");
const { createReader } = require("../controllers/reader/readerController");
router.route("/").post(createReader);

module.exports = router;
