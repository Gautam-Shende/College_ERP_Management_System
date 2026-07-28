const db = require("../config/db");

const getUsers = async () => {
    const sql = `
     SELECT * FROM users;
    `;

    const [rows] = await db.query(sql)
    return rows;
};

const findUserByEmail = async (email) => {

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    const [rows] = await db.query(sql, [email]);
    return rows[0];

};

const getUserById = async (id) => {
    const sql = `
    SELECT * FROM users
    WHERE id = ? `

    const [ row ] = await db.query(sql, [id])
    return row[0];
}

const createUser = async (userData) => {
  const sql = `
        INSERT INTO users(name,email,password,role)
        VALUES(?,?,?,?)
    `;

  const [result] = await db.query(sql, [
    userData.name,
    userData.email,
    userData.password,
    userData.role,
  ]);

  return result;
};


module.exports = {
  createUser,
  getUsers,
  getUserById,
  findUserByEmail
};
