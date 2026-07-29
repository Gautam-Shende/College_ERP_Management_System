import api from "../api/axios";
import type { Student } from "../types/student";


export const getStudents = async (
  page: number,
  limit: number,
  search: string,
  sortBy: string,
  order: string,
  course: string,
  city: string,
) => {
  const response = await api.get("/students", {
    params: {
      page,
      limit,
      search,
      sortBy,
      order,
      course,
      city,
    },
  });

  return response.data;
};


export const getStudentById = async (id: number) => {
  const response = await api.get(`/students/${id}`);

  return response.data;
};


export const createStudent = async (student: Student) => {
  const response = await api.post("/students", student);

  return response.data;
};


export const updateStudent = async (id: number, student: Student) => {
  const response = await api.put(`/students/${id}`, student);

  return response.data;
};


export const deleteStudent = async (id: number) => {
  const response = await api.delete(`/students/${id}`);

  return response.data;
};
