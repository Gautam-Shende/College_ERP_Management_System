const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const { ROLES } = require("../config/constants");

const fetchUsers = async (
  page = 1,
  limit = 10,
  search = "",
  role = "",
  department_id = "",
  sortBy = "id",
  order = "DESC",
) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));
  const searchTerm = search ? search.trim() : "";

  const users = await userRepository.getUsers(
    pageNum,
    limitNum,
    searchTerm,
    role,
    department_id,
    sortBy,
    order,
  );

  const totalRecords = await userRepository.getUsersCount(
    searchTerm,
    role,
    department_id,
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

const fetchUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    const error = new Error("User not found...");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

const registerUser = async (userData) => {
  const email = userData.email.trim().toLowerCase();
  const name = userData.name.trim();
  const { password, role } = userData;

  const allowedRoles = [
    ROLES.PRINCIPAL,
    ROLES.TEACHER,
    ROLES.HOD,
    ROLES.ADMISSION_STAFF,
  ];

  if (!allowedRoles.includes(role)) {
    const error = new Error("This is invalid Role...");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) {
    const error = new Error("Email already exists...");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
    role,
    department_id: null,
    designation: role === ROLES.PRINCIPAL ? "Principal" : null,
    phone: null,
  });
};

const createUserByPrincipal = async (userData) => {
  const email = userData.email.trim().toLowerCase();
  const existingUser = await userRepository.getUserByEmail(email);

  if (existingUser) {
    const error = new Error("Email already exists...");
    error.statusCode = 409;
    throw error;
  }

  const allowedRoles = [ROLES.TEACHER, ROLES.HOD, ROLES.ADMISSION_STAFF];
  if (!allowedRoles.includes(userData.role)) {
    const error = new Error("This is invalid Role...");
    error.statusCode = 400;
    throw error;
  }

  if (
    (userData.role === ROLES.TEACHER || userData.role === ROLES.HOD) &&
    !userData.department_id
  ) {
    const error = new Error("Department is Required...");
    error.statusCode = 400;
    throw error;
  }

  if (!userData.designation) {
    const error = new Error("Designation is required");
    error.statusCode = 400;
    throw error;
  }

  if (!/^\d{10}$/.test(userData.phone)) {
    const error = new Error("Invalid phone number");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  return await userRepository.createUser({
    name: userData.name.trim(),
    email,
    password: hashedPassword,
    role: userData.role,
    department_id: userData.department_id || null,
    designation: userData.designation.trim(),
    phone: userData.phone.trim(),
  });
};

const loginUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await userRepository.getUserByEmail(normalizedEmail);

  if (!user) {
    const error = new Error("Invalid credentials..");
    error.statusCode = 401;
    throw error;
  }

  if (user.status !== "active") {
    const error = new Error("Your account is inactive...");
    error.statusCode = 403;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Invalid credentials..");
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
    {
      expiresIn: "8h",
    },
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

const editUser = async (id, userData) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    const error = new Error("User not found...");
    error.statusCode = 404;
    throw error;
  }

  await userRepository.updateUser(id, {
    name: userData.name?.trim() || user.name,
    role: userData.role || user.role,
    department_id: userData.department_id || user.department_id,
    designation: userData.designation?.trim() || user.designation,
    phone: userData.phone?.trim() || user.phone,
  });
};

const changeUserStatus = async (id, status) => {
  const allowedStatus = ["active", "inactive"];
  if (!allowedStatus.includes(status)) {
    const error = new Error("Invalid status");
    error.statusCode = 400;
    throw error;
  }

  const result = await userRepository.updateUserStatus(id, status);
  if (result.affectedRows === 0) {
    const error = new Error("User not found...");
    error.statusCode = 404;
    throw error;
  }

  return status;
};

const removeUser = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    const error = new Error("User not found...");
    error.statusCode = 404;
    throw error;
  }

  const result = await userRepository.deleteUser(id);
  if (result.affectedRows === 0) {
    const error = new Error("Failed to delete user");
    error.statusCode = 404;
    throw error;
  }
};

module.exports = {
  fetchUsers,
  fetchUserById,
  registerUser,
  createUserByPrincipal,
  loginUser,
  editUser,
  changeUserStatus,
  removeUser,
};
