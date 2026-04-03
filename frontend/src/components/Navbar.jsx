import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaWifi, FaSignOutAlt, FaUserCircle, FaBell, FaChevronDown, FaSun, FaMoon } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../config';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isNotifLoading, setIsNotifLoading] = useState(false);
    const [notifError, setNotifError] = useState(null);

    const fetchNotifications = async () => {
        try {
            setNotifError(null);
            setIsNotifLoading(true);
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${API_URL}/api/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setNotifError('Failed to load notifications');
        } finally {
            setIsNotifLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
            return () => clearInterval(interval);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const unreadNotifications = notifications.filter(n => !n.isRead);
    const unreadCount = unreadNotifications.length;

    const handleNotificationClick = (notif) => {
        if (!notif.isRead) {
            setNotifications(notifications.map(n => n._id === notif._id ? { ...n, isRead: true } : n));
            const token = localStorage.getItem('token');
            axios.put(`${API_URL}/api/notifications/${notif._id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            }).catch(error => console.error('Error marking notification as read:', error));
        }
        setShowNotifications(false);
        const fallbackUrl = user?.role === 'admin' ? '/admin' : '/dashboard';
        navigate(notif.redirectUrl || fallbackUrl);
    };

    return (
        <nav className="bg-[#e6fec2] dark:bg-green-950/90 backdrop-blur-xl sticky top-0 z-[100] border-b border-[#cbf288] dark:border-green-900 shadow-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-18 py-3">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center group">
                            <div className="h-10 w-10 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center border border-green-200 dark:border-green-500/20 group-hover:border-green-300 dark:group-hover:border-green-500/50 transition-all duration-300">
                                <FaWifi className="h-5 w-5 text-green-600 dark:text-green-500" />
                            </div>
                            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block transition-colors duration-300">
                                Campus<span className="text-green-600 dark:text-green-500">WiFi</span>
                            </span>
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {user ? (
                            <>
                                {/* Theme Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-all duration-200"
                                    aria-label="Toggle Theme"
                                >
                                    {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                                </button>
                                
                                {/* Notification Bell */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-all duration-200 relative"
                                    >
                                        <FaBell className="text-xl" />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-2 right-2 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-gray-950 animate-bounce">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    {/* Notifications Dropdown */}
                                    {showNotifications && (
                                        <div className="absolute right-0 mt-3 w-80 glass-card overflow-hidden z-[110] animate-slide-up shadow-2xl">
                                            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                                                <span className="text-xs text-green-600 dark:text-green-500 font-semibold bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-md">{unreadCount} New</span>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto scrollbar-hide">
                                                {isNotifLoading && notifications.length === 0 ? (
                                                    <div className="p-10 text-center">
                                                        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Loading...</p>
                                                    </div>
                                                ) : notifError ? (
                                                    <div className="p-10 text-center">
                                                        <p className="text-xs font-bold text-red-500 mb-2">{notifError}</p>
                                                        <button 
                                                            onClick={fetchNotifications}
                                                            className="text-[10px] font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 uppercase underline"
                                                        >
                                                            Retry
                                                        </button>
                                                    </div>
                                                ) : unreadNotifications.length > 0 ? (
                                                    unreadNotifications.map((notif) => (
                                                        <div
                                                            key={notif._id}
                                                            onClick={() => handleNotificationClick(notif)}
                                                            className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors flex gap-3 ${!notif.isRead ? 'bg-green-50 dark:bg-green-500/[0.02]' : ''}`}
                                                        >
                                                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.isRead ? 'bg-gray-300 dark:bg-gray-700' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></div>
                                                            <div>
                                                                <p className={`text-sm ${notif.isRead ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-200 font-bold'}`}>{notif.message}</p>
                                                                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block uppercase tracking-wider font-semibold">
                                                                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {notif.type}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-10 text-center">
                                                        <FaBell className="mx-auto text-3xl text-gray-300 dark:text-gray-700 mb-3" />
                                                        <p className="text-sm font-medium text-gray-500">No notifications yet</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* User Profile */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className="flex items-center gap-3 p-1.5 pl-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                                    >
                                        <div className="flex flex-col items-end mr-1 hidden md:flex">
                                            <span className="text-sm font-bold text-gray-900 dark:text-gray-200">{user.name}</span>
                                            <span className="text-[10px] text-green-600 dark:text-green-500 uppercase tracking-widest font-bold">{user.role}</span>
                                        </div>
                                        <div className="h-10 w-10 bg-green-100 dark:bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 dark:text-green-500 border border-green-200 dark:border-green-500/20 shadow-sm">
                                            <FaUserCircle className="text-2xl" />
                                        </div>
                                        <FaChevronDown className={`text-xs text-gray-400 dark:text-gray-500 transition-transform duration-300 hidden sm:block ${showProfileDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Profile Dropdown */}
                                    {showProfileDropdown && (
                                        <div className="absolute right-0 mt-3 w-56 glass-card overflow-hidden z-[110] animate-slide-up shadow-2xl">
                                            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Signed in as</p>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.email}</p>
                                            </div>
                                            <div className="p-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-xl transition-all"
                                                >
                                                    <FaSignOutAlt />
                                                    <span>Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link to="/login" className="btn-primary py-2.5 text-sm uppercase tracking-wider px-8 font-bold">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
