const Course = require("../models/courseModel");

const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");


const getCourses = async (req, res) => {
  try {
    const courses = await Course.getCourses();

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "ALL Courses are fetched...", 
      data: courses,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.getCourseById(id);

    if (!course) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.COURSE.NOT_FOUND,
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: course,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const { course_name, department_id } = req.body;

    if (!course_name || !department_id) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.COURSE.COURSE_REQ,
      });
    }

    const courseName = course_name.trim();

    const department = await Course.departmentExists(department_id);

    if (!department) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.DEPARTMENT.NOT_FOUND,
      });
    }

    const existingCourse = await Course.getCourseByName(
      courseName,
      department_id,
    );

    if (existingCourse) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: MESSAGES.COURSE.ALREADY_EXISTS,
      });
    }

    const result = await Course.createCourse({
      course_name: courseName,
      department_id,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.COURSE.CREATED,
      courseId: result.insertId,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_name, department_id } = req.body;

    if (!course_name || !department_id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.COURSE.COURSE_REQ,
      });
    }

    const course = await Course.getCourseById(id);

    if (!course) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.COURSE.NOT_FOUND,
      });
    }

    const department = await Course.departmentExists(department_id);

    if (!department) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.DEPARTMENT.NOT_FOUND,
      });
    }

    const courseName = course_name.trim();

    const existingCourse = await Course.getCourseByName(
      courseName,
      department_id,
    );

    if (existingCourse && existingCourse.id !== Number(id)) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Course already exists in this department",
      });
    }

    const result = await Course.updateCourse(id, {
      course_name: courseName,
      department_id,
    });

    if (result.affectedRows === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.COURSE.NOT_FOUND,
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.COURSE.UPDATED,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.getCourseById(id);

    if (!course) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.COURSE.NOT_FOUND,
      });
    }

    const assigned = await Course.hasStudents(id);

    if (assigned) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: "Cannot delete course. Students are assigned to this course.",
      });
    }

    const result = await Course.deleteCourse(id);

    if (result.affectedRows === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.COURSE.NOT_FOUND,
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.COURSE.DELETED,
    });
  } catch (error) {
    console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
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
