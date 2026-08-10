const express = require("express");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const departmentRoutes = require("./routes/departmentRoutes")

dotenv.config()

const app = express();

app.use(
  cors({
    origin:process.env.CLIENT_URL,
    credentials: true,
  }),
);

// app.use(cors());

app.use(express.json());

app.use("/", studentRoutes);
app.use("/", userRoutes);
app.use("/", courseRoutes);
app.use("/", departmentRoutes )
app.use("/", dashboardRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});