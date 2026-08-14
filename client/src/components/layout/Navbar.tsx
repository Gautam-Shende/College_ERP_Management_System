import { LogOut, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
  onMenuClick: () => void;
}

// Navbar with Menu Toggle Behaviour, mobile and desktop screen
function Navbar({ onMenuClick }: Props) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

// handle logout for logou9t user one click
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-3 shadow-sm sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          <Menu size={20} />
        </button>

        <h2 className="truncate text-base font-bold text-slate-800 sm:text-lg">
          Student Management System
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {user && (
          <div className="hidden items-center gap-3 border-r border-slate-200 pr-4 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {user.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold leading-none text-slate-800">
                {user.name}
              </p>
              <p className="mt-1 text-xs capitalize text-slate-500">
                {user.role.replace("_", " ")}{" "}
                {user.designation ? `(${user.designation})` : ""}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-50 px-2.5 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 sm:px-3.5"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
