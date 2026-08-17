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

const clientUrl = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.trim().replace(/\/$/, "")
  : undefined;

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

app.use("/api", (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  next();
});


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
