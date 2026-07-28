import { NavLink } from "react-router-dom";
import { menuItems } from "../../utils/menu";

function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">Student MS</h1>
      </div>

      <nav className="mt-6 space-y-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
