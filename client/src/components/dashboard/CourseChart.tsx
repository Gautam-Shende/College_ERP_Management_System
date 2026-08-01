import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

import type { CourseStat } from "../../types/dashboard";

interface Props {
  data: CourseStat[];
}

function CourseChart({ data }: Props) {
  if (!data.length) {
    return (
      <div className="rounded-xl bg-white p-5 shadow flex items-center justify-center h-[380px]">
        <p className="text-gray-500">No course data available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-5 text-xl font-semibold">Students by Course</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="course"
            angle={-20}
            textAnchor="end"
            interval={0}
            height={70}
          />

          <YAxis />

          <Tooltip cursor={{ fill: "#f3f4f6" }} />

          <Bar dataKey="total" fill="#3B82F6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CourseChart;
