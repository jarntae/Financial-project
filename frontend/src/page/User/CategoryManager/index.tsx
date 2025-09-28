import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, FolderPlus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
}

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'บิล',
      type: 'expense',
      subcategories: [
        { id: '1-1', name: 'ค่าไฟ' },
        { id: '1-2', name: 'ค่าน้ำ' },
        { id: '1-3', name: 'ค่าอินเทอร์เน็ต' }
      ]
    },
    {
      id: '2',
      name: 'ค่าเดินทาง',
      type: 'expense',
      subcategories: [
        { id: '2-1', name: 'ค่าน้ำมัน' },
        { id: '2-2', name: 'ค่าโดยสารสาธารณะ' }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('expense');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: activeTab,
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">จัดการหมวดหมู่</h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#2DADC2] text-white rounded-lg hover:bg-[#2597A9] transition-colors"
            >
              <Plus size={20} />
              เพิ่มหมวดหมู่
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab('expense')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'expense'
                  ? 'bg-[#2DADC2] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              รายจ่าย
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'income'
                  ? 'bg-[#2DADC2] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              รายรับ
            </button>
          </div>
        </div>

        {/* Category List */}
        <div className="p-6">
          <div className="space-y-4">
            {categories
              .filter(category => category.type === activeTab)
              .map(category => (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <span className="text-sm text-gray-500">
                        ({category.subcategories.length} หมวดหมู่ย่อย)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FolderPlus size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {category.subcategories.map(sub => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <span>{sub.name}</span>
                        <div className="flex items-center gap-1">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Edit2 size={14} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-4">เพิ่มหมวดหมู่ใหม่</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อหมวดหมู่
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2DADC2] focus:border-transparent"
                    placeholder="ระบุชื่อหมวดหมู่"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#2DADC2] rounded-lg hover:bg-[#2597A9]"
                  >
                    บันทึก
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryManager;