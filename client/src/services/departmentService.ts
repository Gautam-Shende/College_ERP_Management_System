import api from "../api/axios";

export const getDepartments = async () => {
  const response = await api.get("/departments");

  return response.data;
};
