import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AddTransactionFAB: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      className="fixed bottom-8 right-8 p-4 bg-[#2DADC2] text-white rounded-full shadow-lg z-50"
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 0 15px rgba(45, 173, 194, 0.5)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => navigate('/user/transactions/new')}
    >
      <Plus size={24} />
      <span className="sr-only">เพิ่มธุรกรรมใหม่</span>
    </motion.button>
  );
};

export default AddTransactionFAB;