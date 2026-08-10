const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const departmentRoutes = require("./routes/departmentRoutes")

const app = express();

app.use(
  cors({
    // origin:process.env.CLIENT_URL,
    origin:"https://college-erp-management-system-4d6j-three.vercel.app",
    credentials: true,
  }),
);

// app.use(cors());

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/departments", departmentRoutes )
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});