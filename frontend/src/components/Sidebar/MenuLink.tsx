import React from "react";
import { Link } from "react-router-dom";
type MenuLinkProps = {
  to: string;
  icon: React.ElementType;
  title: string;
  collapsed?: boolean;
  currentPath: string;
};

function MenuLink({ to, icon: Icon, title, collapsed, currentPath }: MenuLinkProps) {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-gradient-to-r from-[#2DADC2] to-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      title={collapsed ? title : ""} // <-- แสดง tooltip เฉพาะตอน collapsed
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span>{title}</span>} {/* แสดงชื่อเมนูตอน sidebar ขยาย */}
    </Link>
  );
}

export default MenuLink;