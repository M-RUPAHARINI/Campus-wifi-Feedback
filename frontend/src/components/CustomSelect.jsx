import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const CustomSelect = ({ options, value, onChange, name, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown strictly if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    const selectedLabel = options.find(opt => opt.value === value)?.label || value;

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div 
                className="input-field flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-green-500/50"
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
            >
                <span className="truncate pr-4 select-none">{selectedLabel}</span>
                <FaChevronDown className={`text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute z-[100] w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden animate-slide-up origin-top">
                    <div className="max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`px-4 py-3 cursor-pointer transition-all duration-200 text-sm font-medium
                                    ${value === option.value 
                                        ? 'bg-green-700 text-white' 
                                        : 'text-gray-700 dark:text-white hover:bg-green-100 hover:dark:bg-green-600 hover:text-green-800 hover:dark:text-white'
                                    }
                                `}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
