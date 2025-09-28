import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import dollar from "../../assets/dollar.png";

const Topbar: React.FC = () => {
  return (
    <div className="w-full h-[120px] flex items-center justify-between px-6 shadow-md" style={{backgroundColor: "var(--color-a3)"}}>
      {/* ซ้าย */}
      <div className="flex items-center space-x-4">
        <img
          src={dollar} // แทนด้วยไฟล์ไอคอนจริงของคุณ
          alt="logo"
          className="w-[60px] h-[60px]"
        />
        <span className="text-white text-2xl font-bold">
          ระบบจัดการการเงินส่วนบุคคล
        </span>
      </div>

      {/* ขวา */}
      <div className="flex items-center space-x-6">
        
          <button className="text-white hover:text-gray-300">
            <SettingOutlined style={{ fontSize: "28px" }} />
          </button>

      </div>
    </div>
  );
};

export default Topbar;
