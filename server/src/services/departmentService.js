const departmentModel = require("../models/departmentModel");

const fetchDepartments = async () => {
  return await departmentModel.getDepartments();
};

const fetchDepartmentById = async (id) => {
  const department = await departmentModel.getDepartmentById(id);
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }
  return department;
};

const addDepartment = async (departmentName) => {
  const name = departmentName.trim();

  const existingDepartment = await departmentModel.getDepartmentByName(name);
  if (existingDepartment) {
    const error = new Error("Department already exists");
    error.statusCode = 409;
    throw error;
  }

  return await departmentModel.createDepartment(name);
};

const editDepartment = async (id, departmentName) => {
  const department = await departmentModel.getDepartmentById(id);
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  const name = departmentName.trim();
  const existingDepartment = await departmentModel.getDepartmentByName(name);

  if (existingDepartment && existingDepartment.id !== Number(id)) {
    const error = new Error("Department already exists");
    error.statusCode = 409;
    throw error;
  }

  return await departmentModel.updateDepartment(id, name);
};

const removeDepartment = async (id) => {
  const department = await departmentModel.getDepartmentById(id);
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  return await departmentModel.deleteDepartment(id);
};

module.exports = {
  fetchDepartments,
  fetchDepartmentById,
  addDepartment,
  editDepartment,
  removeDepartment,
};
