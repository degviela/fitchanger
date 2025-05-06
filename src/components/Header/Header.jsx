import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderButton from '../Utilities/Buttons/HeaderButton';
import axios from 'axios';

const Header = () => {
    const [showButtons, setShowButtons] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;
    const AUTH_URL = process.env.REACT_APP_AUTH_URL;

    useEffect(() => {
        if (
            location.pathname === '/login' ||
            location.pathname === '/register' ||
            location.pathname === '/profile'
        ) {
            setShowButtons(false);
        } else {
            setShowButtons(true);
        }
    }, [location]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${AUTH_URL}/user`, { withCredentials: true });
                if (response.data) {
                    setIsAuthenticated(true);
                    setUser(response.data);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        fetchUser();
    }, []);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${AUTH_URL}/logout`, {}, { withCredentials: true });
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            {/* Top Header */}
            <div className="p-5 w-full h-[10%] text-black flex justify-between items-center bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-15 fixed top-0 z-50">
                {/* Logo */}
                <div className="w-[20%] h-full flex justify-start items-center">
                    <Link to="/">
                        <button className="w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] h-full">
                            <img className="w-full h-full object-contain" src="/images/fitchangerlogo3.png" alt="logo" />
                        </button>
                    </Link>
                </div>

                {/* Burger Icon */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-black focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center justify-end gap-4 flex-grow">
                    {showButtons && (
                        <>
                            {!isAuthenticated ? (
                                <>
                                    <HeaderButton
                                        to="/login"
                                        onClick={() => setShowButtons(false)}
                                        color="bg-orange-500 text-white hover:bg-orange-600 max-w-[95px]"
                                    >
                                        Login
                                    </HeaderButton>
                                    <HeaderButton
                                        to="/register"
                                        onClick={() => setShowButtons(false)}
                                        color="bg-black text-white hover:bg-gray-800 max-w-[95px]"
                                    >
                                        Sign Up
                                    </HeaderButton>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={toggleMenu}
                                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                                    >
                                        {user?.username || 'Profile'}
                                    </button>
                                    {menuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                onClick={toggleMenu}
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center z-40 md:hidden">
                    <button onClick={toggleMenu} className="absolute top-5 right-5 text-black focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {showButtons && (
                        <div className="flex flex-col space-y-4">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={toggleMenu}
                                        className="px-6 py-3 bg-orange-500 text-white text-lg rounded-full hover:bg-orange-600 transition duration-300"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={toggleMenu}
                                        className="px-6 py-3 bg-black text-white text-lg rounded-full hover:bg-gray-800 transition duration-300"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={toggleMenu}
                                        className="px-6 py-3 bg-gray-800 text-white text-lg rounded-full hover:bg-gray-700 transition duration-300"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="px-6 py-3 bg-red-500 text-white text-lg rounded-full hover:bg-red-600 transition duration-300"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Header;
