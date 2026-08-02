const validateStudent = (req, res, next) => {
  const { name, email, course_id, city } = req.body;

  if (!name || !email || !course_id || !city) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
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
    return res.status(400).json({
      success: false,
      message: "All fields are required",
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
    return res.status(400).json({
      success: false,
      message: "Course name is required",
    });
  }

  if (!department_id) {
    return res.status(400).json({
      success: false,
      message: "Department is required",
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
