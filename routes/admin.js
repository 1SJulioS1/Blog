const express = require("express");
const router = express.Router();
const {
  getAllUsersByRole,
  removeUser,
} = require("../controllers/admin/adminController");
const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/user/userController");
const verifyAdministrator = require("../middleware/verifySelfOrAdministrator");

router.route("/").post(verifyAdministrator, createUser);

router.route("/users").get(verifyAdministrator, getAllUsersByRole);
router
  .route("/:id")
  .get(verifyAdministrator, getUser)
  .put(verifyAdministrator, updateUser)
  .delete(verifyAdministrator, removeUser);

module.exports = router;
