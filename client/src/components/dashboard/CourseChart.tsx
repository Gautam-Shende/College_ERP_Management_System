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

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-5 text-xl font-semibold">Students by Course</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="course" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="total" fill="#3B82F6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CourseChart;
