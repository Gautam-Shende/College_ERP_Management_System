const db = require("../config/database");
const queries = require("../queries/department.queries");

const getDepartments = async () => {
  const result = await db.query(queries.GET_DEPARTMENTS);
  return result.rows;
};

const getDepartmentById = async (id) => {
  const result = await db.query(queries.GET_DEPARTMENT_BY_ID, [id]);
  return result.rows[0] || null;
};

const getDepartmentByName = async (departmentName) => {
  const result = await db.query(queries.GET_DEPARTMENT_BY_NAME, [
    departmentName,
  ]);
  return result.rows[0] || null;
};

const createDepartment = async (departmentName) => {
  const result = await db.query(queries.CREATE_DEPARTMENT, [departmentName]);
  return { insertId: result.rows[0].id };
};

const updateDepartment = async (id, departmentName) => {
  const result = await db.query(queries.UPDATE_DEPARTMENT, [
    departmentName,
    id,
  ]);
  return { affectedRows: result.rowCount };
};

const deleteDepartment = async (id) => {
  const result = await db.query(queries.DELETE_DEPARTMENT, [id]);
  return { affectedRows: result.rowCount };
};

module.exports = {
  getDepartments,
  getDepartmentById,
  getDepartmentByName,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
