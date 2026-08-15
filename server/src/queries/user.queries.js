/**
 * User / Employee SQL Queries for PostgreSQL
 */

const buildGetUsersQuery = (search, role, departmentId, sortBy, order) => {
  const allowedColumns = {
    id: "u.id",
    name: "u.name",
    email: "u.email",
    role: "u.role",
    designation: "u.designation",
    status: "u.status",
    created_at: "u.created_at",
  };

  const sortColumn = allowedColumns[sortBy] || "u.id";
  const sortOrder = order === "ASC" ? "ASC" : "DESC";

  let sql = `
    SELECT
      u.id,
      u.name,
      u.email,
      u.role,
      u.designation,
      u.phone,
      u.status,
      u.created_at,
      d.department_name
    FROM users u
    LEFT JOIN departments d ON u.department_id = d.id
    WHERE 1 = 1
  `;

  const params = [];
  let paramIndex = 1;

  if (search) {
    sql += `
      AND (
        u.name ILIKE $${paramIndex}
        OR u.email ILIKE $${paramIndex}
      )
    `;
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (role) {
    sql += ` AND u.role = $${paramIndex}`;
    params.push(role);
    paramIndex++;
  }

  if (departmentId) {
    sql += ` AND u.department_id = $${paramIndex}`;
    params.push(Number(departmentId));
    paramIndex++;
  }

  sql += ` ORDER BY ${sortColumn} ${sortOrder}`;

  return { sql, params, paramIndex };
};

const buildGetUsersCountQuery = (search, role, departmentId) => {
  let sql = `
    SELECT COUNT(*) AS total
    FROM users u
    WHERE 1 = 1
  `;

  const params = [];
  let paramIndex = 1;

  if (search) {
    sql += `
      AND (
        u.name ILIKE $${paramIndex}
        OR u.email ILIKE $${paramIndex}
      )
    `;
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (role) {
    sql += ` AND u.role = $${paramIndex}`;
    params.push(role);
    paramIndex++;
  }

  if (departmentId) {
    sql += ` AND u.department_id = $${paramIndex}`;
    params.push(Number(departmentId));
    paramIndex++;
  }

  return { sql, params };
};

const GET_ALL_USERS = `
  SELECT
    u.id,
    u.name,
    u.email,
    u.role,
    u.designation,
    u.phone,
    u.status,
    u.created_at,
    d.department_name
  FROM users u
  LEFT JOIN departments d ON u.department_id = d.id
  ORDER BY u.id DESC
`;

const GET_USER_BY_ID = `
  SELECT
    id,
    name,
    email,
    role,
    department_id,
    designation,
    phone,
    status,
    created_at
  FROM users
  WHERE id = $1
  LIMIT 1
`;

const GET_USER_BY_EMAIL = `
  SELECT
    id,
    name,
    email,
    password,
    role,
    department_id,
    designation,
    phone,
    status,
    created_at
  FROM users
  WHERE email = $1
  LIMIT 1
`;

const CREATE_USER = `
  INSERT INTO users (
    name,
    email,
    password,
    role,
    department_id,
    designation,
    phone
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id
`;

const UPDATE_USER = `
  UPDATE users
  SET
    name = $1,
    role = $2,
    department_id = $3,
    designation = $4,
    phone = $5
  WHERE id = $6
`;

const UPDATE_USER_STATUS = `
  UPDATE users
  SET status = $1
  WHERE id = $2
`;

const DELETE_USER = `
  DELETE FROM users
  WHERE id = $1
`;

module.exports = {
  buildGetUsersQuery,
  buildGetUsersCountQuery,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_EMAIL,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_USER_STATUS,
  DELETE_USER,
};
