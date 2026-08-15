/**
 * Student SQL Queries for PostgreSQL
 */

const buildGetStudentsQuery = (search, course, city, sortBy, order) => {
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
    LEFT JOIN courses c ON s.course_id = c.id
    LEFT JOIN departments d ON c.department_id = d.id
    WHERE 1 = 1
  `;

  const params = [];
  let paramIndex = 1;

  if (search) {
    sql += `
      AND (
        s.name ILIKE $${paramIndex}
        OR s.email ILIKE $${paramIndex}
        OR c.course_name ILIKE $${paramIndex}
        OR d.department_name ILIKE $${paramIndex}
        OR s.city ILIKE $${paramIndex}
      )
    `;
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (course) {
    sql += ` AND c.course_name = $${paramIndex}`;
    params.push(course);
    paramIndex++;
  }

  if (city) {
    sql += ` AND s.city = $${paramIndex}`;
    params.push(city);
    paramIndex++;
  }

  sql += ` ORDER BY ${sortColumn} ${sortOrder}`;

  return { sql, params, paramIndex };
};

const buildGetStudentsCountQuery = (search, course, city) => {
  let sql = `
    SELECT COUNT(*) AS total
    FROM students s
    LEFT JOIN courses c ON s.course_id = c.id
    LEFT JOIN departments d ON c.department_id = d.id
    WHERE 1 = 1
  `;

  const params = [];
  let paramIndex = 1;

  if (search) {
    sql += `
      AND (
        s.name ILIKE $${paramIndex}
        OR s.email ILIKE $${paramIndex}
        OR c.course_name ILIKE $${paramIndex}
        OR d.department_name ILIKE $${paramIndex}
        OR s.city ILIKE $${paramIndex}
      )
    `;
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (course) {
    sql += ` AND c.course_name = $${paramIndex}`;
    params.push(course);
    paramIndex++;
  }

  if (city) {
    sql += ` AND s.city = $${paramIndex}`;
    params.push(city);
    paramIndex++;
  }

  return { sql, params };
};

const GET_STUDENT_BY_ID = `
  SELECT
    s.*,
    c.course_name,
    d.department_name
  FROM students s
  INNER JOIN courses c ON s.course_id = c.id
  INNER JOIN departments d ON c.department_id = d.id
  WHERE s.id = $1
`;

const GET_STUDENT_BY_EMAIL = `
  SELECT *
  FROM students
  WHERE email = $1
`;

const CREATE_STUDENT = `
  INSERT INTO students (name, email, course_id, city)
  VALUES ($1, $2, $3, $4)
  RETURNING id
`;

const UPDATE_STUDENT = `
  UPDATE students
  SET
    name = $1,
    email = $2,
    course_id = $3,
    city = $4
  WHERE id = $5
`;

const DELETE_STUDENT = `
  DELETE FROM students
  WHERE id = $1
`;

module.exports = {
  buildGetStudentsQuery,
  buildGetStudentsCountQuery,
  GET_STUDENT_BY_ID,
  GET_STUDENT_BY_EMAIL,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
};
