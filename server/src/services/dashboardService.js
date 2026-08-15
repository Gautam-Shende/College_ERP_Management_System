const dashboardRepository = require("../repositories/dashboardRepository");

const fetchDashboardData = async () => {
  const [summary, courseStats, cityStats, recentStudents] = await Promise.all([
    dashboardRepository.getDashboardSummary(),
    dashboardRepository.getCourseStats(),
    dashboardRepository.getCityStats(),
    dashboardRepository.getRecentStudents(),
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
