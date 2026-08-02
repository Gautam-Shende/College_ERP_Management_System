const db = require("../config/db");

const getDepartments = async () => {
  const sql = `
    SELECT
      id,
      department_name,
      created_at,
      updated_at
    FROM departments
    ORDER BY department_name ASC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

const getDepartmentById = async (id) => {
  const sql = `
    SELECT
      id,
      department_name,
      created_at,
      updated_at
    FROM departments
    WHERE id = ?
  `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

const getDepartmentByName = async (departmentName) => {
  const sql = `
    SELECT *
    FROM departments
    WHERE department_name = ?
  `;

  const [rows] = await db.query(sql, [departmentName]);

  return rows[0];
};

const createDepartment = async (departmentName) => {
  const sql = `
    INSERT INTO departments
    (
      department_name
    )
    VALUES
    (
      ?
    )
  `;

  const [result] = await db.query(sql, [departmentName]);

  return result;
};

const updateDepartment = async (id, departmentName) => {
  const sql = `
    UPDATE departments
    SET
      department_name = ?
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [departmentName, id]);

  return result;
};

const deleteDepartment = async (id) => {
  const sql = `
    DELETE FROM departments
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [id]);

  return result;
};

module.exports = {
  getDepartments,
  getDepartmentById,
  getDepartmentByName,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
