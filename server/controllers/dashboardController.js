const Dashboard = require("../models/dashboardModel");

const getDashboard = async (req, res, next) => {
  try {
    const [summary, courseStats, cityStats, recentStudents] = await Promise.all(
      [
        Dashboard.getDashboardSummary(),
        Dashboard.getCourseStats(),
        Dashboard.getCityStats(),
        Dashboard.getRecentStudents(),
      ],
    );

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        summary,
        courseStats,
        cityStats,
        recentStudents,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboard,
};
