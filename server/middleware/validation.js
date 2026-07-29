

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

module.exports = {
  validateStudent,
  validateEmployee,
};
