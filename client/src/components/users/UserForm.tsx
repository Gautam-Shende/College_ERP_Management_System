import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { User } from "../../types/user";

import useDepartments from "../../hooks/useDepartments";

interface Props {
  defaultValues?: User;
  onSubmit: (data: User) => void;
  loading?: boolean;
}

function UserForm({ defaultValues, onSubmit, loading = false }: Props) {
  const { departments } = useDepartments();

  const { register, handleSubmit, reset } = useForm<User>();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}

      <div>
        <label className="mb-2 block font-medium">Name</label>

        <input
          {...register("name", {
            required: true,
          })}
          className="w-full rounded border p-3"
        />
      </div>

      {/* Email */}

      <div>
        <label className="mb-2 block font-medium">Email</label>

        <input
          type="email"
          {...register("email", {
            required: true,
          })}
          className="w-full rounded border p-3"
        />
      </div>

      {/* Password */}

      {!defaultValues && (
        <div>
          <label className="mb-2 block font-medium">Password</label>

          <input
            type="password"
            {...register("password", {
              required: true,
            })}
            className="w-full rounded border p-3"
          />
        </div>
      )}

      {/* Role */}

      <div>
        <label className="mb-2 block font-medium">Role</label>

        <select {...register("role")} className="w-full rounded border p-3">
          <option value="">Select Role</option>

          <option value="teacher">Teacher</option>

          <option value="hod">Head of Department</option>

          <option value="admission_staff">Admission Staff</option>
        </select>
      </div>

      {/* Department */}

      <div>
        <label className="mb-2 block font-medium">Department</label>

        <select
          {...register("department_id")}
          className="w-full rounded border p-3"
        >
          <option value="">Select Department</option>

          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.department_name}
            </option>
          ))}
        </select>
      </div>

      {/* Designation */}

      <div>
        <label className="mb-2 block font-medium">Designation</label>

        <input
          {...register("designation")}
          className="w-full rounded border p-3"
        />
      </div>

      {/* Phone */}

      <div>
        <label className="mb-2 block font-medium">Phone</label>

        <input {...register("phone")} className="w-full rounded border p-3" />
      </div>

      {/* Status */}

      <div>
        <label className="mb-2 block font-medium">Status</label>

        <select {...register("status")} className="w-full rounded border p-3">
          <option value="active">Active</option>

          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : defaultValues
            ? "Update Employee"
            : "Create Employee"}
      </button>
    </form>
  );
}

export default UserForm;
