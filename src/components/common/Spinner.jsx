import React from 'react';

function Spinner({ size = 'md', color = 'white' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const colorClasses = {
        white: 'border-white border-t-transparent',
        blue: 'border-blue-500 border-t-transparent',
        gray: 'border-gray-400 border-t-transparent',
        green: 'border-green-500 border-t-transparent'
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`
                    ${sizeClasses[size]} 
                    ${colorClasses[color]}
                    border-2 
                    rounded-full 
                    animate-spin
                `}
            />
        </div>
    );
}

export default Spinner;