import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { User } from "../../types/user";
import useDepartments from "../../hooks/useDepartments";

interface Props {
  defaultValues?: User;
  onSubmit: (data: any) => void;
  loading?: boolean;
}

function UserForm({ defaultValues, onSubmit, loading = false }: Props) {
  const { departments } = useDepartments();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<any>();

  const selectedRole = watch("role");
  const isFormDisabled = loading || isSubmitting;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // Handle principal role auto designation & reset department
  useEffect(() => {
    if (selectedRole === "principal") {
      setValue("department_id", "");
      if (!watch("designation")) {
        setValue("designation", "Principal");
      }
    }
  }, [selectedRole, setValue, watch]);

  const isDepartmentDisabled =
    isFormDisabled || selectedRole === "principal" || selectedRole === "admission_staff";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">Full Name *</label>
        <input
          disabled={isFormDisabled}
          placeholder="e.g. John Doe"
          {...register("name", { required: true })}
          className="w-full rounded border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">Email Address *</label>
        <input
          type="email"
          disabled={isFormDisabled}
          placeholder="e.g. john@gmail.com"
          {...register("email", { required: true })}
          className="w-full rounded border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Password (for new user) */}
      {!defaultValues && (
        <div>
          <label className="mb-2 block font-medium text-slate-700">Password *</label>
          <input
            type="password"
            disabled={isFormDisabled}
            placeholder="At least 6 characters"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full rounded border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>
      )}

      {/* Role Dropdown */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">Role *</label>
        <select
          disabled={isFormDisabled}
          {...register("role", { required: true })}
          className="w-full rounded border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
        >
          <option value="">Select Role</option>
          <option value="principal">Principal</option>
          <option value="hod">Head of Department (HOD)</option>
          <option value="teacher">Teacher</option>
          <option value="admission_staff">Admission Staff</option>
        </select>
      </div>

      {/* Department Dropdown */}
      {selectedRole !== "principal" && selectedRole !== "admission_staff" && (
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Department {selectedRole === "teacher" || selectedRole === "hod" ? "*" : "(Optional)"}
          </label>
          <select
            disabled={isDepartmentDisabled}
            {...register("department_id", {
              required: selectedRole === "teacher" || selectedRole === "hod",
            })}
            className="w-full rounded border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.department_name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Designation */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">Designation *</label>
        <input
          disabled={isFormDisabled}
          placeholder="e.g. Assistant Professor, Principal, HOD"
          {...register("designation", { required: true })}
          className="w-full rounded border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">Phone Number *</label>
        <input
          disabled={isFormDisabled}
          placeholder="e.g. 9876543210"
          {...register("phone", { required: true })}
          className="w-full rounded border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Status (Only when editing existing user) */}
      {defaultValues && (
        <div>
          <label className="mb-2 block font-medium text-slate-700">Account Status</label>
          <select
            disabled={isFormDisabled}
            {...register("status")}
            className="w-full rounded border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={isFormDisabled}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isFormDisabled
          ? "Creating account..."
          : defaultValues
            ? "Update Account"
            : "Register User Account"}
      </button>
    </form>
  );
}

export default UserForm;

