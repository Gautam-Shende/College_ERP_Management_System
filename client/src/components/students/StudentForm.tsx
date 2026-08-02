import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Student } from "../../types/student";
import useCourses from "../../hooks/useCourses";

interface Props {
  defaultValues?: Student;
  onSubmit: (data: Student) => void;
  loading?: boolean;
  buttonText?: string;
}

function StudentForm({
  defaultValues,
  onSubmit,
  loading = false,
  buttonText = "Save Student",
}: Props) {
  const { courses } = useCourses();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Student>();

  useEffect(() => {
    if (defaultValues && courses.length > 0) {
      reset({
        ...defaultValues,
        course_id: Number(defaultValues.course_id),
      });
    }
  }, [defaultValues, courses, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label className="mb-2 block font-medium">Name</label>

        <input
          autoComplete="name"
          {...register("name", {
            required: "Name is required",
          })}
          className="w-full rounded border p-3 outline-none focus:border-blue-500"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block font-medium">Email</label>

        <input
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full rounded border p-3 outline-none focus:border-blue-500"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Course */}
      <div>
        <label className="mb-2 block font-medium">Course</label>
        <p className="text-red-500">Course ID : {defaultValues?.course_id}</p>
        <select
          {...register("course_id", {
            required: "Course is required",
            valueAsNumber: true,
          })}
          disabled={courses.length === 0}
          className="w-full rounded border p-3"
        >
          <option value="">
            {courses.length === 0 ? "Loading Courses..." : "Select Course"}
          </option>

          {courses.map((course: any) => (
            <option key={course.id} value={course.id}>
              {course.course_name}
            </option>
          ))}
        </select>

        {errors.course_id && (
          <p className="mt-1 text-sm text-red-500">
            {errors.course_id.message}
          </p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="mb-2 block font-medium">City</label>

        <input
          {...register("city", {
            required: "City is required",
          })}
          className="w-full rounded border p-3 outline-none focus:border-blue-500"
        />

        {errors.city && (
          <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
}

export default StudentForm;
