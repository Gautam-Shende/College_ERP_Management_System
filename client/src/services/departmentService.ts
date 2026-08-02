import api from "../api/axios";

// Fetch list of all departments
export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data.data;
};

// Fetch single department details by ID
export const getDepartmentById = async (id: number) => {
  const response = await api.get(`/departments/${id}`);
  return response.data.data;
};

// Create a new department record (Principal only)
export const createDepartment = async (data: { department_name: string }) => {
  const response = await api.post("/departments", data);
  return response.data;
};

// Update an existing department record (Principal only)
export const updateDepartment = async (id: number, data: { department_name: string }) => {
  const response = await api.put(`/departments/${id}`, data);
  return response.data;
};

// Delete a department record (Principal only)
export const deleteDepartment = async (id: number) => {
  const response = await api.delete(`/departments/${id}`);
  return response.data;
};
