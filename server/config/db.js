const mysql = require("mysql2/promise");

require("dotenv").config();

const pool = mysql.createPool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0,

    // Set DB_SSL=true if your MySQL host requires it (most managed hosts
    // like PlanetScale/Aiven do). Leave unset for a plain Render private
    // MySQL service or a local/unencrypted connection.
    ...(process.env.DB_SSL === "true"
      ? { ssl: { rejectUnauthorized: true } }
      : {}),

});

module.exports = pool;