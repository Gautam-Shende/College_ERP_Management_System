const Department = require("../models/departmentModel");

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.getDepartments();

    return res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.getDepartmentById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { department_name } = req.body;

    if (!department_name) {
      return res.status(400).json({
        success: false,
        message: "Department name is required",
      });
    }

    const departmentName = department_name.trim();

    const existingDepartment =
      await Department.getDepartmentByName(departmentName);

    if (existingDepartment) {
      return res.status(409).json({
        success: false,
        message: "Department already exists",
      });
    }

    const result = await Department.createDepartment(departmentName);

    return res.status(201).json({
      success: true,
      message: "Department created successfully",
      departmentId: result.insertId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name } = req.body;

    if (!department_name) {
      return res.status(400).json({
        success: false,
        message: "Department name is required",
      });
    }

    const department = await Department.getDepartmentById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    const departmentName = department_name.trim();

    const existingDepartment =
      await Department.getDepartmentByName(departmentName);

    if (existingDepartment && existingDepartment.id != id) {
      return res.status(409).json({
        success: false,
        message: "Department already exists",
      });
    }

    await Department.updateDepartment(id, departmentName);

    return res.status(200).json({
      success: true,
      message: "Department updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.getDepartmentById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    await Department.deleteDepartment(id);

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
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
