const departmentRepository = require("../repositories/departmentRepository");

const fetchDepartments = async () => {
  return await departmentRepository.getDepartments();
};

const fetchDepartmentById = async (id) => {
  const department = await departmentRepository.getDepartmentById(id);
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }
  return department;
};

const addDepartment = async (departmentName) => {
  const name = departmentName.trim();

  const existingDepartment = await departmentRepository.getDepartmentByName(name);
  if (existingDepartment) {
    const error = new Error("Department already exists");
    error.statusCode = 409;
    throw error;
  }

  return await departmentRepository.createDepartment(name);
};

const editDepartment = async (id, departmentName) => {
  const department = await departmentRepository.getDepartmentById(id);
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  const name = departmentName.trim();
  const existingDepartment = await departmentRepository.getDepartmentByName(name);

  if (existingDepartment && existingDepartment.id !== Number(id)) {
    const error = new Error("Department already exists");
    error.statusCode = 409;
    throw error;
  }

  return await departmentRepository.updateDepartment(id, name);
};

const removeDepartment = async (id) => {
  const department = await departmentRepository.getDepartmentById(id);
  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  return await departmentRepository.deleteDepartment(id);
};

module.exports = {
  fetchDepartments,
  fetchDepartmentById,
  addDepartment,
  editDepartment,
  removeDepartment,
};
