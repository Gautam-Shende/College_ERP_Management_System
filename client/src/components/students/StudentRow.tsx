import { Pencil, Trash2 } from "lucide-react";

import type { Student } from "../../types/student";

import { useNavigate } from "react-router-dom";

interface Props {
  student: Student;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

function StudentRow({ student, onDelete, deletingId }: Props) {
  const navigate = useNavigate();

  return (
    <tr className="border-b hover:bg-slate-50">
      <td className="px-4 py-3">{student.id}</td>

      <td className="px-4 py-3">{student.name}</td>

      <td className="px-4 py-3">{student.email}</td>

      <td className="px-4 py-3">{student.course}</td>

      <td className="px-4 py-3">{student.city}</td>

      <td className="px-4 py-3">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/students/edit/${student.id}`)}
            className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(student.id)}
            disabled={deletingId === student.id}
            className="rounded bg-red-500 p-2 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deletingId === student.id ? "..." : <Trash2 size={18} />}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentRow;
