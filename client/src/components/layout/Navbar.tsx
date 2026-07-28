import { LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-xl font-semibold">Student Management System</h2>
      <div className="flex items-center gap-4">
        <UserCircle size={28} />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          {" "}
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
