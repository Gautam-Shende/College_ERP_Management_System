import { useEffect, useState } from "react";
import { getDepartments } from "../services/departmentService";
import type { Department } from "../types/department";

function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const response = await getDepartments();

      setDepartments(response.data);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    loading,
    error,
    fetchDepartments,
  };
}

export default useDepartments;
