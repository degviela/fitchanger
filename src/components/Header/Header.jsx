import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderButton from '../Utilities/Buttons/HeaderButton';
import axios from 'axios';

const Header = () => {
    const [showButtons, setShowButtons] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

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
        // Check if the user is authenticated
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost/api/check-auth');
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
            setSearchQuery('');
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost/api/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="p-5 w-full h-[10%] text-black flex justify-between items-center bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-15 fixed top-0 z-50">
            {/* Logo Section */}
            <div className="w-[20%] h-full flex justify-start items-center">
                <Link to="/">
                    <button className="w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] h-full">
                        <img className="w-full h-full object-contain" src="/images/fitchangerlogo3.png" alt="logo" />
                    </button>
                </Link>
            </div>

            {/* Search Bar Section */}
            <div className="flex-grow md:w-[35%] h-full flex justify-center items-center">
                <form onSubmit={handleSearchSubmit} className="w-full flex justify-center relative">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="bg-white text-black w-full max-w-[80%] sm:max-w-[70%] p-2 pl-4 pr-10 rounded-2xl border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:placeholder-transparent placeholder-black"
                    />
                    <button
                        type="submit"
                        className="border-l-2 border-l-gray-100 absolute right-1 sm:right-28 top-1/2 transform -translate-y-1/2 p-2 bg-transparent text-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Burger Menu Icon */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-black focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Buttons Section */}
            <div className="hidden md:flex w-[30%] md:w-[30%] h-full space-x-2 sm:space-x-4 justify-end items-center text-black font-bold pr-5">
                {showButtons && (
                    <>
                        {!isAuthenticated ? (
                            <>
                                <HeaderButton
                                    to="/login"
                                    onClick={() => setShowButtons(false)}
                                    color="bg-orange-500 text-white hover:bg-orange-600"
                                >
                                    Login
                                </HeaderButton>
                                <HeaderButton
                                    to="/register"
                                    onClick={() => setShowButtons(false)}
                                    color="bg-black text-white hover:bg-gray-800"
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
                                    Profile
                                </button>
                                {menuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={toggleMenu}
                                        >
                                            View Profile
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

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center z-40">
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
        </div>
    );
};

export default Header;