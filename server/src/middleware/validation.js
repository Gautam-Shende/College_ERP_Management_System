const { HTTP_STATUS, MESSAGES } = require("../config/constants");

const validateStudent = (req, res, next) => {
  const { name, email, course_id, city } = req.body;

  if (!name || !email || !course_id || !city) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.COMMON.ALL_FIELDS_REQUIRED,
    });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.city = city.trim();

  next();
};

const validateEmployee = (req, res, next) => {
  const { name, email, password, role, designation, phone } = req.body;

  if (!name || !email || !password || !role || !designation || !phone) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.COMMON.ALL_FIELDS_REQUIRED,
    });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.designation = designation.trim();
  req.body.phone = phone.trim();

  next();
};

const validateCourse = (req, res, next) => {
  const { course_name, department_id } = req.body;

  if (!course_name || !course_name.trim()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.COURSE.COURSE_REQ,
    });
  }

  if (!department_id) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.DEPARTMENT.DEPARTMENT_REQUI,
    });
  }

  req.body.course_name = course_name.trim();

  next();
};

const validateDepartment = (req, res, next) => {
  const { department_name } = req.body;

  if (!department_name || !department_name.trim()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.DEPARTMENT.DEPARTMENT_REQUI,
    });
  }

  req.body.department_name = department_name.trim();

  next();
};

const validateRegister = (req, res, next) => {
  let { name, email, password, role, designation, phone } = req.body || {};

  if (!name || !email || !password || !role || !designation || !phone) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Name, email, password, role, designation, and phone are required",
    });
  }

  const allowedRoles = ["principal", "hod", "teacher", "admission_staff"];
  if (!allowedRoles.includes(role)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Invalid role. Allowed roles: principal, hod, teacher, admission_staff",
    });
  }

  if (password.length < 6) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.COMMON.EMAIL_PASS_REQUIRED,
    });
  }

  req.body.email = email.trim().toLowerCase();

  next();
};

const validateAttendance = (req, res, next) => {
  const { status, attendance_date } = req.body;

  if (!status) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Attendance status is required",
    });
  }

  const validStatuses = ["present", "absent"];
  if (!validStatuses.includes(status)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Status must be 'present' or 'absent'",
    });
  }

  if (attendance_date && !/^\d{4}-\d{2}-\d{2}$/.test(attendance_date)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Invalid attendance date format. Expected YYYY-MM-DD",
    });
  }

  next();
};

module.exports = {
  validateStudent,
  validateEmployee,
  validateCourse,
  validateDepartment,
  validateRegister,
  validateLogin,
  validateAttendance,
};

