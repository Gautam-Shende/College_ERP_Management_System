import type { RecentStudent } from "../../types/dashboard";

interface Props {
  students: RecentStudent[];
}

function RecentStudents({ students }: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm border">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-5">
        <h2 className="text-xl font-semibold text-gray-800">Recent Students</h2>

        <button className="text-sm font-medium text-blue-600 transition hover:underline">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Course</th>
              <th className="px-4 py-3 text-left">City</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No recent students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b transition-colors duration-200 hover:bg-slate-50"
                >
                  {/* Student */}
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-900">{student.name}</p>

                    <p className="text-sm text-gray-500">{student.email}</p>
                  </td>

                  {/* Course */}
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {student.course}
                    </span>
                  </td>

                  {/* City */}
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                      📍 {student.city}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentStudents;
