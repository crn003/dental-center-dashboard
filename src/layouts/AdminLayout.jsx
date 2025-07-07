// src/layouts/AdminLayout.jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-4">
        <h2 className="text-xl font-semibold text-blue-600">🦷 Dental Center</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <NavLink to="/admin" className="hover:text-blue-500">📊 Dashboard</NavLink>
          <NavLink to="/admin/patients" className="hover:text-blue-500">🧑‍⚕️ Patients</NavLink>
          <NavLink to="/admin/incidents" className="hover:text-blue-500">📁 Incidents</NavLink>
          <NavLink to="/admin/calendar" className="hover:text-blue-500">📅 Calendar</NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 mt-4 hover:underline"
        >
          🔓 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
