const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// Get dashboard summary statistics (protected for Principal, HOD, and Teacher)
router.get(
  "/",
  authMiddleware,
  authorize("principal", "hod", "teacher"),
  getDashboard,
);

module.exports = router;
