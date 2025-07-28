import {useState} from "react";
import {Link} from 'react-router-dom';
import {BookOpenIcon, SearchIcon, UserIcon} from "lucide-react";
import {tokenService} from "../../../services/tokenService.js";
import {authService} from "../../../services/authService.js";

function PublicHeader() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const isAuthenticated = tokenService.isAuthenticated();

    async function handleLogout() {
        await authService.logout();
        window.href("/logout")
    }

    function toggleUserMenu() {
        setIsUserMenuOpen(!isUserMenuOpen);
    }

    return (
        <header className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 ">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <BookOpenIcon className="w-8 h-8 text-blue-500"/>
                            <span className="text-xl font-bold">EduPlatform</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/courses"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Courses
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <SearchIcon
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/*User section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <UserIcon className="w-6 h-6"/>
                                    <span>Account</span>
                                </button>

                                {/*Dropdown menu*/}
                                {isUserMenuOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 ">
                                        <Link
                                            to="/dashboard"
                                            className="block  px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">My
                                            Dashboard
                                        </Link>
                                        <Link
                                            to=""
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">My
                                            Courses
                                        </Link>
                                        <Link
                                            to=""
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Profile
                                        </Link>
                                        <hr className="border-gray-700 my-1"/>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link className="text-gray-300 hover:text-white transition-colors"
                                      to="/login">Login</Link>
                                <Link className="bg-blue-500 px-4 py-2 rounded-lg transition-colors hover:bg-blue-700"
                                      to="/register">Signup</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default PublicHeader;