import React from 'react';
import PublicHeader from './PublicHeader.jsx';
import PublicFooter from './PublicFooter.jsx';

function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <PublicHeader />

            {/* Main Content Area */}
            <main className="flex-1">
                {children}
            </main>

            <PublicFooter />
        </div>
    );
}

export default PublicLayout;