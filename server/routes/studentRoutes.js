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

router.get("/", authenticate,authorize("student", "principal"), getStudents);
router.get("/search", authenticate, authorize("principal"), searchStudents );

router.get("/:id",authenticate, authorize("principal"), getStudentById);

router.post("/", authenticate, authorize("principal"), validateStudent, createStudent);

router.put("/:id", authenticate, authorize("principal"), updateStudent);

router.delete("/:id",authenticate,authorize("principal"),deleteStudent);


module.exports = router;
