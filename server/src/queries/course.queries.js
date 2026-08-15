/**
 * Course SQL Queries for PostgreSQL
 */

const GET_COURSES = `
  SELECT
    c.id,
    c.course_name,
    c.department_id,
    d.department_name
  FROM courses c
  INNER JOIN departments d ON c.department_id = d.id
  ORDER BY c.course_name ASC
`;

const GET_COURSE_BY_ID = `
  SELECT
    c.id,
    c.course_name,
    c.department_id,
    d.department_name
  FROM courses c
  INNER JOIN departments d ON c.department_id = d.id
  WHERE c.id = $1
`;

const GET_COURSE_BY_NAME_AND_DEPT = `
  SELECT *
  FROM courses
  WHERE course_name = $1
    AND department_id = $2
`;

const CREATE_COURSE = `
  INSERT INTO courses (course_name, department_id)
  VALUES ($1, $2)
  RETURNING id
`;

const UPDATE_COURSE = `
  UPDATE courses
  SET
    course_name = $1,
    department_id = $2
  WHERE id = $3
`;

const HAS_STUDENTS = `
  SELECT id
  FROM students
  WHERE course_id = $1
  LIMIT 1
`;

const DELETE_COURSE = `
  DELETE FROM courses
  WHERE id = $1
`;

const CHECK_DEPARTMENT_EXISTS = `
  SELECT id
  FROM departments
  WHERE id = $1
`;

module.exports = {
  GET_COURSES,
  GET_COURSE_BY_ID,
  GET_COURSE_BY_NAME_AND_DEPT,
  CREATE_COURSE,
  UPDATE_COURSE,
  HAS_STUDENTS,
  DELETE_COURSE,
  CHECK_DEPARTMENT_EXISTS,
};
