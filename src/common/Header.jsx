import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="container header-container">
                <div className="logo">
                    <h1>Course Platform</h1>
                </div>
                <nav className="nav">
                    <ul>
                        <li> <Link to="/">Home</Link> </li>
                        <li> <Link to="/courses">Courses</Link> </li>
                        <li> <Link to="/categories">Categories</Link> </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;