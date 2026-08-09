const Dashboard = require("../models/dashboardModel");

// All status codes from this file
const HTTP_STATUS = require("../constants/httpStatus");
// All messages error from this file
const MESSAGES = require("../constants/messages");


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

    res.status(HTTP_STATUS.OK).json({
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
