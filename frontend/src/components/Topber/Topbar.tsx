import React, { useState } from "react";
import { SettingOutlined, UserOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import dollar from "../../assets/dollar.png";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../services/https/useAuth";
import { SetLogOut } from "../../services/https";
import { useNavigate } from "react-router-dom";

const Topbar: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await SetLogOut();
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="w-full h-[120px] flex items-center justify-between px-12 shadow-xl bg-gradient-to-r from-[#2DADC2] to-[#2597A9]"
    >
      {/* ซ้าย */}
      <motion.div 
        className="flex items-center space-x-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative group">
          <img
            src={dollar}
            alt="logo"
            className="w-[60px] h-[60px] drop-shadow-xl hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-white/20 rounded-full filter blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
        </div>
        <span className="text-white text-4xl font-bold tracking-wide drop-shadow-md">
          ระบบจัดการการเงินส่วนบุคคล
        </span>
      </motion.div>

      {/* ขวา */}
      <div className="flex items-center space-x-8">
        {/* Notification Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3 text-white hover:bg-white/10 rounded-lg transition-all duration-300 group"
        >
          <BellOutlined className="text-2xl group-hover:text-yellow-300" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
            2
          </span>
        </motion.button>

        {/* Profile Button */}
        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <UserOutlined className="text-xl text-white" />
            </div>
            <span className="text-white font-medium">
              {user?.firstName} {user?.lastName}
            </span>
          </motion.button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50"
              >
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 flex items-center space-x-2">
                  <UserOutlined />
                  <span>โปรไฟล์</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 flex items-center space-x-2">
                  <SettingOutlined />
                  <span>ตั้งค่า</span>
                </button>
                <hr className="my-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center space-x-2"
                >
                  <LogoutOutlined />
                  <span>ออกจากระบบ</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Topbar;