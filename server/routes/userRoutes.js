const express = require("express");

const router = express.Router();
const authorize = require("../middleware/authorize")

const {
  registerUser,
  getUsers,
  createUser,
  getUserById,
  loginUser,
  updateUserStatus
} = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch(
  "/:id/status",
  authenticate,
  authorize("principal"),
  updateUserStatus,
);
module.exports = router;
