import React from 'react';
import { LuX } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed top-0 right-0 z-50 h-full w-full md:w-[40vw] bg-white shadow-lg border-l border-gray-200/60 overflow-hidden"
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
              <h3 className="text-lg font-semibold text-gray-900">{title || 'Learn More'}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 rounded-lg w-8 h-8 flex justify-center items-center transition-colors"
                aria-label="Close drawer"
              >
                <LuX size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;