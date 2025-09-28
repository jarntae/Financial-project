import React from "react";
import { Link, useLocation } from "react-router-dom";
type MenuLinkProps = {
  to: string;
  icon: React.ElementType;
  title: string;
};

function MenuLink({ to, icon: Icon, title }: MenuLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-gradient-to-r from-[#2DADC2] to-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </Link>
  );
}
export default MenuLink;