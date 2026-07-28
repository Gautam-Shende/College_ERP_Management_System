const db = require("../config/db");

/* ============================
   Get Students
============================ */

const getStudents = async (
  page,
  limit,
  search,
  sortBy,
  order,
  course,
  city,
) => {
  const offset = (page - 1) * limit;

  const allowedColumns = ["id", "name", "email", "course", "city"];

  if (!allowedColumns.includes(sortBy)) {
    sortBy = "id";
  }

  order = order === "ASC" ? "ASC" : "DESC";

  let sql = `
    SELECT *
    FROM students
    WHERE 1 = 1
  `;

  const params = [];

  // Search

  if (search) {
    sql += `
      AND (
        name LIKE ?
        OR email LIKE ?
        OR city LIKE ?
      )
    `;

    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  // Course Filter

  if (course) {
    sql += `
      AND course = ?
    `;

    params.push(course);
  }

  // City Filter

  if (city) {
    sql += `
      AND city = ?
    `;

    params.push(city);
  }

  sql += `
    ORDER BY ${sortBy} ${order}
    LIMIT ?
    OFFSET ?
  `;

  params.push(Number(limit));
  params.push(Number(offset));

  const [rows] = await db.query(sql, params);

  return rows;
};

/* ============================
   Total Count
============================ */

const getStudentsCount = async (search, course, city) => {
  let sql = `
    SELECT COUNT(*) AS total
    FROM students
    WHERE 1 = 1
  `;

  const params = [];

  if (search) {
    sql += `
      AND (
        name LIKE ?
        OR email LIKE ?
        OR city LIKE ?
      )
    `;

    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (course) {
    sql += `
      AND course = ?
    `;

    params.push(course);
  }

  if (city) {
    sql += `
      AND city = ?
    `;

    params.push(city);
  }

  const [[result]] = await db.query(sql, params);

  return result.total;
};

/* ============================
   Get Student By ID
============================ */

const getStudentById = async (id) => {
  const sql = `
    SELECT *
    FROM students
    WHERE id = ?
  `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

/* ============================
   Create Student
============================ */

const createStudent = async (studentData) => {
  const sql = `
    INSERT INTO students
    (
      name,
      email,
      course,
      city
    )
    VALUES
    (
      ?,
      ?,
      ?,
      ?
    )
  `;

  const [result] = await db.query(sql, [
    studentData.name,
    studentData.email,
    studentData.course,
    studentData.city,
  ]);

  return result;
};

/* ============================
   Update Student
============================ */

const updateStudent = async (id, studentData) => {
  const sql = `
    UPDATE students
    SET
      name = ?,
      email = ?,
      course = ?,
      city = ?
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [
    studentData.name,
    studentData.email,
    studentData.course,
    studentData.city,
    id,
  ]);

  return result;
};

/* ============================
   Delete Student
============================ */

const deleteStudent = async (id) => {
  const sql = `
    DELETE FROM students
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [id]);

  return result;
};

/* ============================
   Search API
============================ */

const searchStudents = async (filters) => {
  let sql = `
    SELECT *
    FROM students
    WHERE 1 = 1
  `;

  const values = [];

  if (filters.name) {
    sql += " AND name LIKE ?";
    values.push(`%${filters.name}%`);
  }

  if (filters.email) {
    sql += " AND email LIKE ?";
    values.push(`%${filters.email}%`);
  }

  if (filters.course) {
    sql += " AND course = ?";
    values.push(filters.course);
  }

  if (filters.city) {
    sql += " AND city = ?";
    values.push(filters.city);
  }

  const [rows] = await db.query(sql, values);

  return rows;
};

module.exports = {
  getStudents,
  getStudentsCount,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
};
