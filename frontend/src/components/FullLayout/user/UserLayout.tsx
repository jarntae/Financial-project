import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Topbar from '../../Topber/Topbar';
import SidebarUser from '../../Sidebar/User/Sidebar';
import AddTransactionFAB from '../../../page/User/TransactionForm/AddTransactionFAB';

const UserLayout: React.FC = () => {
  const location = useLocation();
  const showFAB = !location.pathname.includes('/transactions/new');

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <SidebarUser />
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      {showFAB && <AddTransactionFAB />}
    </div>
  );
};

export default UserLayout;