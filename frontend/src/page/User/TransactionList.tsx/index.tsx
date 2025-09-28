import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  subcategory: string;
  date: string;
  note: string;
}

export const TransactionList: React.FC = () => {
  const [filter, setFilter] = useState({
    type: 'all',
    startDate: '',
    endDate: '',
    search: '',
    category: 'all'
  });

  // Mock data - จะถูกแทนที่ด้วยข้อมูลจริงจาก API
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      amount: 30000,
      category: 'เงินเดือน',
      subcategory: '',
      date: '2025-09-25',
      note: 'เงินเดือนกันยายน'
    },
    {
      id: '2',
      type: 'expense',
      amount: 2500,
      category: 'บิล',
      subcategory: 'ค่าไฟ',
      date: '2025-09-26',
      note: 'ค่าไฟเดือนกันยายน'
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">ยอดรวมทั้งหมด</p>
          <h3 className="text-2xl font-bold">฿27,500</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">รายรับ</p>
          <h3 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            ฿30,000
            <ArrowUpRight size={20} className="text-green-500" />
          </h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">รายจ่าย</p>
          <h3 className="text-2xl font-bold text-red-600 flex items-center gap-2">
            ฿2,500
            <ArrowDownRight size={20} className="text-red-500" />
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหารายการ..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={filter.search}
                onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
          </div>
          
          <select
            value={filter.type}
            onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
            className="border p-2 rounded-lg"
          >
            <option value="all">ทั้งหมด</option>
            <option value="income">รายรับ</option>
            <option value="expense">รายจ่าย</option>
          </select>

          <input
            type="date"
            value={filter.startDate}
            onChange={(e) => setFilter(prev => ({ ...prev, startDate: e.target.value }))}
            className="border p-2 rounded-lg"
          />

          <input
            type="date"
            value={filter.endDate}
            onChange={(e) => setFilter(prev => ({ ...prev, endDate: e.target.value }))}
            className="border p-2 rounded-lg"
          />

          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Filter size={20} />
            <span>ตัวกรองเพิ่มเติม</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#2DADC2] hover:bg-[#2597A9] text-white rounded-lg transition-colors ml-auto">
            <Plus size={20} />
            <span>เพิ่มรายการใหม่</span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">วันที่</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ประเภท</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">หมวดหมู่</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">รายละเอียด</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">จำนวนเงิน</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${transaction.type === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'}`}>
                      {transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.category}
                    {transaction.subcategory && (
                      <span className="text-gray-500 text-xs block">
                        {transaction.subcategory}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {transaction.note}
                  </td>
                  <td className={`px-6 py-4 text-sm font-medium text-right
                    ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    ฿{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-[#2DADC2] hover:text-[#2597A9]">
                      แก้ไข
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;