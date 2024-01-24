const express = require("express");
const router = express.Router();
const verifySelfOrAdministrator = require("../middleware/verifySelfOrAdministrator");
const verifyAdministrator = require("../middleware/verifySelfOrAdministrator");
const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/user/userController");

router.route("/").post(createUser);
router
  .route("/:id")
  .get(verifySelfOrAdministrator, getUser)
  .put(verifySelfOrAdministrator, updateUser);
/*  .delete(verifyAdministrator, removeReader)
  .patch(verifySelfOrAdministrator, partialUpdateReader)
*/

module.exports = router;
