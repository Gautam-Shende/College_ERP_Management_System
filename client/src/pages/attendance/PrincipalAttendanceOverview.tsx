import { useState, useEffect, useCallback } from "react";
import { Calendar, Filter, CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import {
  getStaffAttendanceOverview,
  markStaffAttendance,
} from "../../services/attendanceService";
import type {
  StaffAttendanceOverviewData,
  StaffAttendanceOverviewItem,
} from "../../types/attendance";
import MarkAttendanceModal from "../../components/attendance/MarkAttendanceModal";

export default function PrincipalAttendanceOverview() {
  const getCurrentMonthStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    return `${yyyy}-${mm}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthStr());
  const [roleFilter, setRoleFilter] = useState("");
  const [data, setData] = useState<StaffAttendanceOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [targetStaff, setTargetStaff] = useState<StaffAttendanceOverviewItem | null>(null);
  const [markModalOpen, setMarkModalOpen] = useState(false);

  const fetchOverview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getStaffAttendanceOverview({
        month: selectedMonth,
        role: roleFilter || undefined,
      });
      if (res.success) {
        setData(res.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load staff attendance overview");
    } finally {
      setLoading(false);
    }
  }, [selectedMonth, roleFilter]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  const handleOpenMarkForUser = (staff: StaffAttendanceOverviewItem) => {
    setTargetStaff(staff);
    setMarkModalOpen(true);
  };

  const handleSaveAttendance = async (status: "present" | "absent", date?: string) => {
    if (!targetStaff) return false;
    try {
      const res = await markStaffAttendance({
        user_id: targetStaff.userId,
        attendance_date: date,
        status,
      });
      if (res.success) {
        toast.success(res.message || "Staff attendance updated");
        fetchOverview();
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update staff attendance");
      return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Staff Attendance Overview</h1>
          <p className="text-sm text-slate-500">Monitor and manage attendance records across all departments and staff</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Role Filter */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
            <Filter size={16} className="text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent outline-none text-slate-700 font-medium"
            >
              <option value="">All Staff Roles</option>
              <option value="hod">Head of Department (HOD)</option>
              <option value="teacher">Teacher</option>
              <option value="admission_staff">Admission Staff</option>
              <option value="principal">Principal</option>
            </select>
          </div>

          {/* Month Picker */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
            <Calendar size={16} className="text-slate-400" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent outline-none text-slate-700 font-medium"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : error ? (
        <h2 className="rounded-lg bg-rose-50 p-4 text-center text-rose-600">{error}</h2>
      ) : data ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h3 className="text-base font-bold text-slate-800">
              Staff Attendance Summary ({data.staff.length} staff members)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b">
                <tr>
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Role & Dept</th>
                  <th className="px-6 py-3">Present</th>
                  <th className="px-6 py-3">Absent</th>
                  <th className="px-6 py-3">Attendance %</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.staff.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No staff records match the current filters.
                    </td>
                  </tr>
                ) : (
                  data.staff.map((staff) => (
                    <tr key={staff.userId} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{staff.name}</div>
                        <div className="text-xs text-slate-400">{staff.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
                          {staff.role.replace("_", " ")}
                        </span>
                        {staff.departmentName && (
                          <div className="mt-0.5 text-xs text-slate-500">{staff.departmentName}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 size={15} />
                          {staff.present}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-rose-600 font-semibold">
                        <span className="inline-flex items-center gap-1">
                          <XCircle size={15} />
                          {staff.absent}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {staff.percentage}%
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenMarkForUser(staff)}
                          className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition"
                        >
                          Mark / Update
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Mark Modal */}
      <MarkAttendanceModal
        isOpen={markModalOpen}
        onClose={() => setMarkModalOpen(false)}
        onSubmit={handleSaveAttendance}
        targetUserName={targetStaff?.name}
      />
    </div>
  );
}
