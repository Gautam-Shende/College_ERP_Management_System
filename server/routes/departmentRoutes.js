const express = require("express");

const router = express.Router();

const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.get(
  "/api/departments",
  authMiddleware,
  authorize(
    "principal",
    "hod",
    "teacher",
    "admission_staff"
  ),
  getDepartments
);

router.get(
  "/api/departments/:id",
  authMiddleware,
  authorize(
    "principal",
    "hod",
    "teacher",
    "admission_staff"
  ),
  getDepartmentById
);


router.post(
  "/api/departments",
  authMiddleware,
  authorize("principal"),
  createDepartment
);


router.put(
  "/api/departments/:id",
  authMiddleware,
  authorize("principal"),
  updateDepartment
);


router.delete(
  "/api/departments/:id",
  authMiddleware,
  authorize("principal"),
  deleteDepartment
);

module.exports = router;