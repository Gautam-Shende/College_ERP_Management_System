const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// Get dashboard summary statistics (protected for Principal, HOD, Teacher, and Admission Staff)
router.get(
  "/",
  authMiddleware,
  authorize("principal", "hod", "teacher", "admission_staff"),
  getDashboard,
);

module.exports = router;
