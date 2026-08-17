const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Allowed system roles
const ALLOWED_ROLES = ["principal", "hod", "teacher", "admission_staff"];

// Register new user (supports all allowed roles with role-based rules)
const registerUser = async (userData) => {
  const { name, email, password, role, department_id, designation, phone } = userData;

  // Validate required fields
  if (!name || !name.trim()) {
    const error = new Error("Name is required");
    error.statusCode = 400;
    throw error;
  }

  if (!email || !email.trim()) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    const error = new Error("Invalid email format");
    error.statusCode = 400;
    throw error;
  }

  if (!password || password.length < 6) {
    const error = new Error("Password must be at least 6 characters");
    error.statusCode = 400;
    throw error;
  }

  // Validate role
  if (!role || !ALLOWED_ROLES.includes(role)) {
    const error = new Error("Invalid role. Allowed roles: principal, hod, teacher, admission_staff");
    error.statusCode = 400;
    throw error;
  }

  if (!phone || !phone.trim()) {
    const error = new Error("Phone number is required");
    error.statusCode = 400;
    throw error;
  }

  if (!designation || !designation.trim()) {
    const error = new Error("Designation is required");
    error.statusCode = 400;
    throw error;
  }

  // Role-specific department validation rules
  let finalDepartmentId = department_id ? Number(department_id) : null;

  if (role === "principal") {
    if (department_id) {
      const error = new Error("Principal cannot be assigned to a specific department");
      error.statusCode = 400;
      throw error;
    }
    finalDepartmentId = null;
  } else if (role === "hod" || role === "teacher") {
    if (!department_id) {
      const error = new Error(`Department is required for role '${role}'`);
      error.statusCode = 400;
      throw error;
    }
  } else if (role === "admission_staff") {
    // Department is optional for admission staff
  }

  // Check duplicate email
  const existingUser = await userModel.getUserByEmail(normalizedEmail);
  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save to database
  const newUser = await userModel.createUser({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role,
    department_id: finalDepartmentId,
    designation: designation.trim(),
    phone: phone.trim(),
  });

  // Return safe user info (without password)
  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
};

// User login
const loginUser = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await userModel.getUserByEmail(normalizedEmail);

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  if (user.status !== "active") {
    const error = new Error("Your account is inactive");
    error.statusCode = 403;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      department_id: user.department_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department_id: user.department_id,
      designation: user.designation,
    },
  };
};

// Fetch list of users with pagination & filters
const fetchUsers = async (
  page = 1,
  limit = 10,
  search = "",
  role = "",
  department_id = "",
  sortBy = "id",
  order = "DESC"
) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));
  const searchTerm = search ? search.trim() : "";

  const users = await userModel.getUsers(
    pageNum,
    limitNum,
    searchTerm,
    role,
    department_id,
    sortBy,
    order
  );

  const totalRecords = await userModel.getUsersCount(
    searchTerm,
    role,
    department_id
  );

  return {
    users,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(totalRecords / limitNum),
      totalRecords,
      limit: limitNum,
    },
  };
};

// Fetch user by ID
const fetchUserById = async (id) => {
  const user = await userModel.getUserById(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

// Update user details
const updateUser = async (id, userData) => {
  const user = await userModel.getUserById(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const targetRole = userData.role || user.role;
  const targetDept = userData.department_id !== undefined ? userData.department_id : user.department_id;

  if (targetRole === "principal" && targetDept) {
    const error = new Error("Principal cannot belong to a department");
    error.statusCode = 400;
    throw error;
  }

  if ((targetRole === "teacher" || targetRole === "hod") && !targetDept) {
    const error = new Error("Department is required for Teacher and HOD");
    error.statusCode = 400;
    throw error;
  }

  await userModel.updateUser(id, {
    name: userData.name?.trim() || user.name,
    role: targetRole,
    department_id: targetDept ? Number(targetDept) : null,
    designation: userData.designation?.trim() || user.designation,
    phone: userData.phone?.trim() || user.phone,
  });
};

// Update user status (active/inactive)
const updateUserStatus = async (id, status) => {
  const allowedStatus = ["active", "inactive"];
  if (!allowedStatus.includes(status)) {
    const error = new Error("Invalid status");
    error.statusCode = 400;
    throw error;
  }

  const user = await userModel.getUserById(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await userModel.updateUserStatus(id, status);
  return status;
};

// Delete user
const deleteUser = async (id) => {
  const user = await userModel.getUserById(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await userModel.deleteUser(id);
};

module.exports = {
  registerUser,
  loginUser,
  fetchUsers,
  fetchUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
};

