import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import useDepartments from "../../hooks/useDepartments"
import type { Course } from "../../types/course"


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseName: string, departmentId: number) => Promise<boolean>;
  initialData?: Course | null;
}

// Modal dialog for adding or editing course entries
export default function CourseModal({ isOpen, onClose, onSubmit, initialData }: Props) {
  const [courseName, setCourseName] = useState("");
  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [submitting, setSubmitting] = useState(false);

  const { departments } = useDepartments();

  useEffect(() => {
    if (initialData) {
      setCourseName(initialData.course_name || "");
      setDepartmentId(initialData.department_id || "");
    } else {
      setCourseName("");
      setDepartmentId("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !courseName.trim() || !departmentId) return;

    try {
      setSubmitting(true);
      const success = await onSubmit(courseName.trim(), Number(departmentId));
      if (success) {
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-bold text-slate-800">
            {initialData ? "Edit Course" : "Add New Course"}
          </h3>
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Course Name
            </label>
            <input
              type="text"
              required
              disabled={submitting}
              placeholder="e.g. Bachelor of Computer Applications"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Department
            </label>
            <select
              required
              disabled={submitting}
              value={departmentId}
              onChange={(e) => setDepartmentId(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.department_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              disabled={submitting}
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
            >
              {submitting ? "Saving..." : initialData ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
