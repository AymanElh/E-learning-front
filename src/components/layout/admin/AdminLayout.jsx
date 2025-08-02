import React from "react";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminHeader from "./AdminHeader.jsx";

function AdminLayout({children})  {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <AdminSidebar />
            <main className="ml-64 p-6">
                <AdminHeader title="Dashboard" />
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;
