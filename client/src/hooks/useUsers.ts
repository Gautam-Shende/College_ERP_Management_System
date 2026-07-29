import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getUsers,
  deleteUser as deleteUserService,
} from "../services/userService";

function useUsers() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [page, setPage] = useState(1);

  const limit = 10;

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [department, setDepartment] = useState("");

  const [sortBy, setSortBy] = useState("id");

  const [order, setOrder] = useState("DESC");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers(
        page,
        limit,
        search,
        role,
        department,
        sortBy,
        order,
      );

      setUsers(response.data);

      setTotalPages(response.pagination.totalPages);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Failed to load users");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const deleteUser = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteUserService(id);

      toast.success("Employee deleted successfully");

      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete employee");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, role, department, sortBy, order]);

  return {
    users,

    loading,

    error,

    page,
    setPage,

    totalPages,

    search,
    setSearch,

    role,
    setRole,

    department,
    setDepartment,

    sortBy,
    setSortBy,

    order,
    setOrder,

    deletingId,

    deleteUser,

    fetchUsers,
  };
}

export default useUsers;
