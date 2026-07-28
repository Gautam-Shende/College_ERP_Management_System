const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
} = require("../controllers/studentController");

const validateStudent = require("../middleware/validation");

router.get("/", authenticate,authorize("student", "admin"), getStudents);
router.get("/search", authenticate, authorize("admin"), searchStudents );

router.get("/:id",authenticate, authorize("admin"), getStudentById);

router.post("/", authenticate, authorize("admin"), validateStudent, createStudent);

router.put("/:id", authenticate, authorize("admin"), updateStudent);

router.delete("/:id",authenticate,authorize("admin"),deleteStudent);


module.exports = router;
