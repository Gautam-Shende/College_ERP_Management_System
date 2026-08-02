const db = require("../config/db");

const getRecentStudents = async () => {
  const sql = `
    SELECT
      s.id,
      s.name,
      s.email,
      c.course_name AS course,
      s.city
    FROM students s
    INNER JOIN courses c
      ON s.course_id = c.id
    ORDER BY s.id DESC
    LIMIT 5
  `;

  const [rows] = await db.query(sql);

  return rows;
};

const getDashboardSummary = async () => {
  const [[[studentResult]], [[userResult]], [[courseResult]], [[cityResult]]] =
    await Promise.all([
      db.query(`
      SELECT COUNT(*) AS totalStudents
      FROM students
    `),

      db.query(`
      SELECT COUNT(*) AS totalUsers
      FROM users
    `),

      db.query(`
      SELECT COUNT(*) AS totalCourses
      FROM courses
    `),

      db.query(`
      SELECT COUNT(DISTINCT city) AS totalCities
      FROM students
    `),
    ]);

  return {
    totalStudents: studentResult.totalStudents,
    totalUsers: userResult.totalUsers,
    totalCourses: courseResult.totalCourses,
    totalCities: cityResult.totalCities,
  };
};

const getCourseStats = async () => {
  const sql = `
    SELECT
      c.course_name AS course,
      COUNT(s.id) AS total
    FROM courses c
    LEFT JOIN students s
      ON c.id = s.course_id
    GROUP BY c.id, c.course_name
    ORDER BY total DESC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

const getCityStats = async () => {
  const [rows] = await db.query(`
    SELECT
      city,
      COUNT(*) AS total
    FROM students
    GROUP BY city
    ORDER BY total DESC
  `);

  return rows;
};

module.exports = {
  getRecentStudents,
  getDashboardSummary,
  getCityStats,
  getCourseStats,
};
