import {useEffect, useRef, useState} from "react";
import {BellIcon, ChevronDownIcon, LogOutIcon, SettingsIcon, UserCircle2Icon, UserIcon} from "lucide-react";
import {authService} from "../../../services/authService.js";
import {useNavigate} from "react-router-dom";

function AdminHeader({title}) {
    const [isDropdown, setIsDropDown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        function handleClikOutside(event) {
            console.log(dropdownRef.current);
            console.log(event.target);
            if(isDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                console.log("in")
                setIsDropDown(false);
            }
        }

        if(isDropdown) {
            document.addEventListener('mousedown', handleClikOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClikOutside);
        }
    }, [isDropdown]);

    async function handleLogout() {
        try {
            await authService.logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/');
        }
    }

    async function fetchUserData() {
        try {
            setLoading(true);

            let userData = await authService.getCurrentUser();
            // console.log(userData);
            if (userData) {
                setUser(userData);
            } else {
                // No user data available, redirect to login
                console.warn('No user data available, redirecting to login');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }

    function getUserInitials() {
        if (!user) return 'U';

        const words = user.name.split(' ');
        if (words.length >= 2) {
            return `${words[0][0]}${words[1][0]}`.toUpperCase();
        }

        return name.charAt(0).toUpperCase();
    }

    return (
        <header className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            <div className="flex items-center gap-4">
                <BellIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
                <SettingsIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>

                {/*User dropdown*/}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropDown(!isDropdown)}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors focus:outline-none">

                        {/*User profile*/}
                        {user?.profile_url ? (
                            <img src={user.profile_url} alt="User profile"
                                 className="w-6 h-6 rounded-full object-cover"/>
                        ) : (
                            <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                                {getUserInitials()}
                            </div>
                        )}
                        <span
                            className="text-sm font-medium">{loading ? 'Loading...' : user ? user.name : "Admin"}</span>
                        <ChevronDownIcon className="w-4 h-4 transition-transform"/>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdown && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                            <div className="py-1">
                                {user && (
                                    <>
                                        <div className="px-4 py-2 border-b border-gray-700">
                                            <p className="text-sm font-medium text-white">{user.name ?? "Admin"}</p>
                                            {user.email && (
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                                <button
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                                    <UserIcon className="w-4 h-4"/>
                                    My Profile
                                </button>
                                <hr className="border-gray-700"/>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors">
                                    <LogOutIcon className="w-4 h-4"/>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
