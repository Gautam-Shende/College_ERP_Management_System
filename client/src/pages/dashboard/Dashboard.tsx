import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserCheck, CalendarCheck, ShieldCheck, User as UserIcon, UserPlus } from "lucide-react";
import useDashboard from "../../hooks/useDashboard";
import SummaryCards from "../../components/dashboard/SummaryCards";
import CourseChart from "../../components/dashboard/CourseChart";
import CityChart from "../../components/dashboard/Citychart";
import RecentStudents from "../../components/dashboard/RecentStudentsTable";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import { useAuth } from "../../context/AuthContext";
import { getMyAttendance } from "../../services/attendanceService";
import type { MyAttendanceData } from "../../types/attendance";
import AttendanceSummaryCard from "../../components/attendance/AttendanceSummaryCard";

function Dashboard() {
  const { user } = useAuth();
  const isAdmissionStaff = user?.role === "admission_staff";
  
  // Disable general dashboard API call for Admission Staff
  const { dashboard, loading, error } = useDashboard(!isAdmissionStaff);
  const [myAttendance, setMyAttendance] = useState<MyAttendanceData | null>(null);

  useEffect(() => {
    if (user && user.role !== "principal") {
      getMyAttendance()
        .then((res) => {
          if (res.success) setMyAttendance(res.data);
        })
        .catch(() => {});
    }
  }, [user]);

  // --- ADMISSION STAFF DASHBOARD ---
  if (isAdmissionStaff) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Staff Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back, {user?.name}</p>
        </div>

        {/* Profile Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-4 text-blue-600">
              <UserIcon size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
              <div className="mt-2 flex gap-2">
                <span className="inline-block rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 uppercase tracking-wider">
                  Admission Staff
                </span>
                {user?.designation && (
                  <span className="inline-block rounded bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {user.designation}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        {myAttendance && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">My Attendance</h2>
              <Link
                to="/attendance"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
              >
                <CalendarCheck size={16} />
                View Full Attendance Log
              </Link>
            </div>
            <AttendanceSummaryCard
              month={myAttendance.month}
              summary={myAttendance.summary}
            />
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <h2 className="rounded-lg bg-rose-50 p-4 text-center text-rose-600">{error}</h2>;
  }

  if (!dashboard) return null;

  // --- PRINCIPAL DASHBOARD ---
  if (user?.role === "principal") {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Principal Dashboard</h1>
            <p className="text-sm text-slate-500">Institution Overview & System Control</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
            >
              <UserPlus size={18} />
              Register User
            </Link>
            <Link
              to="/users"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
            >
              <UserCheck size={18} />
              User Management
            </Link>
            <Link
              to="/attendance/overview"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
            >
              <ShieldCheck size={18} />
              Attendance Overview
            </Link>
          </div>
        </div>

        <SummaryCards summary={dashboard.summary} />

        {/* User Registration Quick Access Card */}
        <div className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Register New Staff Account</h2>
            <p className="text-sm text-slate-600">Register and assign HOD, Teacher, or Admission Staff accounts directly.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/users/add?role=hod"
              className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-xs font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 transition"
            >
              + Register HOD
            </Link>
            <Link
              to="/users/add?role=teacher"
              className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50 transition"
            >
              + Register Teacher
            </Link>
            <Link
              to="/users/add?role=admission_staff"
              className="rounded-lg border border-purple-200 bg-white px-3 py-2 text-xs font-semibold text-purple-700 shadow-sm hover:bg-purple-50 transition"
            >
              + Register Admission Staff
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-700 transition"
            >
              Register Form
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CourseChart data={dashboard.courseStats} />
          <CityChart data={dashboard.cityStats} />
        </div>

        <RecentStudents students={dashboard.recentStudents} />
      </div>
    );
  }

  // --- TEACHER & HOD DASHBOARD ---
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {user?.role === "hod" ? "HOD Dashboard" : "Teacher Dashboard"}
        </h1>
        <p className="text-sm text-slate-500">Welcome back, {user?.name}</p>
      </div>

      <SummaryCards summary={dashboard.summary} />

      {/* Own Monthly Attendance Widget */}
      {myAttendance && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">My Monthly Attendance</h2>
            <Link
              to="/attendance"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
            >
              <CalendarCheck size={16} />
              View Attendance Records
            </Link>
          </div>
          <AttendanceSummaryCard
            month={myAttendance.month}
            summary={myAttendance.summary}
          />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <CourseChart data={dashboard.courseStats} />
        <CityChart data={dashboard.cityStats} />
      </div>

      <RecentStudents students={dashboard.recentStudents} />
    </div>
  );
}

export default Dashboard;
