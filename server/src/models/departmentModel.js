const pool = require("../config/db");

// Department model: handles direct PostgreSQL queries for department management
const departmentModel = {
  getDepartments: async () => {
    const query = `
      SELECT id, department_name, created_at, updated_at
      FROM departments
      ORDER BY id ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getDepartmentById: async (id) => {
    const query = `
      SELECT id, department_name, created_at, updated_at
      FROM departments
      WHERE id = $1
      LIMIT 1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  getDepartmentByName: async (departmentName) => {
    const query = `
      SELECT id
      FROM departments
      WHERE LOWER(department_name) = LOWER($1)
      LIMIT 1
    `;
    const result = await pool.query(query, [departmentName]);
    return result.rows[0] || null;
  },

  createDepartment: async (departmentName) => {
    const query = `
      INSERT INTO departments (department_name)
      VALUES ($1)
      RETURNING id
    `;
    const result = await pool.query(query, [departmentName]);
    return { insertId: result.rows[0].id };
  },

  updateDepartment: async (id, departmentName) => {
    const query = `
      UPDATE departments
      SET department_name = $1
      WHERE id = $2
    `;
    const result = await pool.query(query, [departmentName, id]);
    return { affectedRows: result.rowCount };
  },

  deleteDepartment: async (id) => {
    const query = `
      DELETE FROM departments
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return { affectedRows: result.rowCount };
  },
};

module.exports = departmentModel;

