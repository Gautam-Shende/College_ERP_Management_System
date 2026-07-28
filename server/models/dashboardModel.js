const db = require("../config/db");

const getDashboardStats = async () => {
  const [[students]] = await db.query(
    "SELECT COUNT(*) AS totalStudents FROM students",
  );

  const [[courses]] = await db.query(
    "SELECT COUNT(*) AS totalCourses FROM courses",
  );

  const [[cities]] = await db.query(
    "SELECT COUNT(DISTINCT city) AS totalCities FROM students",
  );

  const [[users]] = await db.query("SELECT COUNT(*) AS totalUsers FROM users");

  return {
    totalStudents: students.totalStudents,
    totalCourses: courses.totalCourses,
    totalCities: cities.totalCities,
    totalUsers: users.totalUsers,
  };
};

const getRecentStudents = async () => {
  const sql = `
    SELECT
      id,
      name,
      email,
      course,
      city
    FROM students
    ORDER BY id DESC
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
  const [rows] = await db.query(`
    SELECT
      course,
      COUNT(*) AS total
    FROM students
    GROUP BY course
    ORDER BY total DESC
  `);

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
  getDashboardStats,
  getRecentStudents,
  getDashboardSummary,
  getCityStats,
  getCourseStats
};
