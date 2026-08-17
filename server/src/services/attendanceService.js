const attendanceModel = require("../models/attendanceModel");

const getCurrentMonthString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const markAttendance = async (userId, attendanceDate, status) => {
  const dateStr = attendanceDate || getTodayDateString();

  // Prevent marking future attendance dates
  const todayStr = getTodayDateString();
  if (dateStr > todayStr) {
    const error = new Error("Cannot mark attendance for future dates");
    error.statusCode = 400;
    throw error;
  }

  const validStatuses = ["present", "absent"];
  if (!validStatuses.includes(status)) {
    const error = new Error("Status must be either 'present' or 'absent'");
    error.statusCode = 400;
    throw error;
  }

  return await attendanceModel.upsertAttendance(userId, dateStr, status);
};

const fetchMyAttendance = async (userId, month) => {
  const selectedMonth = month || getCurrentMonthString();

  if (!/^\d{4}-\d{2}$/.test(selectedMonth)) {
    const error = new Error("Invalid month format. Expected YYYY-MM");
    error.statusCode = 400;
    throw error;
  }

  const [records, summary] = await Promise.all([
    attendanceModel.getUserMonthlyAttendance(userId, selectedMonth),
    attendanceModel.getUserAttendanceSummary(userId, selectedMonth),
  ]);

  const presentCount = Number(summary.present_count || 0);
  const absentCount = Number(summary.absent_count || 0);
  const totalDays = Number(summary.total_marked_days || 0);

  const percentage =
    totalDays > 0 ? Number(((presentCount / totalDays) * 100).toFixed(2)) : 0;

  return {
    month: selectedMonth,
    summary: {
      present: presentCount,
      absent: absentCount,
      totalMarkedDays: totalDays,
      percentage,
    },
    records,
  };
};

const fetchStaffAttendanceOverview = async (month, roleFilter, userIdFilter) => {
  const selectedMonth = month || getCurrentMonthString();

  if (!/^\d{4}-\d{2}$/.test(selectedMonth)) {
    const error = new Error("Invalid month format. Expected YYYY-MM");
    error.statusCode = 400;
    throw error;
  }

  let staffList = await attendanceModel.getAllStaffMonthlySummary(
    selectedMonth,
  );

  if (roleFilter) {
    staffList = staffList.filter((s) => s.role === roleFilter);
  }

  if (userIdFilter) {
    staffList = staffList.filter((s) => Number(s.user_id) === Number(userIdFilter));
  }

  const processedStaff = staffList.map((staff) => {
    const present = Number(staff.present_count || 0);
    const absent = Number(staff.absent_count || 0);
    const total = Number(staff.total_marked_days || 0);
    const percentage = total > 0 ? Number(((present / total) * 100).toFixed(2)) : 0;

    return {
      userId: staff.user_id,
      name: staff.name,
      email: staff.email,
      role: staff.role,
      designation: staff.designation,
      departmentName: staff.department_name,
      present,
      absent,
      totalMarkedDays: total,
      percentage,
    };
  });

  return {
    month: selectedMonth,
    staff: processedStaff,
  };
};

module.exports = {
  markAttendance,
  fetchMyAttendance,
  fetchStaffAttendanceOverview,
};
