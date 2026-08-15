const db = require("../config/database");
const queries = require("../queries/course.queries");

const getCourses = async () => {
  const result = await db.query(queries.GET_COURSES);
  return result.rows;
};

const getCourseById = async (id) => {
  const result = await db.query(queries.GET_COURSE_BY_ID, [id]);
  return result.rows[0] || null;
};

const getCourseByName = async (courseName, departmentId) => {
  const result = await db.query(queries.GET_COURSE_BY_NAME_AND_DEPT, [
    courseName,
    departmentId,
  ]);
  return result.rows[0] || null;
};

const createCourse = async (courseData) => {
  const result = await db.query(queries.CREATE_COURSE, [
    courseData.course_name,
    courseData.department_id,
  ]);
  return { insertId: result.rows[0].id };
};

const updateCourse = async (id, courseData) => {
  const result = await db.query(queries.UPDATE_COURSE, [
    courseData.course_name,
    courseData.department_id,
    id,
  ]);
  return { affectedRows: result.rowCount };
};

const hasStudents = async (courseId) => {
  const result = await db.query(queries.HAS_STUDENTS, [courseId]);
  return result.rows.length > 0;
};

const deleteCourse = async (id) => {
  const result = await db.query(queries.DELETE_COURSE, [id]);
  return { affectedRows: result.rowCount };
};

const departmentExists = async (departmentId) => {
  const result = await db.query(queries.CHECK_DEPARTMENT_EXISTS, [
    departmentId,
  ]);
  return result.rows[0] || null;
};

module.exports = {
  getCourses,
  getCourseById,
  getCourseByName,
  createCourse,
  updateCourse,
  hasStudents,
  deleteCourse,
  departmentExists,
};
