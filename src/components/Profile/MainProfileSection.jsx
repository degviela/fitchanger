import React from 'react';

const MainProfileSection = () => {
    return (
        <div>
            <div className="flex items-center pt-14">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="w-48 h-48 rounded-full border-3 border-gray-300 mr-4"
                />
                <div className="border-l-2 border-gray-300 h-48 mx-4"></div>
                <div>
                    <h2 className="text-5xl font-bold">sqlnt</h2>
                    <div className="mt-4">
                        <p className="text-lg">Friends: 9</p>
                        <p className="text-lg">Outfits: 45</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainProfileSection;