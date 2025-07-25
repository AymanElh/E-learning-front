import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminLayout({children})  {
    console.log(children);
    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            <Sidebar />
            <main className="flex-1 p-6">
                <Header title="Dashboard" />
                {children}
            </main>
        </div>
    );
}


export default AdminLayout;
