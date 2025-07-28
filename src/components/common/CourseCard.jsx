import React from 'react';
import {DollarSign, Trash2Icon} from "lucide-react";

function CourseCard({title, category, students, price, imageUrl}) {
    return (
        <div className="bg-gray-800 p-4 rounded-xl flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img
                    src="https://images.unsplash.com/photo-1682905926517-6be3768e29f0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={title}
                    className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-sm text-gray-400">{category} • {students} students</p>
                    <p className="text-lg font-bold mt-1 flex items-center"><DollarSign /> {price}</p>
                </div>
            </div>
            <Trash2Icon className="text-red-500 w-5 h-5 cursor-pointer"/>
        </div>
    );
}

export default CourseCard;