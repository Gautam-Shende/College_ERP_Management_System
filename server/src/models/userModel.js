const pool = require("../config/db");

// User model: handles direct PostgreSQL database queries for users
const userModel = {
  // Fetch paginated users with optional search, role, and department filter
  getUsers: async (page = 1, limit = 10, search = "", role = "", departmentId = "", sortBy = "id", order = "DESC") => {
    const offset = (page - 1) * limit;
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

    let query = `
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
      query += ` AND (u.name ILIKE $${paramIndex} OR u.email ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (role) {
      query += ` AND u.role = $${paramIndex}`;
      params.push(role);
      paramIndex++;
    }

    if (departmentId) {
      query += ` AND u.department_id = $${paramIndex}`;
      params.push(Number(departmentId));
      paramIndex++;
    }

    query += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(Number(limit), Number(offset));

    const result = await pool.query(query, params);
    return result.rows;
  },

  // Count total users for pagination
  getUsersCount: async (search = "", role = "", departmentId = "") => {
    let query = `SELECT COUNT(*) AS total FROM users u WHERE 1 = 1`;
    const params = [];
    let paramIndex = 1;

    if (search) {
      query += ` AND (u.name ILIKE $${paramIndex} OR u.email ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (role) {
      query += ` AND u.role = $${paramIndex}`;
      params.push(role);
      paramIndex++;
    }

    if (departmentId) {
      query += ` AND u.department_id = $${paramIndex}`;
      params.push(Number(departmentId));
      paramIndex++;
    }

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].total, 10);
  },

  // Find user by ID
  getUserById: async (id) => {
    const query = `
      SELECT id, name, email, role, department_id, designation, phone, status, created_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  // Find user by email
  getUserByEmail: async (email) => {
    const query = `
      SELECT id, name, email, password, role, department_id, designation, phone, status, created_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  },

  // Create new user
  createUser: async (userData) => {
    const query = `
      INSERT INTO users (name, email, password, role, department_id, designation, phone)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, email, role, department_id, designation, phone, created_at
    `;
    const values = [
      userData.name,
      userData.email,
      userData.password,
      userData.role,
      userData.department_id || null,
      userData.designation || null,
      userData.phone || null,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Update existing user profile
  updateUser: async (id, userData) => {
    const query = `
      UPDATE users
      SET name = $1, role = $2, department_id = $3, designation = $4, phone = $5
      WHERE id = $6
    `;
    const values = [
      userData.name,
      userData.role,
      userData.department_id,
      userData.designation,
      userData.phone,
      id,
    ];
    const result = await pool.query(query, values);
    return { affectedRows: result.rowCount };
  },

  // Update user status (active/inactive)
  updateUserStatus: async (id, status) => {
    const query = `
      UPDATE users
      SET status = $1
      WHERE id = $2
    `;
    const result = await pool.query(query, [status, id]);
    return { affectedRows: result.rowCount };
  },

  // Delete user
  deleteUser: async (id) => {
    const query = `
      DELETE FROM users
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return { affectedRows: result.rowCount };
  },
};

module.exports = userModel;

