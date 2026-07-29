const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    res.status(200).json({
      success: true,

      count: users.length,

      data: users,
    });
  } catch (error) {
    console.error(error);

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
    const {
      name,
      email,
      password,
      role,
      department_id,
      designation,
      phone,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All required fields are mandatory",
      });
    }

    const existingUser = await User.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role,
      department_id,
      designation,
      phone,
    });

    res.status(201).json({
      message: "Employee created successfully",

      id: result.insertId,
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
