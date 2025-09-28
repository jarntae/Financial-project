import React from "react";
import TopbarHomePage from "../../components/Topber/TopbarHomePage";
import BgImg from "../../assets/Gemini_Generated_Image.png";

const HomePage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <TopbarHomePage />
      <div className="flex justify-between h-[calc(100vh-120px)]">
        <div className="w-[50%] ml-50 mt-27.5">
          <div className="flex h-[500px] w-[700px] bg-black/58 rounded-4xl p-10 items-start">
            <div className="block space-y-4">
              <h1 className="text-4xl font-bold text-[#ffff]">
                ระบบจัดการการเงินส่วนบุคคล
              </h1>
              <h1 className="text-2xl font-bold text-[#ffff]">
                ช่วยให้คุณวิเคราะห์และว่างแผนการเงิน
              </h1>
              <h1 className="text-2xl font-bold text-[#ffff]">
                ทำบันชีรายรับรายจ่าย
              </h1>
              <h1 className="text-2xl font-bold text-[#ffff]">
                วิเคราะห์การลงทุน
              </h1>
              <h1 className="text-2xl font-bold text-[#ffff]">
                คำนวนภาษี
              </h1>
            </div>
          </div>
        </div>
        <div className="w-[50%]"></div>
        {/* <h1 className="text-4xl font-bold text-[#180731]">
          Welcome to the Financial Management System
        </h1> */}
      </div>
    </div>
  );
};

export default HomePage;
