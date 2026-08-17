const pool = require("../config/db");

// Course model: handles direct PostgreSQL queries for course management
const courseModel = {
  getCourses: async () => {
    const query = `
      SELECT c.id, c.course_name, c.department_id, d.department_name, c.created_at
      FROM courses c
      JOIN departments d ON c.department_id = d.id
      ORDER BY c.id ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getCourseById: async (id) => {
    const query = `
      SELECT c.id, c.course_name, c.department_id, d.department_name, c.created_at
      FROM courses c
      JOIN departments d ON c.department_id = d.id
      WHERE c.id = $1
      LIMIT 1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  getCourseByNameAndDept: async (courseName, departmentId) => {
    const query = `
      SELECT id
      FROM courses
      WHERE LOWER(course_name) = LOWER($1) AND department_id = $2
      LIMIT 1
    `;
    const result = await pool.query(query, [courseName, departmentId]);
    return result.rows[0] || null;
  },

  departmentExists: async (departmentId) => {
    const query = `
      SELECT id
      FROM departments
      WHERE id = $1
      LIMIT 1
    `;
    const result = await pool.query(query, [departmentId]);
    return result.rows[0] || null;
  },

  hasStudents: async (courseId) => {
    const query = `
      SELECT COUNT(*)::INTEGER AS count
      FROM students
      WHERE course_id = $1
    `;
    const result = await pool.query(query, [courseId]);
    return parseInt(result.rows[0].count, 10) > 0;
  },

  createCourse: async (courseName, departmentId) => {
    const query = `
      INSERT INTO courses (course_name, department_id)
      VALUES ($1, $2)
      RETURNING id
    `;
    const result = await pool.query(query, [courseName, departmentId]);
    return { insertId: result.rows[0].id };
  },

  updateCourse: async (id, courseName, departmentId) => {
    const query = `
      UPDATE courses
      SET course_name = $1, department_id = $2
      WHERE id = $3
    `;
    const result = await pool.query(query, [courseName, departmentId, id]);
    return { affectedRows: result.rowCount };
  },

  deleteCourse: async (id) => {
    const query = `
      DELETE FROM courses
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return { affectedRows: result.rowCount };
  },
};

module.exports = courseModel;

