import api from "../api/axios";

// Fetch list of courses
export const getCourses = async () => {
  const response = await api.get("/courses");
  return response.data.data;
};

// Fetch single course details by ID
export const getCourseById = async (id: number) => {
  const response = await api.get(`/courses/${id}`);
  return response.data.data;
};

// Create a new course record (Principal / HOD)
export const createCourse = async (data: { course_name: string; department_id: number }) => {
  const response = await api.post("/courses", data);
  return response.data;
};

// Update an existing course record (Principal / HOD)
export const updateCourse = async (id: number, data: { course_name: string; department_id: number }) => {
  const response = await api.put(`/courses/${id}`, data);
  return response.data;
};

// Delete a course record (Principal / HOD)
export const deleteCourse = async (id: number) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};
