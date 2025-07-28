import React from "react";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminHeader from "./AdminHeader.jsx";

function AdminLayout({children})  {
    console.log(children);
    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            <AdminSidebar />
            <main className="flex-1 p-6">
                <AdminHeader title="Dashboard" />
                {children}
            </main>
        </div>
    );
}


export default AdminLayout;
