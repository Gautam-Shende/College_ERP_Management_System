import type { RecentStudent } from "../../types/dashboard";

interface Props {
  students: RecentStudent[];
}

function RecentStudents({ students }: Props) {

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">Recent Students</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>

              <th className="px-4 py-3 text-left">Email</th>

              <th className="px-4 py-3 text-left">Course</th>

              <th className="px-4 py-3 text-left">City</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{student.name}</td>

                <td className="px-4 py-3">{student.email}</td>

                <td className="px-4 py-3">{student.course}</td>

                <td className="px-4 py-3">{student.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentStudents;
