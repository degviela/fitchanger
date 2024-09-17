import React from 'react';

const LandingPageFirstScreen = () => {
    return (
        <div className="relative w-screen h-screen overflow-hidden shadow-xl">
            {/* Image */}
            <img src="/images/clothingrack.jpeg" alt="clothingrack" className="w-full h-full object-cover" />

            {/* Dark overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Text content */}
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <h1 className="text-white text-6xl font-bold">Welcome to FitChanger</h1>
            </div>
        </div>
    );
};

export default LandingPageFirstScreen;
