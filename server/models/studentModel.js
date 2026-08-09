const db = require("../config/db");

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

          LEFT JOIN courses c
             ON s.course_id = c.id

          LEFT JOIN departments d
              ON c.department_id = d.id

               WHERE 1 = 1
  `;

  const params = [];

  if (search) {
    sql += `
        AND
(
    s.name LIKE ?

    OR s.email LIKE ?

    OR c.course_name LIKE ?

    OR d.department_name LIKE ?

    OR s.city LIKE ?
)
    `;

    params.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
    );
  }

  if (course) {
    sql += `
    AND c.course_name = ?
  `;

    params.push(course);
  }

  if (city) {
    sql += `
    AND s.city = ?
  `;

    params.push(city);
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

const getStudentsCount = async (search, course, city) => {
  let sql = `
SELECT COUNT(*) AS total

FROM students s

LEFT JOIN courses c
ON s.course_id = c.id

LEFT JOIN departments d
ON c.department_id = d.id

WHERE 1=1
`;

  const params = [];

  if (search) {
    sql += `
      AND
      (
        s.name LIKE ?
        OR s.email LIKE ?
        OR c.course_name LIKE ?
        OR d.department_name LIKE ?
        OR s.city LIKE ?
      )
    `;

    params.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
    );
  }

  if (course) {
    sql += `
    AND c.course_name = ?
  `;

    params.push(course);
  }

  if (city) {
    sql += `
    AND s.city = ?
  `;

    params.push(city);
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

const getStudentByEmail = async (email) => {
  const sql = `
        SELECT *
        FROM students
        WHERE email = ?
    `;

  const [rows] = await db.query(sql, [email]);

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

  const [result] = await db.query(sql, [
    studentData.name,
    studentData.email,
    studentData.course_id,
    studentData.city,
    id,
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

module.exports = {
  getStudents,
  getStudentsCount,
  getStudentById,
  getStudentByEmail,
  createStudent,
  updateStudent,
  deleteStudent,
};
