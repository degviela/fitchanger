import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SavedOutfits from "./SavedOutfits";

const ProfileScreen = () => {
    // State to track the selected section
    const [selectedSection, setSelectedSection] = useState('');

    // Function to handle section changes
    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    return (
        <div className="w-full h-[90%] flex flex-row">
            {/* Sidebar Section */}
            <div className="w-[20%] h-full bg-gray-100 flex flex-col items-center p-5">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>

                {/* Sidebar Links */}
                <ul className="space-y-4 w-full">
                    <li>
                        <button
                            onClick={() => handleSectionChange('savedOutfits')}
                            className="block w-full p-2 rounded-lg text-black hover:bg-orange-500 hover:text-white transition duration-300"
                        >
                            Saved Outfits
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleSectionChange('settings')}
                            className="block w-full p-2 rounded-lg text-black hover:bg-orange-500 hover:text-white transition duration-300"
                        >
                            Settings
                        </button>
                    </li>
                </ul>

                {/* Spacer to push the logout button to the bottom */}
                <div className="flex-grow"></div>

                {/* Logout Button */}
                <button className="w-full p-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                    Logout
                </button>
            </div>

            {/* Main Content Section */}
            <div className="w-[80%] h-full p-5">
                {selectedSection === 'savedOutfits' && (
                    <SavedOutfits />
                )}

                {selectedSection === 'settings' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Settings</h2>
                        <p>Here you can change your settings.</p>
                        {/* Add more content or components related to settings */}
                    </div>
                )}

                {!selectedSection && (
                    <div>
                        <h2 className="text-xl text-gray-500">Select a menu option</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileScreen;
