import React from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Building2,
  UserCheck,
  CalendarCheck,
} from "lucide-react";

export interface MenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    path: "/students",
    icon: Users,
    roles: ["principal", "hod", "teacher"],
  },
  {
    title: "Courses",
    path: "/courses",
    icon: BookOpen,
    roles: ["principal", "hod", "teacher"],
  },
  {
    title: "Departments",
    path: "/departments",
    icon: Building2,
    roles: ["principal", "hod", "teacher"],
  },
  {
    title: "User Management",
    path: "/users",
    icon: UserCheck,
    roles: ["principal"],
  },
  {
    title: "My Attendance",
    path: "/attendance",
    icon: CalendarCheck,
    roles: ["hod", "teacher", "admission_staff"],
  },
  {
    title: "Attendance Overview",
    path: "/attendance/overview",
    icon: CalendarCheck,
    roles: ["principal"],
  },
];