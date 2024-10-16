import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SavedOutfitsScreen from './SavedOutfitsScreen';
import MainSection from './MainProfileSection';
import Sidebar from './ProfileSidebar';
import Settings from './Settings';
import FriendList from './FriendList';

const ProfileScreen = () => {
    const [selectedSection, setSelectedSection] = useState('main');
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedSection('main');
    }, []);

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost/sanctum/csrf-cookie');
            await axios.post('http://localhost/logout', {}, {
                headers: {
                    'Accept':'application/json',
                }
            });
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed. Please try again.');
        }
    };

    return (
        <div className="w-full h-full flex flex-row">
            <Sidebar
                handleSectionChange={handleSectionChange}
                handleLogout={handleLogout}
            />
            <div className="w-[80%] h-full p-5">
                {selectedSection === 'main' && <MainSection />}
                {selectedSection === 'savedOutfits' && <SavedOutfitsScreen />}
                {selectedSection === 'Friends' && <FriendList />}
                {selectedSection === 'settings' && <Settings />}
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