import api from "../api/axios";
import type {
  MyAttendanceData,
  StaffAttendanceOverviewData,
} from "../types/attendance";

export const getMyAttendance = async (month?: string) => {
  const params = month ? { month } : {};
  const response = await api.get<{
    success: boolean;
    data: MyAttendanceData;
  }>("/attendance/my", { params });
  return response.data;
};

export const getStaffAttendanceOverview = async (filters?: {
  month?: string;
  role?: string;
  userId?: number;
}) => {
  const response = await api.get<{
    success: boolean;
    data: StaffAttendanceOverviewData;
  }>("/attendance/overview", { params: filters });
  return response.data;
};

export const markStaffAttendance = async (data: {
  user_id: number;
  attendance_date?: string;
  status: "present" | "absent";
}) => {
  const response = await api.post<{
    success: boolean;
    message: string;
  }>("/attendance/admin/mark", data);
  return response.data;
};
