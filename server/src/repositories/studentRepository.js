const db = require("../config/database");
const queries = require("../queries/student.queries");

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
  const { sql, params, paramIndex } = queries.buildGetStudentsQuery(
    search,
    course,
    city,
    sortBy,
    order,
  );

  const fullSql = `${sql} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  const fullParams = [...params, Number(limit), Number(offset)];

  const result = await db.query(fullSql, fullParams);
  return result.rows;
};

const getStudentsCount = async (search, course, city) => {
  const { sql, params } = queries.buildGetStudentsCountQuery(
    search,
    course,
    city,
  );
  const result = await db.query(sql, params);
  return parseInt(result.rows[0].total, 10);
};

const getStudentById = async (id) => {
  const result = await db.query(queries.GET_STUDENT_BY_ID, [id]);
  return result.rows[0] || null;
};

const getStudentByEmail = async (email) => {
  const result = await db.query(queries.GET_STUDENT_BY_EMAIL, [email]);
  return result.rows[0] || null;
};

const createStudent = async (studentData) => {
  const result = await db.query(queries.CREATE_STUDENT, [
    studentData.name,
    studentData.email,
    studentData.course_id,
    studentData.city,
  ]);
  return { insertId: result.rows[0].id };
};

const updateStudent = async (id, studentData) => {
  const result = await db.query(queries.UPDATE_STUDENT, [
    studentData.name,
    studentData.email,
    studentData.course_id,
    studentData.city,
    id,
  ]);
  return { affectedRows: result.rowCount };
};

const deleteStudent = async (id) => {
  const result = await db.query(queries.DELETE_STUDENT, [id]);
  return { affectedRows: result.rowCount };
};

module.exports = {
  getStudents,
  getStudentsCount,
  getStudentById,
  getStudentByEmail,
  createStudent,
  updateStudent,
  deleteStudent,
};
