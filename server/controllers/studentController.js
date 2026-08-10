const Student = require("../models/studentModel");

// All status codes from this file
const HTTP_STATUS = require("../constants/httpStatus");
// All messages error from this file
const MESSAGES = require("../constants/messages");

const getStudents = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";

    const sortBy = req.query.sortBy || "id";
    const order = req.query.order || "DESC";

    const course = req.query.course || "";
    const city = req.query.city || "";

    const students = await Student.getStudents(
      page,
      limit,
      search,
      sortBy,
      order,
      course,
      city,
    );

    const total = await Student.getStudentsCount(search, course, city);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.STUDENT.FETCHED,
      data: students,

      // pagination for better page loading on UI
      pagination: {
        currentPage: page,
        // use Math.ciel for Calculate total pages and round up for remaining students
        totalPages: Math.ceil(total / limit),
        totalStudents: total,
        limit,
      },
    });

  } catch (err) {
    next(err);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const student = await Student.getStudentById(id);

    if (!student) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.STUDENT.NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json({
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

    const normalizedEmail = email.trim().toLowerCase();

    const existingStudent = await Student.getStudentByEmail(normalizedEmail);

    if (existingStudent) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: MESSAGES.STUDENT.EMAIL_EXISTS,
      });
    }

    const result = await Student.createStudent({
      name: name.trim(),
      email: normalizedEmail,
      course_id,
      city: city.trim(),
    });

    res.status(HTTP_STATUS.CREATED).json({
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
    const id = req.params.id;

    const { name, email, course_id, city } = req.body;

    const result = await Student.updateStudent(id, {
      name,
      email,
      course_id,
      city,
    });

    // Student.updateStudent() returns the raw mysql2 result object, which
    // is always truthy -- even when the id didn't match any row -- so the
    // old "if (!student)" check here could never actually fire. affectedRows
    // is what tells us whether the id was real.
    if (result.affectedRows === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.STUDENT.NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.STUDENT.UPDATED,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if student exists
    const student = await Student.getStudentById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    //  deletion from database
    await Student.deleteStudent(id);

    res.status(HTTP_STATUS.OK).json({
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
