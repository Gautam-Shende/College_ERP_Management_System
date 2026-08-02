import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getDepartments,
  createDepartment as createDeptService,
  updateDepartment as updateDeptService,
  deleteDepartment as deleteDeptService,
} from "../services/departmentService";
import type { Department } from "../types/department";

// Custom hook providing state management and actions for academic departments
export default function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await getDepartments();
      setDepartments(data || []);
      setError("");
    } catch (err: any) {
      console.error("Department fetch error:", err);
      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  // Add a new department
  const addDepartment = async (departmentName: string) => {
    try {
      const response = await createDeptService({ department_name: departmentName });
      toast.success(response.message || "Department created successfully");
      await fetchDepartments();
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create department");
      return false;
    }
  };

  // Update department name
  const editDepartment = async (id: number, departmentName: string) => {
    try {
      const response = await updateDeptService(id, { department_name: departmentName });
      toast.success(response.message || "Department updated successfully");
      await fetchDepartments();
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update department");
      return false;
    }
  };

  // Delete a department
  const removeDepartment = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      const response = await deleteDeptService(id);
      toast.success(response.message || "Department deleted successfully");
      await fetchDepartments();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete department");
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
    addDepartment,
    editDepartment,
    removeDepartment,
  };
}
