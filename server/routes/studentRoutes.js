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

router.post(
  "/",
  authMiddleware,
  authorize("principal", "admission_staff"),
  createStudent,
);

router.put(
  "/:id",
  authMiddleware,
  authorize("principal", "hod", "admission_staff"),
  updateStudent,
);

router.delete("/:id", authMiddleware, authorize("principal"), deleteStudent);

module.exports = router;
