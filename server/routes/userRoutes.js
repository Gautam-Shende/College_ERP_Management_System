const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  createUser,
  updateUserStatus,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");


router.post("/register", registerUser);

router.post("/login", loginUser);


router.get("/users", authMiddleware, authorize("principal"), getUsers);

router.get("/users/:id", authMiddleware, authorize("principal"), getUserById);

router.post("/users", authMiddleware, authorize("principal"), createUser);

router.patch("/users/:id/status", authMiddleware, authorize("principal"), updateUserStatus,
);

module.exports = router;
