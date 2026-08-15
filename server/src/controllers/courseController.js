const courseService = require("../services/courseService");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");

const getCourses = async (req, res, next) => {
  try {
    const courses = await courseService.fetchCourses();

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "ALL Courses are fetched...",
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await courseService.fetchCourseById(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { course_name, department_id } = req.body;

    const result = await courseService.addCourse({
      course_name,
      department_id,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.COURSE.CREATED,
      courseId: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { course_name, department_id } = req.body;

    await courseService.editCourse(id, { course_name, department_id });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.COURSE.UPDATED,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    await courseService.removeCourse(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.COURSE.DELETED,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
