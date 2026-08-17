require("dotenv").config();

const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());

const allowedOrigins = [
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman, curl, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

// all routes 
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);

app.use(errorHandler);

module.exports = app;
