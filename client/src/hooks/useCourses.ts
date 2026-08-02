import { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";

function useCourses() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("Fetching Courses...");

        const data = await getCourses();

        console.log("Courses Response:", data);

        setCourses(data);
      } catch (err) {
        console.error("Course Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return {
    courses,
    loading,
  };
}

export default useCourses;
