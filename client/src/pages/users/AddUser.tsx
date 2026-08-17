import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import UserForm from "../../components/users/UserForm";
import { createUser } from "../../services/userService";
import type { User } from "../../types/user";

function AddUser() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "";

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: User) => {
    try {
      setLoading(true);

      const response = await createUser(data);

      toast.success(response.message);

      navigate("/users");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-3xl font-bold">Add Employee</h1>

      <UserForm
        onSubmit={handleSubmit}
        loading={loading}
        defaultValues={initialRole ? ({ role: initialRole } as User) : undefined}
      />
    </div>
  );
}

export default AddUser;
