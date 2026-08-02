import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, Building2, UserCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface MenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    path: "/students",
    icon: Users,
  },
  {
    title: "Courses",
    path: "/courses",
    icon: BookOpen,
  },
  {
    title: "Departments",
    path: "/departments",
    icon: Building2,
    roles: ["principal", "hod"],
  },
  {
    title: "Employees",
    path: "/users",
    icon: UserCheck,
    roles: ["principal"],
  },
];

// Left navigation sidebar component with role-based link filtering
function Sidebar() {
  const { user } = useAuth();

  // Filter menu items according to the user's role permissions
  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  return (
    <aside className="min-h-screen w-64 border-r border-slate-800 bg-slate-900 text-white flex flex-col justify-between">
      <div>
        <div className="border-b border-slate-800 p-6">
          <h1 className="text-xl font-bold tracking-wide text-blue-400">Student Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Management System</p>
        </div>

        <nav className="mt-6 space-y-1.5 px-4">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {user && (
        <div className="m-4 rounded-lg bg-slate-800/80 p-4 border border-slate-700/50">
          <p className="text-xs text-slate-400">Signed in as</p>
          <p className="text-sm font-semibold text-slate-200 truncate">{user.name}</p>
          <span className="mt-1 inline-block rounded bg-blue-900/50 px-2 py-0.5 text-[10px] font-semibold text-blue-300 uppercase tracking-wider">
            {user.role.replace("_", " ")}
          </span>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
