const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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

    return res.status(200).json({
      success: true,

      data: users,

      pagination: {
        currentPage: page,

        totalPages: Math.ceil(totalRecords / limit),

        totalRecords,

        limit,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid user id",
      });
    }

    const user = await User.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,

      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

const createUser = async (req, res) => {
  try {
    let { name, email, password, role, department_id, designation, phone } =
      req.body;

    const existingUser = await User.getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const allowedRoles = ["teacher", "hod", "admission_staff"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    if ((role === "teacher" || role === "hod") && !department_id) {
      return res.status(400).json({
        success: false,
        message: "Department is required",
      });
    }

    if (!designation) {
      return res.status(400).json({
        success: false,
        message: "Designation is required",
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
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

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    name = name.trim();
    email = email.trim().toLowerCase();

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role,
      department_id: null,
      designation: null,
      phone: null,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    email = email.trim().toLowerCase();

    const user = await User.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive. Contact Principal.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
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

    return res.status(200).json({
      success: true,
      message: "Login successful",
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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const allowedStatus = ["active", "inactive"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const result = await User.updateUserStatus(id, status);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        status === "active"
          ? "Employee activated successfully"
          : "Employee deactivated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getCurrentUser = (req, res) => {
  res.status(200).json({
    success: true,

    data: req.user,
  });
};

module.exports = {
  registerUser,
  getUsers,
  createUser,
  getUserById,
  loginUser,
  updateUserStatus,
  getCurrentUser
};
