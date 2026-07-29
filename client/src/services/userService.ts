import api from "../api/axios";

// Get All Users
export const getUsers = async (
  page: number,
  limit: number,
  search: string,
  role: string,
  department_id: string,
  sortBy: string,
  order: string,
) => {
  const response = await api.get("/users", {
    params: {
      page,

      limit,

      search,

      role,

      department_id,

      sortBy,

      order,
    },
  });

  return response.data;
};

// Delete User

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);

  return response.data;
};

// Get User By Id

export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};

// Create User

export const createUser = async (data: any) => {
  const response = await api.post("/users", data);

  return response.data;
};

// Update User

export const updateUser = async (id: number, data: any) => {
  const response = await api.put(`/users/${id}`, data);

  return response.data;
};
