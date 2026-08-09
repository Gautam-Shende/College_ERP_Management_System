const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");


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

module.exports = {
  validateStudent,
  validateEmployee,
  validateCourse
};
