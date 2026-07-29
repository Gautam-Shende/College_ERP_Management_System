import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import UserForm from "../../components/users/UserForm";

import { getUserById, updateUser } from "../../services/userService";

import type { User } from "../../types/user";

function EditUser() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User>();

  const fetchUser = async () => {
    try {
      const response = await getUserById(Number(id));

      setUser(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load employee");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (data: User) => {
    try {
      setLoading(true);

      const response = await updateUser(Number(id), data);

      toast.success(response.message);

      navigate("/users");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-3xl font-bold">Edit Employee</h1>

      <UserForm
        defaultValues={user}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditUser;
