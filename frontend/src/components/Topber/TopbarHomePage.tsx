import React, { useState } from "react";
import LoginPage from "../../page/authentication/Login/Login";
import dollar from "../../assets/dollar.png";
// import { Divider } from "antd";
const TopbarHomePage: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-[120px] flex items-center justify-between px-6 shadow-md" style={{backgroundColor: "var(--color-a3)"}}>
        {/* ซ้าย */}
        <div className="flex items-center space-x-4">
          <img
            src={dollar}
            alt="logo"
            className="w-[60px] h-[60px]"
          />
          <span className="text-white text-[40px] font-bold">
            ระบบจัดการการเงินส่วนบุคคล
          </span>
        </div>

        {/* ขวา */}
        <div className="flex items-center space-x-6">
          <button
            className="text-white text-[40px] hover:text-gray-300"
           onClick={() => setOpen(true)}
          >
            เข้าสู่ระบบ
          </button>
          <h1 className="text-white text-[40px]">/</h1>
          <button className="text-white text-[40px] hover:text-gray-300">
            ลงทะเบียน
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* พื้นหลังเบลอ + คลิกปิด */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* กล่อง modal */}
          <div className="relative bg-white rounded-xl shadow-lg w-[1200px] h-[900px] p-6 z-10 overflow-auto">
            {/* ปุ่มปิดมุมขวา */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {/* เนื้อหา Login */}
            <LoginPage />
          </div>
        </div>
      )}
    </>
  );
};

export default TopbarHomePage;
