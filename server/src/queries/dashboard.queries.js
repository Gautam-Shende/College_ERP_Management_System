/**
 * Dashboard SQL Queries for PostgreSQL
 */

const GET_RECENT_STUDENTS = `
  SELECT
    s.id,
    s.name,
    s.email,
    c.course_name AS course,
    s.city
  FROM students s
  INNER JOIN courses c ON s.course_id = c.id
  ORDER BY s.id DESC
  LIMIT 5
`;

const GET_TOTAL_STUDENTS = `
  SELECT COUNT(*) AS "totalStudents"
  FROM students
`;

const GET_TOTAL_USERS = `
  SELECT COUNT(*) AS "totalUsers"
  FROM users
`;

const GET_TOTAL_COURSES = `
  SELECT COUNT(*) AS "totalCourses"
  FROM courses
`;

const GET_TOTAL_CITIES = `
  SELECT COUNT(DISTINCT city) AS "totalCities"
  FROM students
`;

const GET_COURSE_STATS = `
  SELECT
    c.course_name AS course,
    COUNT(s.id)::int AS total
  FROM courses c
  LEFT JOIN students s ON c.id = s.course_id
  GROUP BY c.id, c.course_name
  ORDER BY total DESC
`;

const GET_CITY_STATS = `
  SELECT
    city,
    COUNT(*)::int AS total
  FROM students
  GROUP BY city
  ORDER BY total DESC
`;

module.exports = {
  GET_RECENT_STUDENTS,
  GET_TOTAL_STUDENTS,
  GET_TOTAL_USERS,
  GET_TOTAL_COURSES,
  GET_TOTAL_CITIES,
  GET_COURSE_STATS,
  GET_CITY_STATS,
};
