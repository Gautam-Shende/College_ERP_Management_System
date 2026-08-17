const express = require("express");
const router = express.Router();

const {
  getMyAttendance,
  markMyAttendance,
  getStaffAttendanceOverview,
  markStaffAttendance,
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const { validateAttendance } = require("../middleware/validation");

// Read-only attendance log for authenticated staff
router.get(
  "/my",
  authMiddleware,
  authorize("principal", "hod", "teacher", "admission_staff"),
  getMyAttendance,
);

// Principal-only administrative attendance routes
router.get(
  "/overview",
  authMiddleware,
  authorize("principal"),
  getStaffAttendanceOverview,
);

router.post(
  "/mark",
  authMiddleware,
  authorize("principal"),
  validateAttendance,
  markStaffAttendance,
);

router.post(
  "/admin/mark",
  authMiddleware,
  authorize("principal"),
  validateAttendance,
  markStaffAttendance,
);

module.exports = router;
