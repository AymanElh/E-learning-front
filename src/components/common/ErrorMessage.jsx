import React from 'react';

function ErrorMessage({ message, type = 'error', onClose, className = '' }) {
    const typeStyles = {
        error: 'bg-red-900 border-red-700 text-red-300',
        warning: 'bg-yellow-900 border-yellow-700 text-yellow-300',
        info: 'bg-blue-900 border-blue-700 text-blue-300',
        success: 'bg-green-900 border-green-700 text-green-300'
    };

    const iconMap = {
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        success: '✅'
    };

    if (!message) return null;

    return (
        <div className={`
            relative 
            border 
            rounded-lg 
            p-4 
            mb-4 
            flex 
            items-center 
            justify-between
            ${typeStyles[type]}
            ${className}
        `}>
            <div className="flex items-center space-x-3">
                <span className="text-lg" role="img" aria-label={type}>
                    {iconMap[type]}
                </span>
                <div>
                    <p className="font-medium">{message}</p>
                </div>
            </div>

            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-4 hover:opacity-75 transition-opacity"
                    aria-label="Close message"
                >
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default ErrorMessage;