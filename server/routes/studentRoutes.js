const express = require("express");

const router = express.Router();

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const { validateStudent } = require("../middleware/validation");

router.get(
  "/api/students",
  authMiddleware,
  authorize("principal", "hod", "teacher", "admission_staff"),
  getStudents,
);

router.get(
  "/api/students/:id",
  authMiddleware,
  authorize("principal", "hod", "teacher", "admission_staff"),
  getStudentById,
);

router.post(
  "/api/students",
  authMiddleware,
  authorize("principal", "admission_staff"),
  validateStudent,
  createStudent,
);

router.put(
  "/api/students/:id",
  authMiddleware,
  authorize("principal", "hod", "admission_staff"),
  validateStudent,
  updateStudent,
);

router.delete("/api/students/:id", authMiddleware, authorize("principal"), deleteStudent);
module.exports = router;
