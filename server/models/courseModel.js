const db = require("../config/db");

const getAllCourses = async () => {
  const sql = `
    SELECT
      c.id,
      c.course_name,
      d.department_name
    FROM courses c
    INNER JOIN departments d
      ON c.department_id = d.id
    ORDER BY c.course_name ASC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

module.exports = {
  getAllCourses,
};
