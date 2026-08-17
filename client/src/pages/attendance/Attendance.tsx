import { useState, useEffect, useCallback } from "react";
import { Calendar } from "lucide-react";
import { getMyAttendance } from "../../services/attendanceService";
import type { MyAttendanceData } from "../../types/attendance";
import AttendanceSummaryCard from "../../components/attendance/AttendanceSummaryCard";
import AttendanceTable from "../../components/attendance/AttendanceTable";

export default function Attendance() {
  const getCurrentMonthStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    return `${yyyy}-${mm}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthStr());
  const [data, setData] = useState<MyAttendanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async (month: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMyAttendance(month);
      if (res.success) {
        setData(res.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load attendance");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance(selectedMonth);
  }, [selectedMonth, fetchAttendance]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Attendance & Activity</h1>
          <p className="text-sm text-slate-500">View your monthly attendance summary and daily records</p>
        </div>

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

      {error ? (
        <h2 className="rounded-lg bg-rose-50 p-4 text-center text-rose-600 font-medium">{error}</h2>
      ) : data ? (
        <>
          <AttendanceSummaryCard month={data.month} summary={data.summary} />
          <AttendanceTable records={data.records} />
        </>
      ) : null}
    </div>
  );
}
