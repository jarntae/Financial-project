import React, { useState, useEffect } from "react";
import { ChevronFirst, MoreVertical, LayoutDashboard, Users, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/https/useAuth";
import { SetLogOut } from "../../../services/https";
export default function SidebarAdmin({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    const result = await SetLogOut();
    if (result.success) {
      navigate("/");
    }
  };
  const toggleCollapsed = () => setCollapsed((v) => !v);
  

  return (
    <aside
      style={{ height: "calc(100vh - 120px)" }}
      className={`${collapsed ? "w-16" : "w-64"} bg-white border-r shadow-sm flex flex-col transition-all duration-200`}
    >
      {/* Header */}
      <div className="p-4 pb-2 flex items-center justify-between border-b">
        {!collapsed && <span className="font-bold text-lg text-blue-900">Admin Panel</span>}
        <button
          onClick={toggleCollapsed}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <ChevronFirst className={`${collapsed ? "rotate-180" : ""} transition-transform`} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} p-2 rounded hover:bg-blue-50`}
              title="Dashboard"
            >
              <LayoutDashboard size={20} />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} p-2 rounded hover:bg-blue-50`}
              title="Users"
            >
              <Users size={20} />
              {!collapsed && <span>Users</span>}
            </Link>
          </li>
          {children}
        </ul>
      </nav>

      {/* Footer */}
      {collapsed ? (
        <div className="border-t flex items-center justify-center p-3">
          <button
            className="p-2 hover:bg-red-100 rounded"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} className="text-red-500" />
          </button>
        </div>
      ) : (
        <div className="border-t flex items-center p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-9 h-9 rounded-md"
          />
          <div className="ml-3 flex-1">
            <h4 className="font-semibold leading-4">{user?.firstName} {user?.lastName}</h4>
            <span className="text-xs text-gray-600">{user?.email}</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded" title="Menu">
            <MoreVertical size={18} />
          </button>
          <button
            className="ml-2 p-2 hover:bg-red-100 rounded"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} className="text-red-500" />
          </button>
        </div>
      )}
    </aside>
  );
}