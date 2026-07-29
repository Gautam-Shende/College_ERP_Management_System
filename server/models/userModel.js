const db = require("../config/db");

const getUsers = async (
  page,
  limit,
  search,
  role,
  department_id,
  sortBy,
  order,
) => {
  const offset = (page - 1) * limit;

  const allowedColumns = [
    "id",
    "name",
    "email",
    "role",
    "designation",
    "status",
    "created_at",
  ];

  if (!allowedColumns.includes(sortBy)) {
    sortBy = "id";
  }

  order = order === "ASC" ? "ASC" : "DESC";

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
    LEFT JOIN departments d
      ON u.department_id = d.id
    WHERE 1 = 1
  `;

  const params = [];

  // Search
  if (search) {
    sql += `
      AND (
        u.name LIKE ?
        OR u.email LIKE ?
      )
    `;

    params.push(`%${search}%`, `%${search}%`);
  }

  // Role Filter
  if (role) {
    sql += `
      AND u.role = ?
    `;

    params.push(role);
  }

  // Department Filter
  if (department_id) {
    sql += `
      AND u.department_id = ?
    `;

    params.push(Number(department_id));
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

const getUsersCount = async (search, role, department_id) => {
  let sql = `
    SELECT COUNT(*) AS total
    FROM users
    WHERE 1 = 1
  `;

  const params = [];

  if (search) {
    sql += `
      AND (
        name LIKE ?
        OR email LIKE ?
      )
    `;

    params.push(`%${search}%`, `%${search}%`);
  }

  if (role) {
    sql += `
      AND role = ?
    `;

    params.push(role);
  }

  if (department_id) {
    sql += `
      AND department_id = ?
    `;

    params.push(Number(department_id));
  }

  const [[result]] = await db.query(sql, params);

  return result.total;
};

const getAllUsers = async () => {
  const sql = `
        SELECT

            u.id,

            u.name,

            u.email,

            u.role,

            u.designation,

            u.phone,

            u.status,

            d.department_name

        FROM users u

        LEFT JOIN departments d

            ON u.department_id = d.id

        ORDER BY u.id DESC
    `;

  const [rows] = await db.query(sql);

  return rows;
};

const findUserByEmail = async (email) => {
  const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

  const [rows] = await db.query(sql, [email]);
  return rows[0];
};

const getUserById = async (id) => {
  const sql = `
    SELECT * FROM users
    WHERE id = ? `;

  const [row] = await db.query(sql, [id]);
  return row[0];
};

const createUser = async (userData) => {
  const sql = `
        INSERT INTO users
        (
            name,
            email,
            password,
            role,
            department_id,
            designation,
            phone
        )
        VALUES
        (
            ?,?,?,?,?,?,?
        )
    `;

  const [result] = await db.query(sql, [
    userData.name,
    userData.email,
    userData.password,
    userData.role,
    userData.department_id,
    userData.designation,
    userData.phone,
  ]);

  return result;
};

const getUserByEmail = async (email) => {
  const sql = `
        SELECT *
        FROM users
        WHERE email=?
    `;

  const [rows] = await db.query(sql, [email]);

  return rows[0];
};

const updateUserStatus = async (id, status) => {
  const allowedStatus = ["active", "inactive"];

  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid Status");
  }

  const sql = `
      UPDATE users
      SET
        status=?,
        updated_at=CURRENT_TIMESTAMP
      WHERE id=?
  `;

  const [result] = await db.query(sql, [status, id]);

  return result;
};

module.exports = {
  createUser,
  getUsers,
  getAllUsers,
  getUsersCount,
  getUserById,
  getUserByEmail,
  findUserByEmail,
  updateUserStatus,
};
