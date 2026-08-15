/**
 * Department SQL Queries for PostgreSQL
 */

const GET_DEPARTMENTS = `
  SELECT
    id,
    department_name,
    created_at,
    updated_at
  FROM departments
  ORDER BY department_name ASC
`;

const GET_DEPARTMENT_BY_ID = `
  SELECT
    id,
    department_name,
    created_at,
    updated_at
  FROM departments
  WHERE id = $1
`;

const GET_DEPARTMENT_BY_NAME = `
  SELECT *
  FROM departments
  WHERE department_name = $1
`;

const CREATE_DEPARTMENT = `
  INSERT INTO departments (department_name)
  VALUES ($1)
  RETURNING id
`;

const UPDATE_DEPARTMENT = `
  UPDATE departments
  SET department_name = $1
  WHERE id = $2
`;

const DELETE_DEPARTMENT = `
  DELETE FROM departments
  WHERE id = $1
`;

module.exports = {
  GET_DEPARTMENTS,
  GET_DEPARTMENT_BY_ID,
  GET_DEPARTMENT_BY_NAME,
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
};
