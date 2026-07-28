import { useEffect, useState } from "react";

import { getCourses } from "../services/courseService";

import type { Course } from "../types/course";

function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();

      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    courses,
  };
}

export default useCourses;
