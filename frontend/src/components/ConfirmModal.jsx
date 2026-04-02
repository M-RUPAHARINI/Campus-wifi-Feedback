import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up relative">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <FaTimes className="text-xl" />
                </button>

                <div className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex-shrink-0 flex items-center justify-center border border-red-200 dark:border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                            <FaExclamationTriangle className="text-2xl text-red-500" />
                        </div>
                        <div className="pt-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">{message}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end mt-8 border-t border-gray-100 dark:border-gray-800 pt-5">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent dark:border-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`px-5 py-2.5 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 border border-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all flex items-center gap-2 ${isLoading ? 'opacity-80 cursor-wait' : 'hover:scale-105 active:scale-95'}`}
                        >
                            {isLoading ? 'Processing...' : 'Yes, I\'m sure'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
