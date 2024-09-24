import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [showButtons, setShowButtons] = useState(true);
    const location = useLocation();
    const navigate = useNavigate(); // To navigate to search screen
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Hide buttons on login, register, and profile pages
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Navigate to SearchScreen with the search query as a query string
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
            setSearchQuery(''); // Clear the search bar after submission
        }
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
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className=" bg-transparent text-orange-500 max-w-[80%] sm:w-[70%] p-2 rounded-3xl border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:placeholder-transparent placeholder-orange-500"
                    />
                    <button
                        type="submit"
                        className="cursor-pointer ml-2 p-2 bg-orange-500 text-white rounded-3xl hover:bg-orange-600 transition duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Buttons Section */}
            {showButtons && (
                <div className="flex w-[30%] md:w-[30%] h-[100%] space-x-2 sm:space-x-4 justify-end items-center text-black font-bold">
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
