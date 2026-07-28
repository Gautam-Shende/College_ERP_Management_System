import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToken } from "../../utils/auth";
import { loginUser } from "../../services/authService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../../validations/authSchema";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);

      setToken(response.token);

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Student Management
        </h1>

        <p className="mb-8 text-center text-gray-500">Login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">Email</label>

            <div className="flex items-center rounded-lg border px-3">
              <Mail className="text-gray-500" size={18} />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-none p-3 outline-none"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium">Password</label>

            <div className="flex items-center rounded-lg border px-3">
              <Lock className="text-gray-500" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border-none p-3 outline-none"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>{" "}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
