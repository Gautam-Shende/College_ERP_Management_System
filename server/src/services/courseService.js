const courseModel = require("../models/courseModel");

const fetchCourses = async () => {
  return await courseModel.getCourses();
};

const fetchCourseById = async (id) => {
  const course = await courseModel.getCourseById(id);
  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }
  return course;
};

const addCourse = async (courseData) => {
  const courseName = courseData.course_name.trim();

  const department = await courseModel.departmentExists(
    courseData.department_id,
  );
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  const existingCourse = await courseModel.getCourseByNameAndDept(
    courseName,
    courseData.department_id,
  );
  if (existingCourse) {
    const error = new Error("Course already exists in this department");
    error.statusCode = 409;
    throw error;
  }

  return await courseModel.createCourse(courseName, courseData.department_id);
};

const editCourse = async (id, courseData) => {
  const course = await courseModel.getCourseById(id);
  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  const department = await courseModel.departmentExists(
    courseData.department_id,
  );
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  const courseName = courseData.course_name.trim();
  const existingCourse = await courseModel.getCourseByNameAndDept(
    courseName,
    courseData.department_id,
  );

  if (existingCourse && existingCourse.id !== Number(id)) {
    const error = new Error("Course already exists in this department");
    error.statusCode = 409;
    throw error;
  }

  const result = await courseModel.updateCourse(
    id,
    courseName,
    courseData.department_id,
  );

  if (result.affectedRows === 0) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  return result;
};

const removeCourse = async (id) => {
  const course = await courseModel.getCourseById(id);
  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  const assigned = await courseModel.hasStudents(id);
  if (assigned) {
    const error = new Error(
      "Cannot delete course. Students are assigned to this course.",
    );
    error.statusCode = 409;
    throw error;
  }

  const result = await courseModel.deleteCourse(id);
  if (result.affectedRows === 0) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  return result;
};

module.exports = {
  fetchCourses,
  fetchCourseById,
  addCourse,
  editCourse,
  removeCourse,
};
