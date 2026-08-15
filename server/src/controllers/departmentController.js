const departmentService = require("../services/departmentService");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");

const getDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.fetchDepartments();

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: departments,
    });
  } catch (err) {
    next(err);
  }
};

const getDepartmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const department = await departmentService.fetchDepartmentById(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: department,
    });
  } catch (err) {
    next(err);
  }
};

const createDepartment = async (req, res, next) => {
  try {
    const { department_name } = req.body;

    const result = await departmentService.addDepartment(department_name);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.DEPARTMENT.CREATED,
      departmentId: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { department_name } = req.body;

    await departmentService.editDepartment(id, department_name);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.DEPARTMENT.UPDATED,
    });
  } catch (err) {
    next(err);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    await departmentService.removeDepartment(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.DEPARTMENT.DELETED,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
