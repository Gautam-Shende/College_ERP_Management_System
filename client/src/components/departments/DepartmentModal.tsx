import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Department } from "../../types/department";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (departmentName: string) => Promise<boolean>;
  initialData?: Department | null;
}

// Modal dialog for creating or updating department entries
export default function DepartmentModal({ isOpen, onClose, onSubmit, initialData }: Props) {
  const [departmentName, setDepartmentName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setDepartmentName(initialData.department_name || "");
    } else {
      setDepartmentName("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentName.trim()) return;

    setSubmitting(true);
    const success = await onSubmit(departmentName.trim());
    setSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-bold text-slate-800">
            {initialData ? "Edit Department" : "Add New Department"}
          </h3>
          <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Department Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Computer Science & Engineering"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : initialData ? "Update Department" : "Create Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
