import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Student } from "../../types/student";

import useCourses from "../../hooks/useCourses";

interface Props {
  defaultValues?: Student;
  onSubmit: (data: Student) => void;
  loading?: boolean;
}

function StudentForm({ defaultValues, onSubmit, loading = false }: Props) {
  const { courses } = useCourses();

  const { register, handleSubmit, reset } = useForm<Student>();

  // Important for Edit Form
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">Name</label>

        <input
          {...register("name")}
          className="w-full rounded border p-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Email</label>

        <input
          type="email"
          {...register("email")}
          className="w-full rounded border p-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Course</label>

        <select {...register("course")} className="w-full rounded border p-3">
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.course_name}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">City</label>

        <input
          {...register("city")}
          className="w-full rounded border p-3 outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Student"}
      </button>
    </form>
  );
}

export default StudentForm;
