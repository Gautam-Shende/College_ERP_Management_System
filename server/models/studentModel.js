const db = require("../config/db");

const getStudents = async (page, limit, search, sortBy, order) => {
  const offset = (page - 1) * limit;

  const sortColumns = {
    id: "s.id",
    name: "s.name",
    email: "s.email",
    course: "c.course_name",
    department: "d.department_name",
    city: "s.city",
  };

  const sortColumn = sortColumns[sortBy] || "s.id";
  const sortOrder = order === "ASC" ? "ASC" : "DESC";

  let sql = `
      SELECT

          s.id,

          s.name,

          s.email,

          c.course_name AS course,

          d.department_name AS department,

          s.city

      FROM students s

      INNER JOIN courses c
          ON s.course_id = c.id

      INNER JOIN departments d
          ON c.department_id = d.id
  `;

  const params = [];

  if (search) {
    sql += `
        WHERE

        s.name LIKE ?

        OR s.email LIKE ?

        OR c.course_name LIKE ?

        OR d.department_name LIKE ?

        OR s.city LIKE ?
    `;

    params.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
    );
  }

  sql += `
      ORDER BY ${sortColumn} ${sortOrder}

      LIMIT ?

      OFFSET ?
  `;

  params.push(Number(limit), Number(offset));

  const [rows] = await db.query(sql, params);

  return rows;
};

const getStudentsCount = async (search) => {
  let sql = `
      SELECT COUNT(*) AS total

      FROM students s

      INNER JOIN courses c
      ON s.course_id = c.id

      INNER JOIN departments d
      ON c.department_id = d.id
  `;

  const params = [];

  if (search) {
    sql += `
      WHERE

      s.name LIKE ?

      OR s.email LIKE ?

      OR c.course_name LIKE ?

      OR d.department_name LIKE ?

      OR s.city LIKE ?
    `;

    params.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
    );
  }

  const [[result]] = await db.query(sql, params);

  return result.total;
};

const getStudentById = async (id) => {
  const sql = `

        SELECT

            s.*,

            c.course_name,

            d.department_name

        FROM students s

        INNER JOIN courses c
            ON s.course_id=c.id

        INNER JOIN departments d
            ON c.department_id=d.id

        WHERE s.id=?

    `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

const createStudent = async (studentData) => {
  const sql = `
    INSERT INTO students
    (
      name,
      email,
      course_id,
      city
    )
    VALUES
    (
      ?,?,?,?
    )
  `;

  const [result] = await db.query(sql, [
    studentData.name,
    studentData.email,
    studentData.course_id,
    studentData.city,
  ]);

  return result;
};

const updateStudent = async (id, studentData) => {
    const sql = `
        UPDATE students
        SET
            name=?,
            email=?,
            course_id=?,
            city=?
        WHERE id=?

    `;

    const [result]=await db.query(sql,[
        studentData.name,
        studentData.email,
        studentData.course_id,
        studentData.city,
        id
    ]);
    return result;
};

const deleteStudent = async (id) => {
  const sql = `
    DELETE FROM students
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [id]);

  return result;
};

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
