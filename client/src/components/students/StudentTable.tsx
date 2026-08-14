import type { Student } from "../../types/student";
import StudentRow from "./StudentRow";

interface Props {
  students: Student[];
  onDelete: (id: number) => void;
  deletingId: number | null;
  fetching?: boolean;

  sortBy: string;
  order: string;

  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
}

function StudentTable({
  students,
  onDelete,
  deletingId,
  fetching = false,

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

  const renderArrow = (column: string) => {
    if (sortBy !== column) return "";

    return order === "ASC" ? " ↑" : " ↓";
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
              ID{renderArrow("id")}
            </th>

            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer px-4 py-3 text-left"
            >
              Name{renderArrow("name")}
            </th>

            <th
              onClick={() => handleSort("email")}
              className="cursor-pointer px-4 py-3 text-left"
            >
              Email{renderArrow("email")}
            </th>

            <th
              onClick={() => handleSort("course")}
              className="cursor-pointer px-4 py-3 text-left"
            >
              Course{renderArrow("course")}
            </th>

            <th
              onClick={() => handleSort("city")}
              className="cursor-pointer px-4 py-3 text-left"
            >
              City{renderArrow("city")}
            </th>

            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* Show loading state while searching/filtering */}
          {fetching ? (
            <tr>
              <td colSpan={6} className="py-10 text-center text-blue-600 font-medium">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                  <span>Searching students...</span>
                </div>
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-gray-500">
                No Students Found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onDelete={onDelete}
                deletingId={deletingId}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
