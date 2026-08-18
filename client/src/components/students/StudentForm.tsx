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
    formState: { errors, isSubmitting },
  } = useForm<Student>();

  const isFormDisabled = loading || isSubmitting;

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
      {/* Name input */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">Name</label>

        <input
          autoComplete="name"
          placeholder="e.g. Gautam Shende"
          disabled={isFormDisabled}
          {...register("name", {
            required: "Name is required",
          })}
          className="w-full rounded border border-slate-300 p-3 outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email input */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">Email</label>

        <input
          type="email"
          autoComplete="email"
          placeholder="e.g. gautam@gmail.com"
          disabled={isFormDisabled}
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full rounded border border-slate-300 p-3 outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Course select dropdown */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">Course</label>

        <select
          {...register("course_id", {
            required: "Course is required",
            valueAsNumber: true,
          })}
          disabled={isFormDisabled || courses.length === 0}
          className="w-full rounded border border-slate-300 p-3 disabled:bg-slate-100 disabled:cursor-not-allowed"
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

      {/* City input */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">City</label>

        <input
          disabled={isFormDisabled}
          {...register("city", {
            required: "City is required",
          })}
          className="w-full rounded border border-slate-300 p-3 outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
        />

        {errors.city && (
          <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>

      {/* Submit button - disabled during loading or submitting to prevent multiple clicks */}
      <button
        type="submit"
        disabled={isFormDisabled}
        className="w-full sm:w-auto rounded bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
      >
        {isFormDisabled ? "Saving..." : buttonText}
      </button>
    </form>
  );
}

export default StudentForm;
