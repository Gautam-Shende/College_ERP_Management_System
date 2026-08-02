import { useState } from "react";
import { Plus, Building2, Edit2, Trash2 } from "lucide-react";
import useDepartments from "../../hooks/useDepartments";
import DepartmentModal from "../../components/departments/DepartmentModal";
import type { Department } from "../../types/department";
import { useAuth } from "../../context/AuthContext";

// Department management overview page
export default function DepartmentList() {
  const { departments, loading, error, addDepartment, editDepartment, removeDepartment } = useDepartments();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const { hasRole } = useAuth();
  const canModify = hasRole("principal");

  const handleOpenAdd = () => {
    setEditingDepartment(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setModalOpen(true);
  };

  const handleSave = async (departmentName: string) => {
    if (editingDepartment) {
      return await editDepartment(editingDepartment.id, departmentName);
    } else {
      return await addDepartment(departmentName);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <h2 className="rounded-lg bg-rose-50 p-4 text-center text-rose-600">{error}</h2>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
          <p className="text-sm text-slate-500">Manage academic departments across the institution</p>
        </div>

        {canModify && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            Add New Department
          </button>
        )}
      </div>

      {/* Grid of Departments */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
                <Building2 size={24} />
              </div>
              {canModify && (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleOpenEdit(dept)}
                    className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    title="Edit Department"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => removeDepartment(dept.id)}
                    className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    title="Delete Department"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-slate-900">{dept.department_name}</h3>
              <p className="mt-1 text-xs text-slate-400">Department ID: #{dept.id}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Department Create/Edit Modal */}
      <DepartmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingDepartment}
      />
    </div>
  );
}
