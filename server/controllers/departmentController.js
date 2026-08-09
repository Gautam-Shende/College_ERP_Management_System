const Department = require("../models/departmentModel");

// All status codes from this file
const HTTP_STATUS = require("../constants/httpStatus");
// All messages error from this file
const MESSAGES = require("../constants/messages");

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.getDepartments();

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.getDepartmentById(id);

    if (!department) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.DEPARTMENT.NOT_FOUND,
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: department,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { department_name } = req.body;

    if (!department_name) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.DEPARTMENT.DEPARTMENT_REQUI,
      });
    }

    const departmentName = department_name.trim();

    const existingDepartment =
      await Department.getDepartmentByName(departmentName);

    if (existingDepartment) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: MESSAGES.DEPARTMENT.ALREADY_EXISTS,
      });
    }

    const result = await Department.createDepartment(departmentName);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.DEPARTMENT.CREATED,
      departmentId: result.insertId,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name } = req.body;

    if (!department_name) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.DEPARTMENT.DEPARTMENT_REQUI,
      });
    }

    const department = await Department.getDepartmentById(id);

    if (!department) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.DEPARTMENT.NOT_FOUND,
      });
    }

    const departmentName = department_name.trim();

    const existingDepartment =
      await Department.getDepartmentByName(departmentName);


    if (existingDepartment && existingDepartment.id != id) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: MESSAGES.DEPARTMENT.ALREADY_EXISTS,
      });
    }

    await Department.updateDepartment(id, departmentName);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.DEPARTMENT.UPDATED,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.getDepartmentById(id);

    if (!department) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.DEPARTMENT.NOT_FOUND,
      });
    }

    await Department.deleteDepartment(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.DEPARTMENT.DELETED,
    });
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
