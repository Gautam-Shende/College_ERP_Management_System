const studentService = require("../services/studentService");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");

const getStudents = async (req, res, next) => {
  try {
    const { page, limit, search, sortBy, order, course, city } = req.query;

    const result = await studentService.fetchStudents(
      page,
      limit,
      search,
      sortBy,
      order,
      course,
      city,
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.STUDENT.FETCHED,
      data: result.students,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await studentService.fetchStudentById(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: student,
    });
  } catch (err) {
    next(err);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const { name, email, course_id, city } = req.body;

    const result = await studentService.addStudent({
      name,
      email,
      course_id,
      city,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.STUDENT.CREATED,
      studentId: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, course_id, city } = req.body;

    await studentService.editStudent(id, { name, email, course_id, city });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.STUDENT.UPDATED,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    await studentService.removeStudent(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.STUDENT.DELETED,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
