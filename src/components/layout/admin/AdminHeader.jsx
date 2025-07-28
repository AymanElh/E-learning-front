import React from "react";
import {BellIcon, SettingsIcon, UserCircle2Icon} from "lucide-react";

function AdminHeader({title}) {
    return (
        <header className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{title} </h2>
            <div className="flex items-center gap-4">
                <BellIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
                <SettingsIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
                <UserCircle2Icon className="w-6 h-6 text-purple-400"/>
            </div>
        </header>
    );
}

export default AdminHeader;
