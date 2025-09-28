import React, { useEffect } from "react";
import TopbarHomePage from "../../components/Topber/TopbarHomePage";
import BgImg from "../../assets/Gemini_Generated_Image.png";
import { motion } from "framer-motion";
import { FaChartLine, FaWallet, FaCalculator, FaChartPie } from "react-icons/fa";

const HomePage: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <FaChartLine className="text-[#2DADC2] text-3xl" />,
      title: "ช่วยให้คุณวิเคราะห์และวางแผนการเงิน",
      delay: 0.2
    },
    {
      icon: <FaWallet className="text-[#2DADC2] text-3xl" />,
      title: "ทำบัญชีรายรับรายจ่าย",
      delay: 0.4
    },
    {
      icon: <FaChartPie className="text-[#2DADC2] text-3xl" />,
      title: "วิเคราะห์การลงทุน",
      delay: 0.6
    },
    {
      icon: <FaCalculator className="text-[#2DADC2] text-3xl" />,
      title: "คำนวณภาษี",
      delay: 0.8
    }
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <TopbarHomePage />
      <div className="flex justify-between h-[calc(100vh-120px)]">
        <div className="w-1/2 flex items-center justify-center px-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-[700px] backdrop-blur-md bg-black/60 rounded-3xl p-12 shadow-2xl border border-white/10"
          >
            <motion.h1 
              {...fadeIn}
              className="text-5xl font-bold text-white mb-8 bg-gradient-to-r from-[#2DADC2] to-white bg-clip-text text-transparent"
            >
              ระบบจัดการการเงินส่วนบุคคล
            </motion.h1>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: feature.delay, duration: 0.5 }}
                  className="flex items-center space-x-4 group"
                >
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#2DADC2]/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-white group-hover:text-[#2DADC2] transition-colors">
                    {feature.title}
                  </h2>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
};

export default HomePage;