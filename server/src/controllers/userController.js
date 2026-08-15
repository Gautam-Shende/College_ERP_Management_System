const userService = require("../services/userService");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");

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
      order,
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

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, department_id, designation, phone } =
      req.body;

    const result = await userService.createUserByPrincipal({
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
      message: MESSAGES.USER.CREATED,
      data: {
        id: result.insertId,
      },
    });
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const result = await userService.registerUser({
      name,
      email,
      password,
      role,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.USER.REGISTERED,
      data: {
        id: result.insertId,
      },
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

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

const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    const updatedStatus = await userService.changeUserStatus(id, status);

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

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role, department_id, designation, phone } = req.body;

    await userService.editUser(id, {
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

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await userService.removeUser(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.DELETED,
    });
  } catch (err) {
    next(err);
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
