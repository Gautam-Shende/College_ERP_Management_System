import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: "present" | "absent", date?: string) => Promise<boolean>;
  targetUserName?: string;
}

export default function MarkAttendanceModal({
  isOpen,
  onClose,
  onSubmit,
  targetUserName,
}: Props) {
  const getTodayStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [attendanceDate, setAttendanceDate] = useState(getTodayStr());
  const [status, setStatus] = useState<"present" | "absent">("present");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !status) return;

    try {
      setIsSubmitting(true);
      const success = await onSubmit(status, attendanceDate);
      if (success) {
        onClose();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to mark attendance");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-bold text-slate-800">
            {targetUserName ? `Mark Attendance for ${targetUserName}` : "Mark Today's Attendance"}
          </h3>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              max={getTodayStr()}
              value={attendanceDate}
              disabled={isSubmitting}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setStatus("present")}
                className={`rounded-lg py-3 text-sm font-semibold border transition disabled:cursor-not-allowed ${
                  status === "present"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                Present
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setStatus("absent")}
                className={`rounded-lg py-3 text-sm font-semibold border transition disabled:cursor-not-allowed ${
                  status === "absent"
                    ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                Absent
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
