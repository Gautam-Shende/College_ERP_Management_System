import { useEffect, useState } from "react";

import { getCourses } from "../services/courseService";

function useCourses() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();

        setCourses(data);
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
