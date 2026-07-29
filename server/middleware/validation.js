
const validateStudent = (req, res, next) => {
  const { name, email, course, city } = req.body;

  if (!name || !email || !course_id || !city) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  next();
};

module.exports = validateStudent;
