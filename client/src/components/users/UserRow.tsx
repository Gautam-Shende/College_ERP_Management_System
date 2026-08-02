import { Link } from "react-router-dom";
import { Edit2, Trash2, Power } from "lucide-react";
import type { User } from "../../types/user";

interface Props {
  user: User;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: "active" | "inactive") => void;
  deletingId: number | null;
}

// Renders an individual employee row in the employee management table
function UserRow({ user, onDelete, onStatusChange, deletingId }: Props) {
  const isBusy = deletingId === user.id;

  return (
    <tr className="border-b border-gray-100 hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 font-semibold text-slate-700">#{user.id}</td>

      <td className="px-4 py-3">
        <div className="font-medium text-slate-900">{user.name}</div>
        <div className="text-xs text-slate-500">{user.email}</div>
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 capitalize">
          {user.role.replace("_", " ")}
        </span>
      </td>

      <td className="px-4 py-3 text-slate-600 text-sm">
        {user.department_name || "-"}
      </td>

      <td className="px-4 py-3 text-slate-600 text-sm">
        {user.designation || "-"}
      </td>

      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            user.status === "active"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-rose-100 text-rose-800"
          }`}
        >
          {user.status}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          {/* Edit user details button */}
          <Link
            to={`/users/edit/${user.id}`}
            className="inline-flex items-center gap-1 rounded bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 transition"
          >
            <Edit2 size={14} />
            Edit
          </Link>

          {/* Toggle status (Active / Inactive) */}
          <button
            disabled={isBusy}
            onClick={() =>
              onStatusChange(
                user.id,
                user.status === "active" ? "inactive" : "active"
              )
            }
            className={`inline-flex items-center gap-1 rounded px-2.5 py-1.5 text-xs font-medium text-white transition ${
              user.status === "active"
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            } disabled:opacity-50`}
          >
            <Power size={14} />
            {isBusy ? "Saving..." : user.status === "active" ? "Deactivate" : "Activate"}
          </button>

          {/* Delete user */}
          <button
            disabled={isBusy}
            onClick={() => onDelete(user.id)}
            className="inline-flex items-center gap-1 rounded bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100 transition disabled:opacity-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;
