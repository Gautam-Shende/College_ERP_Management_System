const pool = require("../config/db");

// Student model: handles direct PostgreSQL database queries for student directory
const studentModel = {
  getStudents: async (page = 1, limit = 10, search = "", course = "", city = "", sortBy = "id", order = "DESC") => {
    const offset = (page - 1) * limit;
    const allowedColumns = {
      id: "s.id",
      name: "s.name",
      email: "s.email",
      course: "c.course_name",
      city: "s.city",
      created_at: "s.created_at",
    };

    const sortColumn = allowedColumns[sortBy] || "s.id";
    const sortOrder = order === "ASC" ? "ASC" : "DESC";

    let query = `
      SELECT
        s.id,
        s.name,
        s.email,
        s.city,
        s.course_id,
        c.course_name AS course,
        s.created_at
      FROM students s
      JOIN courses c ON s.course_id = c.id
      WHERE 1 = 1
    `;

    const params = [];
    let paramIndex = 1;

    if (search) {
      query += ` AND (s.name ILIKE $${paramIndex} OR s.email ILIKE $${paramIndex} OR c.course_name ILIKE $${paramIndex} OR s.city ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (course) {
      query += ` AND c.course_name = $${paramIndex}`;
      params.push(course);
      paramIndex++;
    }

    if (city) {
      query += ` AND s.city ILIKE $${paramIndex}`;
      params.push(`%${city}%`);
      paramIndex++;
    }

    query += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(Number(limit), Number(offset));

    const result = await pool.query(query, params);
    return result.rows;
  },

  getStudentsCount: async (search = "", course = "", city = "") => {
    let query = `
      SELECT COUNT(*) AS total
      FROM students s
      JOIN courses c ON s.course_id = c.id
      WHERE 1 = 1
    `;
    const params = [];
    let paramIndex = 1;

    if (search) {
      query += ` AND (s.name ILIKE $${paramIndex} OR s.email ILIKE $${paramIndex} OR c.course_name ILIKE $${paramIndex} OR s.city ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (course) {
      query += ` AND c.course_name = $${paramIndex}`;
      params.push(course);
      paramIndex++;
    }

    if (city) {
      query += ` AND s.city ILIKE $${paramIndex}`;
      params.push(`%${city}%`);
      paramIndex++;
    }

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].total, 10);
  },

  getStudentById: async (id) => {
    const query = `
      SELECT s.id, s.name, s.email, s.city, s.course_id, c.course_name AS course, s.created_at
      FROM students s
      JOIN courses c ON s.course_id = c.id
      WHERE s.id = $1
      LIMIT 1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  getStudentByEmail: async (email) => {
    const query = `
      SELECT id, name, email
      FROM students
      WHERE email = $1
      LIMIT 1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  },

  createStudent: async (studentData) => {
    const query = `
      INSERT INTO students (name, email, course_id, city)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const result = await pool.query(query, [
      studentData.name,
      studentData.email,
      studentData.course_id,
      studentData.city,
    ]);
    return { insertId: result.rows[0].id };
  },

  updateStudent: async (id, studentData) => {
    const query = `
      UPDATE students
      SET name = $1, email = $2, course_id = $3, city = $4
      WHERE id = $5
    `;
    const result = await pool.query(query, [
      studentData.name,
      studentData.email,
      studentData.course_id,
      studentData.city,
      id,
    ]);
    return { affectedRows: result.rowCount };
  },

  deleteStudent: async (id) => {
    const query = `
      DELETE FROM students
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return { affectedRows: result.rowCount };
  },
};

module.exports = studentModel;

