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
  "/",
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
  "/:id",
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
  "/",
  authMiddleware,
  authorize("principal"),
  createDepartment
);


router.put(
  "/:id",
  authMiddleware,
  authorize("principal"),
  updateDepartment
);


router.delete(
  "/:id",
  authMiddleware,
  authorize("principal"),
  deleteDepartment
);

module.exports = router;