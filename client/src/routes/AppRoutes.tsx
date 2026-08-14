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
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Authenticated Application Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* General Dashboard & Directory Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/courses" element={<CourseList />} />

          {/* Department Management Route (Principal & HOD) */}
          <Route element={<RoleProtectedRoute allowedRoles={["principal", "hod"]} />}>
            <Route path="/departments" element={<DepartmentList />} />
          </Route>

          {/* Student Add Route (Principal Only) */}
          <Route element={<RoleProtectedRoute allowedRoles={["principal"]} />}>
            <Route path="/students/add" element={<AddStudent />} />
          </Route>

          {/* Student Edit Route (Principal, HOD & Admission Staff) */}
          <Route element={<RoleProtectedRoute allowedRoles={["principal", "hod", "admission_staff"]} />}>
            <Route path="/students/edit/:id" element={<EditStudent />} />
          </Route>

          {/* Employee / User Management Routes (Principal Only) */}
          <Route element={<RoleProtectedRoute allowedRoles={["principal"]} />}>
            <Route path="/users" element={<UserList />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
          </Route>
        </Route>
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
