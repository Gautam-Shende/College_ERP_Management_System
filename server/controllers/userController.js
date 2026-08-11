const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// All status codes from this file
const HTTP_STATUS = require("../constants/httpStatus");
// All messages error from this file
const MESSAGES = require("../constants/messages");
// ALL Roles from this file
const ROLES = require("../constants/roles");

const getUsers = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);

    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

    const search = req.query.search?.trim() || "";

    const role = req.query.role || "";

    const department_id = req.query.department_id || "";

    const sortBy = req.query.sortBy || "id";

    const order = req.query.order || "DESC";

    const users = await User.getUsers(
      page,
      limit,
      search,
      role,
      department_id,
      sortBy,
      order,
    );

    const totalRecords = await User.getUsersCount(search, role, department_id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.FETCHED,
      data: users,

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords,
        limit,
      },
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.USER.FAILED,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const user = await User.getUserById(id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.FETCHED,
      data: user,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const createUser = async (req, res) => {
  try {
    let { name, email, password, role, department_id, designation, phone } =
      req.body;

    const existingUser = await User.getUserByEmail(email);

    if (existingUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: MESSAGES.USER.EMAIL_EXISTS,
      });
    }

    const allowedRoles = [ROLES.TEACHER, ROLES.HOD, ROLES.ADMISSION_STAFF];

    if (!allowedRoles.includes(role)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.USER.INVALID_ROLE,
      });
    }

    if ((role === ROLES.TEACHER || role === ROLES.HOD) && !department_id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.DEPARTMENT.DEPARTMENT_REQUI,
      });
    }

    if (!designation) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Designation is required",
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role,
      department_id: department_id || null,
      designation,
      phone,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.USER.CREATED,
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Name, email, password and role are required",
      });
    }

    name = name.trim();
    email = email.trim().toLowerCase();

    if (password.length < 6) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const allowedRoles = [
      ROLES.PRINCIPAL,
      ROLES.TEACHER,
      ROLES.HOD,
      ROLES.ADMISSION_STAFF,
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.USER.INVALID_ROLE,
      });
    }

    const existingUser = await User.getUserByEmail(email);

    if (existingUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: MESSAGES.USER.EMAIL_EXISTS,
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role,
      department_id: null,
      designation: role === ROLES.PRINCIPAL ? "Principal" : null,
      phone: null,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.USER.REGISTERED,
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error("Register User Error:", error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.COMMON.EMAIL_PASS_REQUIRED,
      });
    }

    email = email.trim().toLowerCase();

    const user = await User.getUserByEmail(email);

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.USER.INVALID_CREDENTIALS,
      });
    }

    if (user.status !== "active") {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: MESSAGES.USER.INACTIVE,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.USER.INVALID_CREDENTIALS,
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        department_id: user.department_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.LOGIN,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
        designation: user.designation,
      },
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body || {};

    if (!status) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Status is required",
      });
    }

    const allowedStatus = ["active", "inactive"];

    if (!allowedStatus.includes(status)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid status",
      });
    }

    const result = await User.updateUserStatus(id, status);

    if (result.affectedRows === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message:
        status === "active"
          ? "Employee activated successfully"
          : "Employee deactivated successfully",
    });
  } catch (error) {
    // console.log(error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

// Update Employee details by Principal
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, department_id, designation, phone } = req.body;

    const user = await User.getUserById(id);
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
      });
    }

    await User.updateUser(id, {
      name: name?.trim() || user.name,
      role: role || user.role,
      department_id: department_id || user.department_id,
      designation: designation?.trim() || user.designation,
      phone: phone?.trim() || user.phone,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.UPDATED,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update employee",
    });
  }
};

// Delete Employee by Principal
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.getUserById(id);
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.USER.NOT_FOUND,
      });
    }

    const result = await User.deleteUser(id);
    if (result.affectedRows === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Failed to delete user",
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.DELETED,
    });
  } catch (error) {
    // console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete employee",
    });
  }
};

const getCurrentUser = (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: req.user,
  });
};

module.exports = {
  registerUser,
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  updateUserStatus,
  getCurrentUser,
};
