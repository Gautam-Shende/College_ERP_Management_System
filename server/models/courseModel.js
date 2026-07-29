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

const getCourseByName = async (courseName) => {
  const sql = `
    SELECT *
    FROM courses
    WHERE course_name = ?
  `;

  const [rows] = await db.query(sql, [courseName]);

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

const deleteCourse = async (id) => {
  const sql = `
    DELETE FROM courses
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [id]);

  return result;
};

module.exports = {
  getCourses,
  getCourseById,
  getCourseByName,
  createCourse,
  updateCourse,
  deleteCourse,
};
