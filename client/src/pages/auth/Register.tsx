import { useState } from "react";
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../services/authService";
import { registerSchema, type RegisterFormData } from "../../validations/authSchema";

// New Employee Registration Page component.
// Mirrors the styling of Login.tsx so the two auth screens feel like one
// flow. Role choices are deliberately limited to non-admin roles — see
// registerSchema for why "principal" is excluded.
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data);

      toast.success(
        response.message || "Account created. Wait for the principal to activate it.",
      );

      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
          Student Portal
        </h1>

        <p className="mb-8 text-center text-slate-500">Create your employee account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <div className="flex items-center rounded-lg border border-slate-300 px-3 focus-within:border-blue-500">
              <UserIcon className="text-slate-400" size={18} />

              <input
                placeholder="Enter your full name"
                className="w-full border-none p-3 text-sm outline-none"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="flex items-center rounded-lg border border-slate-300 px-3 focus-within:border-blue-500">
              <Mail className="text-slate-400" size={18} />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-none p-3 text-sm outline-none"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="flex items-center rounded-lg border border-slate-300 px-3 focus-within:border-blue-500">
              <Lock className="text-slate-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border-none p-3 text-sm outline-none"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>
            )}
          </div>

          {/* Role — "principal" is intentionally not an option */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Role
            </label>

            <select
              defaultValue=""
              className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
              {...register("role")}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="teacher">Teacher</option>
              <option value="hod">Head of Department</option>
              <option value="admission_staff">Admission Staff</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-xs text-rose-500">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
