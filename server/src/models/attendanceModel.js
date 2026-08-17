const pool = require("../config/db");

const getMonthDateRange = (monthStr) => {
  const [yearStr, monthNumStr] = monthStr.split("-");
  const year = Number(yearStr);
  const month = Number(monthNumStr);

  const startDate = `${yearStr}-${String(month).padStart(2, "0")}-01`;

  let nextYear = year;
  let nextMonth = month + 1;
  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear = year + 1;
  }
  const endDate = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;

  return { startDate, endDate };
};

// Attendance model: handles direct PostgreSQL queries for staff attendance
const attendanceModel = {
  upsertAttendance: async (userId, attendanceDate, status) => {
    const query = `
      INSERT INTO staff_attendance (user_id, attendance_date, status)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, attendance_date)
      DO UPDATE SET status = EXCLUDED.status, updated_at = CURRENT_TIMESTAMP
      RETURNING id, user_id, attendance_date, status, created_at, updated_at
    `;
    const result = await pool.query(query, [
      userId,
      attendanceDate,
      status,
    ]);
    return result.rows[0];
  },

  getUserMonthlyAttendance: async (userId, month) => {
    const { startDate, endDate } = getMonthDateRange(month);
    const query = `
      SELECT id, user_id, TO_CHAR(attendance_date, 'YYYY-MM-DD') AS attendance_date, status, created_at, updated_at
      FROM staff_attendance
      WHERE user_id = $1 AND attendance_date >= $2 AND attendance_date < $3
      ORDER BY attendance_date ASC
    `;
    const result = await pool.query(query, [
      userId,
      startDate,
      endDate,
    ]);
    return result.rows;
  },

  getUserAttendanceSummary: async (userId, month) => {
    const { startDate, endDate } = getMonthDateRange(month);
    const query = `
      SELECT
        COUNT(CASE WHEN status = 'present' THEN 1 END)::INTEGER AS present_count,
        COUNT(CASE WHEN status = 'absent' THEN 1 END)::INTEGER AS absent_count,
        COUNT(*)::INTEGER AS total_marked_days
      FROM staff_attendance
      WHERE user_id = $1 AND attendance_date >= $2 AND attendance_date < $3
    `;
    const result = await pool.query(query, [
      userId,
      startDate,
      endDate,
    ]);
    return (
      result.rows[0] || {
        present_count: 0,
        absent_count: 0,
        total_marked_days: 0,
      }
    );
  },

  getAllStaffMonthlySummary: async (month) => {
    const { startDate, endDate } = getMonthDateRange(month);
    const query = `
      SELECT
        u.id AS user_id,
        u.name,
        u.email,
        u.role,
        u.designation,
        d.department_name,
        COUNT(CASE WHEN sa.status = 'present' THEN 1 END)::INTEGER AS present_count,
        COUNT(CASE WHEN sa.status = 'absent' THEN 1 END)::INTEGER AS absent_count,
        COUNT(sa.id)::INTEGER AS total_marked_days
      FROM users u
      LEFT JOIN departments d ON u.department_id = d.id
      LEFT JOIN staff_attendance sa
        ON u.id = sa.user_id AND sa.attendance_date >= $1 AND sa.attendance_date < $2
      WHERE u.status = 'active' AND u.role IN ('teacher', 'hod', 'admission_staff')
      GROUP BY u.id, u.name, u.email, u.role, u.designation, d.department_name
      ORDER BY u.role, u.name
    `;
    const result = await pool.query(query, [
      startDate,
      endDate,
    ]);
    return result.rows;
  },
};

module.exports = attendanceModel;

