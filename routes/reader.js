const express = require("express");
const router = express.Router();
const verifySelfOrAdministrator = require("../middleware/verifySelfOrAdministrator");
const verifyAdministrator = require("../middleware/verifySelfOrAdministrator");
const {
  createReader,
  getReader,
  removeReader,
  partialUpdateReader,
} = require("../controllers/reader/readerController");
router.route("/").post(createReader);
router
  .route("/:id")
  .get(verifySelfOrAdministrator, getReader)
  .delete(verifyAdministrator, removeReader)
  .patch(verifySelfOrAdministrator, partialUpdateReader);

module.exports = router;
