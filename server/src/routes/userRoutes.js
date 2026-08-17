const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
} = require("../controllers/userController");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/validation");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// Public Auth Routes
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

// Authenticated Profile Route
router.get("/me", authMiddleware, getCurrentUser);

// Principal-only User Management Routes
router.get("/", authMiddleware, authorize("principal"), getUsers);
router.get("/:id", authMiddleware, authorize("principal"), getUserById);
router.put("/:id", authMiddleware, authorize("principal"), updateUser);
router.patch("/:id/status", authMiddleware, authorize("principal"), updateUserStatus);
router.delete("/:id", authMiddleware, authorize("principal"), deleteUser);

module.exports = router;

