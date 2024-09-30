import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios
import SavedOutfits from "./SavedOutfits";

const ProfileScreen = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    const handleLogout = async () => {
        try {
            // Make a POST request to the logout endpoint
            await axios.post('http://localhost/api/logout', {}, {
                withCredentials: true,
                headers: {
                    'Accept':'application/json',
                }

            });
            // After logging out, redirect to the login page
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally, handle error notification
            alert('Logout failed. Please try again.');
        }
    };

    return (
        <div className="w-full h-[90%] flex flex-row">
            <div className="w-[20%] h-full bg-gray-100 flex flex-col items-center p-5">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>

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

                <div className="flex-grow"></div>

                <button
                    onClick={handleLogout} // Attach the logout handler
                    className="w-full p-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                    Logout
                </button>
            </div>

            <div className="w-[80%] h-full p-5">
                {selectedSection === 'savedOutfits' && (
                    <SavedOutfits />
                )}

                {selectedSection === 'settings' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Settings</h2>
                        <p>Here you can change your settings.</p>
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
