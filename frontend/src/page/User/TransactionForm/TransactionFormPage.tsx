import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TransactionForm } from './TransactionForm';

interface TransactionFormPageProps {}

const TransactionFormPage: React.FC<TransactionFormPageProps> = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      // TODO: เพิ่ม API call ในอนาคต
      console.log('ข้อมูลฟอร์ม:', data);
      navigate('/user/transactions');
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  };

  const handleCancel = () => {
    navigate('/user/transactions');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[calc(100vh-64px)] flex justify-center items-start pt-8"
    >
      <TransactionForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </motion.div>
  );
};

export default TransactionFormPage;