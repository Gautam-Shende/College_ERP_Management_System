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

router.get("/", authMiddleware, authorize("principal"), getCourses);

router.get("/:id", authMiddleware, authorize("principal"), getCourseById);

router.post("/", authMiddleware, authorize("principal"), validateCourse, createCourse);

router.put("/:id", authMiddleware, authorize("principal"), validateCourse, updateCourse);

router.delete("/:id", authMiddleware, authorize("principal"), deleteCourse);

module.exports = router;
