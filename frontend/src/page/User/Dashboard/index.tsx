import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Wallet, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import type { PieLabelRenderProps } from "recharts";

// ข้อมูลตัวอย่าง
const monthlyData = [
  { month: "ม.ค.", income: 45000, expense: 35000 },
  { month: "ก.พ.", income: 48000, expense: 32000 },
  { month: "มี.ค.", income: 47000, expense: 38000 },
  { month: "เม.ย.", income: 46000, expense: 34000 },
  { month: "พ.ค.", income: 45000, expense: 36000 },
  { month: "มิ.ย.", income: 47000, expense: 37000 },
];

const expensesByCategory = [
  { name: "บิล", value: 12000, color: "#FF6B6B" },
  { name: "อาหาร", value: 8000, color: "#4ECDC4" },
  { name: "ค่าเดินทาง", value: 6000, color: "#45B7D1" },
  { name: "ช้อปปิ้ง", value: 5000, color: "#96CEB4" },
  { name: "อื่นๆ", value: 5000, color: "#FFEEAD" },
];

const Dashboard: React.FC = () => {
  // คำนวณสถานะทางการเงิน
  const totalIncome = 47000;
  const totalExpense = 37000;
  const balance = totalIncome - totalExpense;
  const expenseRatio = (totalExpense / totalIncome) * 100;

  const getFinancialStatus = () => {
    if (expenseRatio < 70)
      return { status: "ปลอดภัย", color: "green", icon: "✅" };
    if (expenseRatio < 90)
      return { status: "เริ่มเสี่ยง", color: "orange", icon: "⚠️" };
    return { status: "เสี่ยงต่อการขาดสภาพคล่อง", color: "red", icon: "🔴" };
  };

  const status = getFinancialStatus();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* สรุปภาพรวม */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">ยอดคงเหลือ</p>
              <h3 className="text-2xl font-bold mt-1">
                ฿{balance.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Wallet className="text-blue-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">รายรับ</p>
              <h3 className="text-2xl font-bold mt-1 text-green-600">
                ฿{totalIncome.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">รายจ่าย</p>
              <h3 className="text-2xl font-bold mt-1 text-red-600">
                ฿{totalExpense.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <TrendingDown className="text-red-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">สถานะการเงิน</p>
              <h3
                className={`text-2xl font-bold mt-1 text-${status.color}-600`}
              >
                {status.icon} {status.status}
              </h3>
            </div>
            <div className={`p-3 bg-${status.color}-50 rounded-lg`}>
              <AlertTriangle className={`text-${status.color}-500`} size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* กราฟแสดงรายรับ-รายจ่ายรายเดือน */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border"
        >
          <h3 className="text-lg font-semibold mb-6">รายรับ-รายจ่ายรายเดือน</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" name="รายรับ" fill="#4ADE80" />
                <Bar dataKey="expense" name="รายจ่าย" fill="#F87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <h3 className="text-lg font-semibold mb-6">สัดส่วนรายจ่าย</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: PieLabelRenderProps) =>
                     `${name} ${((percent as number) * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
