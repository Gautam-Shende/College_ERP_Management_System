const express = require("express");

const router = express.Router();

const { registerUser, getUsers, 
    getUserById, loginUser } = require("../controllers/userController");

router.get("/", getUsers)
router.get("/:id", getUserById)
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
