const attendanceService = require("../services/attendanceService");
const { HTTP_STATUS } = require("../config/constants");

const getMyAttendance = async (req, res, next) => {
  try {
    const { month } = req.query;
    const data = await attendanceService.fetchMyAttendance(req.user.id, month);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Attendance data fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getStaffAttendanceOverview = async (req, res, next) => {
  try {
    const { month, role, userId } = req.query;
    const data = await attendanceService.fetchStaffAttendanceOverview(
      month,
      role,
      userId,
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Staff attendance overview fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

const markStaffAttendance = async (req, res, next) => {
  try {
    const { user_id, attendance_date, status } = req.body;

    if (!user_id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "User ID is required",
      });
    }

    const record = await attendanceService.markAttendance(
      user_id,
      attendance_date,
      status,
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Staff attendance updated successfully",
      data: record,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyAttendance,
  getStaffAttendanceOverview,
  markStaffAttendance,
};
