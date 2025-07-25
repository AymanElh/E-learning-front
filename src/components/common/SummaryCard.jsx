import React from 'react';

function SummaryCard({title, value, icon}) {
    return (
        <div className="bg-gray-800 p-4 rounded-xl flex justify-between items-center">
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            <div className="text-purple-400">{icon}</div>
        </div>
    );
}

export default SummaryCard;