const courseRepository = require("../repositories/courseRepository");

const fetchCourses = async () => {
  return await courseRepository.getCourses();
};

const fetchCourseById = async (id) => {
  const course = await courseRepository.getCourseById(id);
  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }
  return course;
};

const addCourse = async (courseData) => {
  const courseName = courseData.course_name.trim();

  const department = await courseRepository.departmentExists(
    courseData.department_id,
  );
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  const existingCourse = await courseRepository.getCourseByName(
    courseName,
    courseData.department_id,
  );
  if (existingCourse) {
    const error = new Error("Course already exists in this department");
    error.statusCode = 409;
    throw error;
  }

  return await courseRepository.createCourse({
    course_name: courseName,
    department_id: courseData.department_id,
  });
};

const editCourse = async (id, courseData) => {
  const course = await courseRepository.getCourseById(id);
  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  const department = await courseRepository.departmentExists(
    courseData.department_id,
  );
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  const courseName = courseData.course_name.trim();
  const existingCourse = await courseRepository.getCourseByName(
    courseName,
    courseData.department_id,
  );

  if (existingCourse && existingCourse.id !== Number(id)) {
    const error = new Error("Course already exists in this department");
    error.statusCode = 409;
    throw error;
  }

  const result = await courseRepository.updateCourse(id, {
    course_name: courseName,
    department_id: courseData.department_id,
  });

  if (result.affectedRows === 0) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  return result;
};

const removeCourse = async (id) => {
  const course = await courseRepository.getCourseById(id);
  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  const assigned = await courseRepository.hasStudents(id);
  if (assigned) {
    const error = new Error(
      "Cannot delete course. Students are assigned to this course.",
    );
    error.statusCode = 409;
    throw error;
  }

  const result = await courseRepository.deleteCourse(id);
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
