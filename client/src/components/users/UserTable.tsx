import UserRow from "./UserRow";
import type { User } from "../../types/user";

interface Props {
  users: User[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: "active" | "inactive") => void;
  deletingId: number | null;
  sortBy: string;
  order: string;
  setSortBy: (value: string) => void;
  setOrder: (value: "ASC" | "DESC") => void;
}

// User list table with sortable column headers and row action bindings
function UserTable({
  users,
  onDelete,
  onStatusChange,
  deletingId,
  sortBy,
  order,
  setSortBy,
  setOrder,
}: Props) {
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(column);
      setOrder("ASC");
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-900 text-slate-200">
          <tr>
            <th
              onClick={() => handleSort("id")}
              className="cursor-pointer px-4 py-3.5 font-semibold transition hover:text-white"
            >
              ID {sortBy === "id" && (order === "ASC" ? "↑" : "↓")}
            </th>

            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer px-4 py-3.5 font-semibold transition hover:text-white"
            >
              Employee Name {sortBy === "name" && (order === "ASC" ? "↑" : "↓")}
            </th>

            <th
              onClick={() => handleSort("role")}
              className="cursor-pointer px-4 py-3.5 font-semibold transition hover:text-white"
            >
              Role {sortBy === "role" && (order === "ASC" ? "↑" : "↓")}
            </th>

            <th className="px-4 py-3.5 font-semibold">Department</th>

            <th className="px-4 py-3.5 font-semibold">Designation</th>

            <th
              onClick={() => handleSort("status")}
              className="cursor-pointer px-4 py-3.5 font-semibold transition hover:text-white"
            >
              Status {sortBy === "status" && (order === "ASC" ? "↑" : "↓")}
            </th>

            <th className="px-4 py-3.5 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-slate-500">
                No employee records found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                deletingId={deletingId}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
