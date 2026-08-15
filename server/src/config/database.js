const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl:
        process.env.NODE_ENV === "production" ||
        connectionString.includes("sslmode=require") ||
        connectionString.includes("neon.tech")
          ? { rejectUnauthorized: false }
          : false,
    })
  : new Pool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "college_erp",
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    });

module.exports = pool;
