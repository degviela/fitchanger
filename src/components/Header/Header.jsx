import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [showButtons, setShowButtons] = useState(true);
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Hide buttons on login and register pages
        if (location.pathname === '/login' || location.pathname === '/register') {
            setShowButtons(false);
        } else {
            setShowButtons(true);
        }
    }, [location]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        // Add your search logic here
    };

    return (
        <div className="p-5 w-full h-[10%] text-black flex justify-between items-center bg-transparent fixed top-0 z-50">
            {/* Logo Section */}
            <div className="w-[20%] h-[100%] flex justify-start items-center">
                <Link to="/">
                    <button className="w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] h-full">
                        <img className="w-full h-full object-contain" src="/images/fitchangerlogo3.png" alt="logo" />
                    </button>
                </Link>
            </div>

            {/* Search Bar Section */}
            <div className="flex-grow md:w-[35%] h-[100%] flex justify-center items-center">
                <form onSubmit={handleSearchSubmit} className="w-full flex justify-center">
                    <input
                        type="text"
                        placeholder="Search styles..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-[80%] sm:w-[70%] p-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                        type="submit"
                        className="ml-2 p-2 bg-orange-500 text-white rounded-3xl hover:bg-orange-600 transition duration-300"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Buttons Section */}
            {showButtons && (
                <div className="flex w-[30%] md:w-[20%] h-[100%] space-x-2 sm:space-x-4 justify-end items-center text-black font-bold">
                    <Link
                        to="/login"
                        onClick={() => setShowButtons(false)}
                        className="flex justify-center p-2 sm:p-3 bg-transparent w-[40%] sm:w-[30%] text-orange-500 rounded-3xl border-orange-500 border-2 hover:transition hover:ease-in-out hover:bg-orange-500 hover:text-white text-xs sm:text-sm md:text-base"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        onClick={() => setShowButtons(false)}
                        className="flex justify-center p-2 sm:p-3 bg-transparent w-[40%] sm:w-[30%] rounded-3xl border-black border-2 hover:transition hover:ease-in-out hover:bg-black hover:text-white text-xs sm:text-sm md:text-base"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
