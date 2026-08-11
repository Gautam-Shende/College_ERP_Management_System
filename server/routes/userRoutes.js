const express = require("express");
const router = express.Router();

// Import controller functions for user and employee management
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  getCurrentUser,
} = require("../controllers/userController");

const { validateEmployee } = require("../middleware/validation");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// Public Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Authenticated Current User Profile
router.get("/me", authMiddleware, getCurrentUser);

// Principal-only User Management Routes (base path is /api/users)
// router.get("/", authMiddleware, authorize("principal"), getUsers);
router.get("/", getUsers);
router.get("/:id", authMiddleware, authorize("principal"), getUserById);
router.post("/", authMiddleware, authorize("principal"), validateEmployee, createUser);
router.put("/:id", authMiddleware, authorize("principal"), updateUser);
router.patch("/:id/status", authMiddleware, authorize("principal"), updateUserStatus);
router.delete("/:id", authMiddleware, authorize("principal"), deleteUser);

module.exports = router;

