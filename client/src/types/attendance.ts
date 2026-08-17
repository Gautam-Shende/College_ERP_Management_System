export interface AttendanceRecord {
  id: number;
  user_id: number;
  attendance_date: string;
  status: "present" | "absent";
  created_at?: string;
  updated_at?: string;
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  totalMarkedDays: number;
  percentage: number;
}

export interface MyAttendanceData {
  month: string;
  summary: AttendanceSummary;
  records: AttendanceRecord[];
}

export interface StaffAttendanceOverviewItem {
  userId: number;
  name: string;
  email: string;
  role: "principal" | "hod" | "teacher" | "admission_staff";
  designation?: string;
  departmentName?: string;
  present: number;
  absent: number;
  totalMarkedDays: number;
  percentage: number;
}

export interface StaffAttendanceOverviewData {
  month: string;
  staff: StaffAttendanceOverviewItem[];
}
