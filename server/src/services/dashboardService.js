const dashboardModel = require("../models/dashboardModel");

const fetchDashboardData = async () => {
  const [summary, courseStats, cityStats, recentStudents] = await Promise.all([
    dashboardModel.getDashboardSummary(),
    dashboardModel.getCourseStats(),
    dashboardModel.getCityStats(),
    dashboardModel.getRecentStudents(),
  ]);

  return {
    summary,
    courseStats,
    cityStats,
    recentStudents,
  };
};

module.exports = {
  fetchDashboardData,
};
