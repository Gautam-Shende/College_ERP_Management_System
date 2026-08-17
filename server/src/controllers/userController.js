const userService = require("../services/userService");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");

// Register user controller
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, department_id, designation, phone } = req.body || {};

    const registeredUser = await userService.registerUser({
      name,
      email,
      password,
      role,
      department_id,
      designation,
      phone,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: registeredUser,
    });
  } catch (err) {
    next(err);
  }
};

// Login controller
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    const authData = await userService.loginUser(email, password);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.LOGIN,
      token: authData.token,
      user: authData.user,
    });
  } catch (err) {
    next(err);
  }
};

// Get current user profile controller
const getCurrentUser = (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: req.user,
  });
};

// Get all users controller (Principal management)
const getUsers = async (req, res, next) => {
  try {
    const { page, limit, search, role, department_id, sortBy, order } = req.query;

    const result = await userService.fetchUsers(
      page,
      limit,
      search,
      role,
      department_id,
      sortBy,
      order
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.FETCHED,
      data: result.users,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

// Get user by ID controller
const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const user = await userService.fetchUserById(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.FETCHED,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Update user controller
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role, department_id, designation, phone } = req.body || {};

    await userService.updateUser(id, {
      name,
      role,
      department_id,
      designation,
      phone,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.UPDATED,
    });
  } catch (err) {
    next(err);
  }
};

// Update user status controller
const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    const updatedStatus = await userService.updateUserStatus(id, status);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message:
        updatedStatus === "active"
          ? "Employee activated successfully"
          : "Employee deactivated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Delete user controller
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await userService.deleteUser(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.DELETED,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
};

