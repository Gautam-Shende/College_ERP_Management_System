import api from "../api/axios";
import type { Student } from "../types/student";

/* ============================
   Get All Students
============================ */

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

/* ============================
   Get Student By ID
============================ */

export const getStudentById = async (id: number) => {
  const response = await api.get(`/students/${id}`);

  return response.data;
};

/* ============================
   Create Student
============================ */

export const createStudent = async (student: Student) => {
  const response = await api.post("/students", student);

  return response.data;
};

/* ============================
   Update Student
============================ */

export const updateStudent = async (id: number, student: Student) => {
  const response = await api.put(`/students/${id}`, student);

  return response.data;
};

/* ============================
   Delete Student
============================ */

export const deleteStudent = async (id: number) => {
  const response = await api.delete(`/students/${id}`);

  return response.data;
};
