const db = require("../config/db");

const getCourses = async () => {
  const sql = `
    SELECT
      c.id,
      c.course_name,
      c.department_id,
      d.department_name
    FROM courses c
    INNER JOIN departments d
      ON c.department_id = d.id
    ORDER BY c.course_name ASC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

const getCourseById = async (id) => {
  const sql = `
    SELECT
      c.id,
      c.course_name,
      c.department_id,
      d.department_name
    FROM courses c
    INNER JOIN departments d
      ON c.department_id = d.id
    WHERE c.id = ?
  `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

const getCourseByName = async (courseName, departmentId) => {
  const sql = `
    SELECT *
    FROM courses
    WHERE course_name = ?
      AND department_id = ?
  `;

  const [rows] = await db.query(sql, [courseName, departmentId]);

  return rows[0];
};

const createCourse = async (courseData) => {
  const sql = `
    INSERT INTO courses
    (
      course_name,
      department_id
    )
    VALUES
    (
      ?, ?
    )
  `;

  const [result] = await db.query(sql, [
    courseData.course_name,
    courseData.department_id,
  ]);

  return result;
};

const updateCourse = async (id, courseData) => {
  const sql = `
    UPDATE courses
    SET
      course_name = ?,
      department_id = ?
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [
    courseData.course_name,
    courseData.department_id,
    id,
  ]);

  return result;
};

const hasStudents = async (courseId) => {
  const sql = `
    SELECT id
    FROM students
    WHERE course_id = ?
    LIMIT 1
  `;

  const [rows] = await db.query(sql, [courseId]);

  return rows.length > 0;
};

const deleteCourse = async (id) => {
  const sql = `
    DELETE FROM courses
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [id]);

  return result;
};

const departmentExists = async (departmentId) => {
  const sql = `
    SELECT id
    FROM departments
    WHERE id = ?
  `;

  const [rows] = await db.query(sql, [departmentId]);

  return rows[0];
};

module.exports = {
  getCourses,
  getCourseById,
  getCourseByName,
  createCourse,
  updateCourse,
  hasStudents,
  deleteCourse,
  departmentExists
};
