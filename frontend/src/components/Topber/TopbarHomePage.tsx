import React, { useState } from "react";
import LoginPage from "../../page/authentication/Login/Login";
import SignUp from "../../page/authentication/SignUp/SignUp";
import dollar from "../../assets/dollar.png";
import { motion } from "framer-motion";

const TopbarHomePage: React.FC = () => {
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);

  const closeModal = () => setModalType(null);
  
  return (
    <>
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-[120px] flex items-center justify-between px-12 shadow-lg backdrop-blur-sm bg-[#2DADC2]/90"
      >
        {/* ซ้าย */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-6"
        >
          <img 
            src={dollar} 
            alt="logo" 
            className="w-[60px] h-[60px] drop-shadow-lg hover:scale-110 transition-transform" 
          />
          <span className="text-white text-4xl font-bold tracking-wide">
            ระบบจัดการการเงินส่วนบุคคล
          </span>
        </motion.div>

        {/* ขวา */}
        <div className="flex items-center space-x-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-2xl text-white hover:text-gray-100 transition-colors relative group"
            onClick={() => setModalType("login")}
          >
            เข้าสู่ระบบ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"/>
          </motion.button>
          
          <span className="text-white text-3xl font-light">/</span>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-2xl bg-white text-[#2DADC2] rounded-lg hover:bg-gray-100 transition-colors shadow-md"
            onClick={() => setModalType("signup")}
          >
            ลงทะเบียน
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      {modalType && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative bg-gradient-to-br from-white to-gray-50 rounded-[20px] shadow-2xl w-[1200px] h-[800px] z-10 overflow-hidden"
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-full">
              {modalType === "login" ? (
                <LoginPage onSwitchToSignup={() => setModalType("signup")} />
              ) : (
                <SignUp onSwitchToLogin={() => setModalType("login")} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default TopbarHomePage;