const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";
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

    res.status(200).json({
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
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Failed to fetch users",
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.getUserById(id);

    // if user id not valid then show this
    if (!user) {
      const error = new Error("User Not Found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, department_id, designation, phone } =
      req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All required fields are mandatory",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.getUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(400).json({
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

    if (!phone || phone.length !== 10) {
      return res.status(400).json({
        message: "Invalid phone number",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      designation: designation.trim(),
      role,
      department_id,
      phone: phone.trim(),
    };

    const result = await User.createUser({
      ...userData,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employeeId: result.insertId,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    const result = await User.createUser({
      name,
      email,
      password: hashedPassword,

      role,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      userId: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findUserByEmail(email);

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  getUsers,
  createUser,
  getUserById,
  loginUser,
};
