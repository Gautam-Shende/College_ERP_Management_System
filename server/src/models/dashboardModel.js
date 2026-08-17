const pool = require("../config/db");

// Dashboard model: handles aggregated queries for metrics & stats
const dashboardModel = {
  getDashboardSummary: async () => {
    const query = `
      SELECT
        (SELECT COUNT(*)::INTEGER FROM students) AS total_students,
        (SELECT COUNT(*)::INTEGER FROM courses) AS total_courses,
        (SELECT COUNT(*)::INTEGER FROM departments) AS total_departments
    `;
    const result = await pool.query(query);
    return result.rows[0];
  },

  getCourseStats: async () => {
    const query = `
      SELECT c.course_name AS course, COUNT(s.id)::INTEGER AS count
      FROM courses c
      LEFT JOIN students s ON c.id = s.course_id
      GROUP BY c.id, c.course_name
      ORDER BY count DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getCityStats: async () => {
    const query = `
      SELECT city, COUNT(id)::INTEGER AS count
      FROM students
      GROUP BY city
      ORDER BY count DESC
      LIMIT 10
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getRecentStudents: async () => {
    const query = `
      SELECT s.id, s.name, s.email, s.city, c.course_name AS course, s.created_at
      FROM students s
      JOIN courses c ON s.course_id = c.id
      ORDER BY s.id DESC
      LIMIT 5
    `;
    const result = await pool.query(query);
    return result.rows;
  },
};

module.exports = dashboardModel;

