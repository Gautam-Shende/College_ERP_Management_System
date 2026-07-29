const courseModel = require("../models/courseModel");

const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.getAllCourses();

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

module.exports = {
  getCourses,
};
