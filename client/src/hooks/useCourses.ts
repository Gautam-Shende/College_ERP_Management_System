import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCourses,
  createCourse as createCourseService,
  updateCourse as updateCourseService,
  deleteCourse as deleteCourseService,
} from "../services/courseService";
import type { Course } from "../types/course";

// Custom hook providing reactive state and operations for course management
export default function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch all courses from backend API
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data || []);
      setError("");
    } catch (err: any) {
      console.error("Course load error:", err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // Add a new course
  const addCourse = async (courseName: string, departmentId: number) => {
    try {
      const response = await createCourseService({
        course_name: courseName,
        department_id: departmentId,
      });
      toast.success(response.message || "Course created successfully");
      await fetchCourses();
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create course");
      return false;
    }
  };

  // Edit an existing course
  const editCourse = async (id: number, courseName: string, departmentId: number) => {
    try {
      const response = await updateCourseService(id, {
        course_name: courseName,
        department_id: departmentId,
      });
      toast.success(response.message || "Course updated successfully");
      await fetchCourses();
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update course");
      return false;
    }
  };

  // Remove a course
  const removeCourse = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const response = await deleteCourseService(id);
      toast.success(response.message || "Course deleted successfully");
      await fetchCourses();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete course");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    addCourse,
    editCourse,
    removeCourse,
  };
}
