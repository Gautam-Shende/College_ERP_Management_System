const Course = require("../models/courseModel");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.getCourses();

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.getCourseById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const { course_name, department_id } = req.body;

    if (!course_name || !department_id) {
      return res.status(400).json({
        success: false,
        message: "Course name and department are required",
      });
    }

    const courseName = course_name.trim();

    const department = await Course.departmentExists(department_id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    const existingCourse = await Course.getCourseByName(
      courseName,
      department_id,
    );

    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "Course already exists in this department",
      });
    }

    const result = await Course.createCourse({
      course_name: courseName,
      department_id,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      courseId: result.insertId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_name, department_id } = req.body;

    if (!course_name || !department_id) {
      return res.status(400).json({
        success: false,
        message: "Course name and department are required",
      });
    }

    const course = await Course.getCourseById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const department = await Course.departmentExists(department_id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    const courseName = course_name.trim();

    const existingCourse = await Course.getCourseByName(
      courseName,
      department_id,
    );

    if (existingCourse && existingCourse.id !== Number(id)) {
      return res.status(409).json({
        success: false,
        message: "Course already exists in this department",
      });
    }

    const result = await Course.updateCourse(id, {
      course_name: courseName,
      department_id,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.getCourseById(id);

    await Course.deleteCourse(id);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
