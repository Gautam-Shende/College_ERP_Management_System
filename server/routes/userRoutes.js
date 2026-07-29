const express = require("express");

const router = express.Router();

const { registerUser, getUsers, createUser,
    getUserById, loginUser } = require("../controllers/userController");

router.get("/", getUsers);
router.post("/",createUser);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
