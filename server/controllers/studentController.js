const Student = require("../models/studentModel");

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

    res.status(200).json({
      success: true,

      data: students,

      pagination: {
        currentPage: page,
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
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
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

    if (!name || !email || !course_id || !city) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();

    const existingStudent = await Student.getStudentByEmail(normalizedEmail);

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const result = await Student.createStudent({
      name: name.trim(),
      email: normalizedEmail,
      course_id,
      city: city.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
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

    const student = await Student.updateStudent(id, {
      name,
      email,
      course_id,
      city,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const student = await Student.getStudentById(id);

    if (!student === 0) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  getStudentByEmail,
  createStudent,
  updateStudent,
  deleteStudent,
};
