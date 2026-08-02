import { Pencil, Trash2 } from "lucide-react";
import type { Student } from "../../types/student";
import { useNavigate } from "react-router-dom";

interface Props {
  student: Student;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

// Renders an individual student row in the student directory table
function StudentRow({ student, onDelete, deletingId }: Props) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 font-semibold text-slate-700">#{student.id}</td>
      <td className="px-4 py-3 font-medium text-slate-900">{student.name}</td>
      <td className="px-4 py-3 text-slate-600 text-sm">{student.email}</td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          {student.course}
        </span>
      </td>
      <td className="px-4 py-3 text-slate-600 text-sm">{student.city}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => student.id && navigate(`/students/edit/${student.id}`)}
            className="rounded bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 transition"
            title="Edit Student"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => student.id && onDelete(student.id)}
            disabled={deletingId === student.id}
            className="rounded bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 transition disabled:opacity-50"
            title="Delete Student"
          >
            {deletingId === student.id ? "..." : <Trash2 size={16} />}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentRow;
