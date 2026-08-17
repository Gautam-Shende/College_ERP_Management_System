import { CheckCircle2, XCircle, Calendar, Percent } from "lucide-react";
import type { AttendanceSummary } from "../../types/attendance";

interface Props {
  month: string;
  summary: AttendanceSummary;
}

export default function AttendanceSummaryCard({ month, summary }: Props) {
  const formatMonthName = (monthStr: string) => {
    if (!monthStr) return "";
    const [year, m] = monthStr.split("-");
    const date = new Date(Number(year), Number(m) - 1, 1);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Monthly Attendance Summary</h2>
          <p className="text-xs text-slate-500">{formatMonthName(month)}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
          <Calendar size={20} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Present Days */}
        <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 size={18} />
            <span className="text-xs font-semibold uppercase">Present</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-900">{summary.present}</p>
        </div>

        {/* Absent Days */}
        <div className="rounded-lg bg-rose-50 p-4 border border-rose-100">
          <div className="flex items-center gap-2 text-rose-700">
            <XCircle size={18} />
            <span className="text-xs font-semibold uppercase">Absent</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-900">{summary.absent}</p>
        </div>

        {/* Total Marked Days */}
        <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
          <div className="flex items-center gap-2 text-slate-700">
            <Calendar size={18} />
            <span className="text-xs font-semibold uppercase">Marked Days</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{summary.totalMarkedDays}</p>
        </div>

        {/* Percentage */}
        <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
          <div className="flex items-center gap-2 text-blue-700">
            <Percent size={18} />
            <span className="text-xs font-semibold uppercase">Attendance</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-900">{summary.percentage}%</p>
        </div>
      </div>
    </div>
  );
}
