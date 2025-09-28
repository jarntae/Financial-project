import React, { useState } from "react";
import { 
  ChevronFirst, 
  LayoutDashboard, 
  Settings, 
  Receipt, 
  FolderTree,
  PieChart,
  CreditCard
} from "lucide-react";
import {  useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import MenuLink from "../MenuLink";

// ...existing code...

export default function SidebarUser({
  children,
}: {
  children?: React.ReactNode;
}) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      to: "/user/dashboard",
      icon: LayoutDashboard,
      title: "แดชบอร์ด"
    },
    {
      to: "/user/transactions",
      icon: Receipt,
      title: "รายการธุรกรรม"
    },
    {
      to: "/user/categories",
      icon: FolderTree,
      title: "จัดการหมวดหมู่"
    },
    {
      to: "/user/reports",
      icon: PieChart,
      title: "รายงาน"
    },
    {
      to: "/user/payment",
      icon: CreditCard,
      title: "การชำระเงิน"
    },
    {
      to: "/user/settings",
      icon: Settings,
      title: "ตั้งค่า"
    }
  ];

  // ...existing code for isActiveRoute and MenuLink...

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ height: "calc(100vh - 120px)" }}
      className={`
        ${collapsed ? "w-20" : "w-72"} 
        bg-white border-r shadow-lg flex flex-col
        transition-all duration-300 ease-in-out
      `}
    >
      {/* Header */}
      <div className="p-5 pb-3 flex items-center justify-between border-b">
        {!collapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl bg-gradient-to-r from-[#2DADC2] to-blue-600 text-transparent bg-clip-text"
          >
            Financial
          </motion.span>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCollapsed((v) => !v)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <ChevronFirst
            className={`${
              collapsed ? "rotate-180" : ""
            } transition-transform duration-300`}
          />
        </motion.button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <motion.ul 
          className="space-y-2"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {menuItems.map((item, index) => (
            <motion.li
              key={item.to}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
              }}
            >
              <MenuLink
                to={item.to}
                icon={item.icon}
                title={item.title}
              />
            </motion.li>
          ))}
          {children}
        </motion.ul>
      </nav>
    </motion.aside>
  );
}