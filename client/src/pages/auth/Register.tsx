import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserForm from "../../components/users/UserForm";
import { createUser } from "../../services/userService";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await createUser(data);
      toast.success(response.message || "User registered successfully!");
      navigate("/users");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm border border-slate-200">
      <h1 className="mb-1 text-2xl font-bold text-slate-800">Register User Account</h1>
      <p className="mb-6 text-sm text-slate-500">
        Create and assign new employee accounts (HOD, Teacher, Admission Staff, Principal)
      </p>

      <UserForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

export default Register;
