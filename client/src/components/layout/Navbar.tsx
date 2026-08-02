import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Top header bar displaying application title, logged in user info, and logout button
function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-slate-800">
          Student Management System
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden sm:flex items-center gap-3 border-r border-slate-200 pr-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800 leading-none">{user.name}</p>
              <p className="text-xs text-slate-500 capitalize mt-1">
                {user.role.replace("_", " ")} {user.designation ? `(${user.designation})` : ""}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
