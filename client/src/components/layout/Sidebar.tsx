import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, Building2, UserCheck, X } from "lucide-react";
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

interface Props {
  // Drawer state for small screens (< lg breakpoint).
  mobileOpen: boolean;
  onClose: () => void;
}

// Left navigation sidebar.
// Responsive behavior:
// - Below "lg", it's a fixed off-canvas drawer that slides in from the left over a backdrop, controlled by mobileOpen.
// - At "lg" and above, it's always visible and fixed width (w-64) in the document layout.
function Sidebar({ mobileOpen, onClose }: Props) {
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  return (
    <>
      {/* Backdrop — only rendered/relevant on mobile, tapping it closes the drawer */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between
          border-r border-slate-800 bg-slate-900 text-white
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-16 lg:z-10 lg:h-[calc(100vh-4rem)] lg:translate-x-0
        `}
      >
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 p-6">
            <div>
              <h1 className="text-xl font-bold tracking-wide text-blue-400">
                Student Portal
              </h1>
              <p className="mt-1 text-xs text-slate-400">Management System</p>
            </div>

            {/* Close button — mobile drawer only */}
            <button
              onClick={onClose}
              className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-6 space-y-1.5 px-4">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} className="shrink-0" />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {user && (
          <div className="m-4 rounded-lg border border-slate-700/50 bg-slate-800/80 p-4">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="truncate text-sm font-semibold text-slate-200">
              {user.name}
            </p>
            <span className="mt-1 inline-block rounded bg-blue-900/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-300">
              {user.role.replace("_", " ")}
            </span>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
