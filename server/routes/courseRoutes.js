const express = require("express");

const router = express.Router();

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const {
  validateCourse,
} = require("../middleware/validation");

// Read routes (Accessible by all staff roles)
router.get(
  "/api/courses",
  authMiddleware,
  authorize("principal", "hod", "teacher", "admission_staff"),
  getCourses,
);

router.get(
  "/api/courses/:id",
  authMiddleware,
  authorize("principal", "hod", "teacher", "admission_staff"),
  getCourseById,
);

// Write routes (Restricted to Principal and HOD)
router.post(
  "/api/courses",
  authMiddleware,
  authorize("principal", "hod"),
  validateCourse,
  createCourse,
);

router.put(
  "/api/courses/:id",
  authMiddleware,
  authorize("principal", "hod"),
  validateCourse,
  updateCourse,
);

router.delete(
  "/api/courses/:id",
  authMiddleware,
  authorize("principal", "hod"),
  deleteCourse,
);

module.exports = router;
