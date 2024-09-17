import React from 'react';
import {Link} from "react-router-dom"; // Replace with the correct image path

const LandingPageThirdScreen = () => {
    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Background Image */}
            <img src="/images/clothingrack2.jpg" alt="background" className="w-full h-full object-cover" />

            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Text Content on Top of Image */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Discover Endless Styles</h1>
                <p className="text-lg text-gray-300 max-w-lg">
                    FitChanger allows you to experiment with different outfits and share your creations with others. Let your imagination run wild and create your perfect look!
                </p>
                <Link to = "/demo">
                <button className="mt-8 px-6 py-3 bg-orange-500 text-white text-lg rounded-full hover:bg-orange-600 transition duration-300">
                    Try out Demo
                </button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPageThirdScreen;
