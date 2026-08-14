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
  "/",
  authMiddleware,
  authorize("principal", "hod", "teacher", "admission_staff"),
  getStudents,
);

router.get(
  "/:id",
  authMiddleware,
  authorize("principal", "hod", "teacher", "admission_staff"),
  getStudentById,
);

// Only principal role can add a new student
router.post(
  "/",
  authMiddleware,
  authorize("principal"),
  validateStudent,
  createStudent,
);

router.put(
  "/:id",
  authMiddleware,
  authorize("principal", "hod", "admission_staff"),
  validateStudent,
  updateStudent,
);

router.delete("/:id", authMiddleware, authorize("principal"), deleteStudent);
module.exports = router;
