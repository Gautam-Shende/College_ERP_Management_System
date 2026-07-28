const db = require("../config/db");

const getCourses = async () => {
  const sql = `
    SELECT * FROM courses
    ORDER BY course_name ASC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

module.exports = {
  getCourses,
};
