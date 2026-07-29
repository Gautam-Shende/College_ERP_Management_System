import UserRow from "./UserRow";
import type { User } from "../../types/user";

interface Props {
  users: User[];

  onDelete: (id: number) => void;

  deletingId: number | null;

  sortBy: string;

  order: string;

  setSortBy: (value: string) => void;

  setOrder: (value: "ASC" | "DESC") => void;
}

function UserTable({
  users,
  onDelete,
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
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th
              onClick={() => handleSort("id")}
              className="cursor-pointer px-4 py-3 text-left"
            >
              ID
            </th>

            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer px-4 py-3 text-left"
            >
              Name
            </th>

            <th className="px-4 py-3 text-left">Email</th>

            <th
              onClick={() => handleSort("role")}
              className="cursor-pointer px-4 py-3 text-left"
            >
              Role
            </th>

            <th className="px-4 py-3 text-left">Department</th>

            <th className="px-4 py-3 text-left">Designation</th>

            <th
              onClick={() => handleSort("status")}
              className="cursor-pointer px-4 py-3 text-left"
            >
              Status
            </th>

            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              deletingId={deletingId}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
