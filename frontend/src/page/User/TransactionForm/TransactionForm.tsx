import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TransactionFormProps {
  onSubmit: (data: TransactionData) => void;
  onCancel: () => void;
}

interface TransactionData {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  subcategory: string;
  date: string;
  note: string;
}

// type CategoryType = 'income' | 'expense';

interface Categories {
  income: string[];
  expense: string[];
}

interface Subcategories {
  [key: string]: string[]; // This is the index signature
}

const categories: Categories = {
  income: ['เงินเดือน', 'โบนัส', 'ดอกเบี้ย', 'อื่นๆ'],
  expense: ['บิล', 'ค่าเดินทาง', 'อาหาร', 'ช้อปปิ้ง']
};

const subcategories: Subcategories = {
  'บิล': ['ค่าไฟ', 'ค่าน้ำ', 'ค่าอินเทอร์เน็ต', 'บิลเติมเงิน'],
  'ค่าเดินทาง': ['ค่าน้ำมัน', 'ค่าโดยสารสาธารณะ']
};

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TransactionData>({
    type: 'expense',
    amount: 0,
    category: '',
    subcategory: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {formData.type === 'income' ? 'บันทึกรายรับ' : 'บันทึกรายจ่าย'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              formData.type === 'income'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            รายรับ
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              formData.type === 'expense'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            รายจ่าย
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            จำนวนเงิน
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            หมวดหมู่
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, subcategory: '' }))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">เลือกหมวดหมู่</option>
            {categories[formData.type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {formData.category && subcategories[formData.category] && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หมวดหมู่ย่อย
            </label>
            <select
              value={formData.subcategory}
              onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">เลือกหมวดหมู่ย่อย</option>
              {subcategories[formData.category].map(subcat => (
                <option key={subcat} value={subcat}>{subcat}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            วันที่
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            บันทึกเพิ่มเติม
          </label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-[#2DADC2] hover:bg-[#2597A9] text-white py-2 px-4 rounded-lg transition-colors"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </motion.div>
  );
};