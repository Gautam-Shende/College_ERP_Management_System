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
const { validateDepartment } = require("../middleware/validation");

router.get(
  "/",
  authMiddleware,
  authorize("principal", "hod", "teacher"),
  getDepartments,
);

router.get(
  "/:id",
  authMiddleware,
  authorize("principal", "hod", "teacher"),
  getDepartmentById,
);

router.post(
  "/",
  authMiddleware,
  authorize("principal"),
  validateDepartment,
  createDepartment,
);

router.put(
  "/:id",
  authMiddleware,
  authorize("principal"),
  validateDepartment,
  updateDepartment,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("principal"),
  deleteDepartment,
);

module.exports = router;
