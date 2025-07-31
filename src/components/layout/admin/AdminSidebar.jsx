import React from "react";
import {NavLink} from "react-router-dom";
import {LayoutDashboardIcon, BookOpenIcon, FolderIcon, UsersIcon, Tags} from "lucide-react";


function AdminSidebar () {

    const navItems = [
        {label: "Dashboard", to: "/dashboard", icon: <LayoutDashboardIcon className="w-5 h-5"/>},
        {label: "Courses", to: "/admin/courses", icon: <BookOpenIcon className="w-5 h-5"/>},
        {label: "Categories", to: "/admin/categories", icon: <FolderIcon className="w-5 h-5"/>},
        {label: "Enrollments", to: "/admin/enrollments", icon: <UsersIcon className="w-5 h-5"/>},
        {label: "Tags", to: "/admin/tags", icon: <Tags className="w-5 h-5" />},
        // Temporarily removed Analytics until the route is implemented
        // {label: "Analytics", to: "/admin/analytics", icon: <BarChart2Icon className="w-5 h-5"/>},
    ]

    return (
        <aside className="w-64 p-6 text-white bg-gray-800">
            <h1 className="text-2xl font-bold mb-6">Admin dashboard</h1>
            <nav className="space-y-4 text-sm">
                {navItems && navItems.map(({label, to, icon}) => (
                    <NavLink
                        key={label}
                        to={to}
                        className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded transition ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-gray-700 text-gray-300'}`}
                    >
                        {icon}
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default AdminSidebar;
