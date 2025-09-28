import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-[250px] h-[calc(100vh-120px)] bg-gray-100 p-4">
      <ul className="space-y-4">
        <li className="hover:text-[#180731] cursor-pointer">Dashboard</li>
        <li className="hover:text-[#180731] cursor-pointer">รายรับ</li>
        <li className="hover:text-[#180731] cursor-pointer">รายจ่าย</li>
      </ul>
    </div>
  );
};

export default Sidebar;
