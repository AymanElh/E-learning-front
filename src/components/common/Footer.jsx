import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Course Platform. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;