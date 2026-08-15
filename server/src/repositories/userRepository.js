const db = require("../config/database");
const queries = require("../queries/user.queries");

const getUsers = async (
  page,
  limit,
  search,
  role,
  departmentId,
  sortBy,
  order,
) => {
  const offset = (page - 1) * limit;
  const { sql, params, paramIndex } = queries.buildGetUsersQuery(
    search,
    role,
    departmentId,
    sortBy,
    order,
  );

  const fullSql = `${sql} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  const fullParams = [...params, Number(limit), Number(offset)];

  const result = await db.query(fullSql, fullParams);
  return result.rows;
};

const getUsersCount = async (search, role, departmentId) => {
  const { sql, params } = queries.buildGetUsersCountQuery(
    search,
    role,
    departmentId,
  );
  const result = await db.query(sql, params);
  return parseInt(result.rows[0].total, 10);
};

const getAllUsers = async () => {
  const result = await db.query(queries.GET_ALL_USERS);
  return result.rows;
};

const getUserById = async (id) => {
  const result = await db.query(queries.GET_USER_BY_ID, [id]);
  return result.rows[0] || null;
};

const getUserByEmail = async (email) => {
  const result = await db.query(queries.GET_USER_BY_EMAIL, [email]);
  return result.rows[0] || null;
};

const createUser = async (userData) => {
  const result = await db.query(queries.CREATE_USER, [
    userData.name,
    userData.email,
    userData.password,
    userData.role,
    userData.department_id || null,
    userData.designation || null,
    userData.phone || null,
  ]);
  return { insertId: result.rows[0].id };
};

const updateUser = async (id, userData) => {
  const result = await db.query(queries.UPDATE_USER, [
    userData.name,
    userData.role,
    userData.department_id,
    userData.designation,
    userData.phone,
    id,
  ]);
  return { affectedRows: result.rowCount };
};

const updateUserStatus = async (id, status) => {
  const result = await db.query(queries.UPDATE_USER_STATUS, [status, id]);
  return { affectedRows: result.rowCount };
};

const deleteUser = async (id) => {
  const result = await db.query(queries.DELETE_USER, [id]);
  return { affectedRows: result.rowCount };
};

module.exports = {
  getUsers,
  getUsersCount,
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser,
};
