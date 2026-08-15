const dashboardService = require("../services/dashboardService");
const { HTTP_STATUS } = require("../config/constants");

const getDashboard = async (req, res, next) => {
  try {
    const dashboardData = await dashboardService.fetchDashboardData();

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: dashboardData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboard,
};
