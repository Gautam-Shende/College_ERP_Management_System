import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getStudents,
  deleteStudent as deleteStudentService,
} from "../services/studentService";

import type { Student } from "../types/student";

function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [course, setCourse] = useState("");
  const [city, setCity] = useState("");

  // Sorting
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("DESC");

  // Delete Loading
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchStudents = async () => {
    try {
      setFetching(true);

      const response = await getStudents(
        page,
        limit,
        search,
        sortBy,
        order,
        course,
        city,
      );

      setStudents(response.data);
      setTotalPages(response.pagination.totalPages);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load students");
    } finally {
      setTimeout(() => {
        setFetching(false);
      }, 2000);
    }
  };

  const deleteStudent = async (id: number) => {
    const confirmed = window.confirm("Delete Student?");

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await deleteStudentService(id);

      toast.success(response.message);

      await fetchStudents();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete Failed");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchStudents();
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchStudents();
    }
  }, [page, search, course, city, sortBy, order]);

  return {
    students,
    loading,
    error,
    fetching,
    page,
    setPage,

    totalPages,

    search,
    setSearch,

    course,
    setCourse,

    city,
    setCity,

    sortBy,
    setSortBy,

    order,
    setOrder,

    deleteStudent,
    deletingId,

    fetchStudents,
  };
}

export default useStudents;
