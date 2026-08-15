const db = require("../config/database");
const queries = require("../queries/dashboard.queries");

const getRecentStudents = async () => {
  const result = await db.query(queries.GET_RECENT_STUDENTS);
  return result.rows;
};

const getDashboardSummary = async () => {
  const [studentRes, userRes, courseRes, cityRes] = await Promise.all([
    db.query(queries.GET_TOTAL_STUDENTS),
    db.query(queries.GET_TOTAL_USERS),
    db.query(queries.GET_TOTAL_COURSES),
    db.query(queries.GET_TOTAL_CITIES),
  ]);

  return {
    totalStudents: parseInt(studentRes.rows[0].totalStudents, 10),
    totalUsers: parseInt(userRes.rows[0].totalUsers, 10),
    totalCourses: parseInt(courseRes.rows[0].totalCourses, 10),
    totalCities: parseInt(cityRes.rows[0].totalCities, 10),
  };
};

const getCourseStats = async () => {
  const result = await db.query(queries.GET_COURSE_STATS);
  return result.rows;
};

const getCityStats = async () => {
  const result = await db.query(queries.GET_CITY_STATS);
  return result.rows;
};

module.exports = {
  getRecentStudents,
  getDashboardSummary,
  getCourseStats,
  getCityStats,
};
