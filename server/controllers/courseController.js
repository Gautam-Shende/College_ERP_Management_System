const Course = require("../models/courseModel");

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.getCourses();

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCourses,
};
