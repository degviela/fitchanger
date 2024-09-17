import React from 'react';

const LandingPageSecondScreen = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center bg-gray-100">
            {/* Upper Section with Title and Tagline */}
            <div className="w-full h-[50%] flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                    FitChanger
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Style your 2D character with the latest fashion trends. Save your creations privately or share them with the world!
                </p>
            </div>

            {/* Feature Section with Grid Layout */}
            <div className="w-full h-[50%] grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-6 bg-white">
                {/* Style Your Character */}
                <div className="flex flex-col justify-center items-center p-4 border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                    <div className="bg-orange-400 text-white p-4 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">Style Your Character</h3>
                    <p className="text-center text-gray-500">
                        Customize your 2D character with a wide range of clothing and accessories.
                    </p>
                </div>

                {/* Save or Share Your Styles */}
                <div className="flex flex-col justify-center items-center p-4 border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                    <div className="bg-green-500 text-white p-4 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">Save or Share</h3>
                    <p className="text-center text-gray-500">
                        Save your outfits privately or share them with the community for inspiration.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPageSecondScreen;
