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
router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);

// Authenticated Current User Profile
router.get("/api/users/me", authMiddleware, getCurrentUser);

// Principal-only User Management Routes (base path is /api/users)
router.get("/api/users", authMiddleware, authorize("principal"), getUsers);
router.get("/api/users/:id", authMiddleware, authorize("principal"), getUserById);
router.post("/api/users/", authMiddleware, authorize("principal"), validateEmployee, createUser);
router.put("/api/users/:id", authMiddleware, authorize("principal"), updateUser);
router.patch("/api/users/:id/status", authMiddleware, authorize("principal"), updateUserStatus);
router.delete("/api/users/:id", authMiddleware, authorize("principal"), deleteUser);

module.exports = router;

