const studentRepository = require("../repositories/studentRepository");

const fetchStudents = async (
  page = 1,
  limit = 10,
  search = "",
  sortBy = "id",
  order = "DESC",
  course = "",
  city = "",
) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));
  const searchTerm = search ? search.trim() : "";
  const courseFilter = course ? course.trim() : "";
  const cityFilter = city ? city.trim() : "";

  const students = await studentRepository.getStudents(
    pageNum,
    limitNum,
    searchTerm,
    sortBy,
    order,
    courseFilter,
    cityFilter,
  );

  const total = await studentRepository.getStudentsCount(
    searchTerm,
    courseFilter,
    cityFilter,
  );

  return {
    students,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalStudents: total,
      limit: limitNum,
    },
  };
};

const fetchStudentById = async (id) => {
  const student = await studentRepository.getStudentById(id);
  if (!student) {
    const error = new Error("Student not found..");
    error.statusCode = 404;
    throw error;
  }
  return student;
};

const addStudent = async (studentData) => {
  const normalizedEmail = studentData.email.trim().toLowerCase();
  const existingStudent = await studentRepository.getStudentByEmail(normalizedEmail);

  if (existingStudent) {
    const error = new Error("Email already exists..");
    error.statusCode = 409;
    throw error;
  }

  const result = await studentRepository.createStudent({
    name: studentData.name.trim(),
    email: normalizedEmail,
    course_id: studentData.course_id,
    city: studentData.city.trim(),
  });

  return result;
};

const editStudent = async (id, studentData) => {
  const result = await studentRepository.updateStudent(id, {
    name: studentData.name.trim(),
    email: studentData.email.trim().toLowerCase(),
    course_id: studentData.course_id,
    city: studentData.city.trim(),
  });

  if (result.affectedRows === 0) {
    const error = new Error("Student not found..");
    error.statusCode = 404;
    throw error;
  }

  return result;
};

const removeStudent = async (id) => {
  const student = await studentRepository.getStudentById(id);
  if (!student) {
    const error = new Error("Student not found..");
    error.statusCode = 404;
    throw error;
  }

  const result = await studentRepository.deleteStudent(id);
  return result;
};

module.exports = {
  fetchStudents,
  fetchStudentById,
  addStudent,
  editStudent,
  removeStudent,
};
