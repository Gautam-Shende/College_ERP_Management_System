import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import StudentList from "../pages/students/StudentList";
import AddStudent from "../pages/students/AddStudent";
import EditStudent from "../pages/students/EditStudent";
import UserList from "../pages/users/UserList";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";
import CourseList from "../pages/courses/CourseList";
import DepartmentList from "../pages/departments/DepartmentList";
import Attendance from "../pages/attendance/Attendance";
import PrincipalAttendanceOverview from "../pages/attendance/PrincipalAttendanceOverview";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

// Main router configuring public, protected, and role-based application routes
function AppRoutes() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Authenticated Application Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* General Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Academic Directories & Records (Principal, HOD, Teacher) */}
          <Route
            element={
              <RoleProtectedRoute allowedRoles={["principal", "hod", "teacher"]} />
            }
          >
            <Route path="/students" element={<StudentList />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/departments" element={<DepartmentList />} />
          </Route>

          {/* Student Add Route (Principal Only) */}
          <Route element={<RoleProtectedRoute allowedRoles={["principal"]} />}>
            <Route path="/students/add" element={<AddStudent />} />
          </Route>

          {/* Student Edit Route (Principal & HOD) */}
          <Route
            element={<RoleProtectedRoute allowedRoles={["principal", "hod"]} />}
          >
            <Route path="/students/edit/:id" element={<EditStudent />} />
          </Route>

          {/* User Management & Registration Routes (Principal Only) */}
          <Route element={<RoleProtectedRoute allowedRoles={["principal"]} />}>
            <Route path="/users" element={<UserList />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Attendance Routes */}
          <Route
            element={
              <RoleProtectedRoute
                allowedRoles={["principal", "hod", "teacher", "admission_staff"]}
              />
            }
          >
            <Route path="/attendance" element={<Attendance />} />
          </Route>

          {/* Principal Attendance Overview Route */}
          <Route element={<RoleProtectedRoute allowedRoles={["principal"]} />}>
            <Route
              path="/attendance/overview"
              element={<PrincipalAttendanceOverview />}
            />
          </Route>
        </Route>
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
