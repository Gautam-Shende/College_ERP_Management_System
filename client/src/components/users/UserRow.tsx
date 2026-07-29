import { Link } from "react-router-dom";
import type { User } from "../../types/user";

interface Props {
  user: User;

  onDelete: (id: number) => void;

  deletingId: number | null;
}

function UserRow({ user, onDelete, deletingId }: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{user.id}</td>

      <td className="px-4 py-3 font-medium">{user.name}</td>

      <td className="px-4 py-3">{user.email}</td>

      <td className="px-4 py-3 capitalize">{user.role.replace("_", " ")}</td>

      <td className="px-4 py-3">{user.department_name || "-"}</td>

      <td className="px-4 py-3">{user.designation}</td>

      <td className="px-4 py-3">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            user.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-center gap-2">
          <Link
            to={`/users/edit/${user.id}`}
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          >
            Edit
          </Link>

          <button
            disabled={deletingId === user.id}
            onClick={() =>
              onStatusChange(
                user.id,
                user.status === "active" ? "inactive" : "active",
              )
            }
            className={`rounded px-3 py-1 text-white ${
              user.status === "active"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {deletingId === user.id
              ? "Updating..."
              : user.status === "active"
                ? "Deactivate"
                : "Activate"}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;
