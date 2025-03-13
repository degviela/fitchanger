import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SavedOutfitsScreen from './SavedOutfitsScreen';
import MainSection from './MainProfileSection';
import Sidebar from './ProfileSidebar';
import Settings from './Settings';
import AllClothesCatalog from './AllClothesCatalog'; // Import the new component
import './ProfileScreen.css';
import {toast} from "react-toastify";

const ProfileScreen = () => {
    const [selectedSection, setSelectedSection] = useState('main');
    const [friends, setFriends] = useState([
        { name: 'Alko/hols' },
        { name: 'Trakais' },
    ]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/user`, {
                    headers: {
                        'Accept': 'application/json',
                    },
                    withCredentials: true // Ensure cookies are sent with the request
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
        setSelectedSection('main');
    }, []);

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    const handleAddFriend = (username) => {
        setFriends([...friends, { name: username }]);
    };

    const handleLogout = async () => {
        try {
            await axios.get(`${API_URL}/sanctum/csrf-cookie`);
            await axios.post(`${API_URL}/logout`, {}, {
                headers: {
                    'Accept':'application/json',
                },
                withCredentials: true
            });
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again.');
        }
    };

    return (
        <div className="w-[full] h-full flex overflow-hidden">
            <Sidebar
                handleSectionChange={handleSectionChange}
                handleLogout={handleLogout}
            />
            <div className="w-[80%] h-full p-5 flex">
                <TransitionGroup>
                    <CSSTransition
                        key={selectedSection}
                        timeout={300}
                        classNames="fade"
                    >
                        <div>
                            {selectedSection === 'main' && <MainSection user={user} />}
                            {selectedSection === 'savedOutfits' && user && <SavedOutfitsScreen userId={user.id} />}{selectedSection === 'settings' && <Settings />}
                            {selectedSection === 'clothingCatalog' && <AllClothesCatalog />} {/* Add the new section */}
                            {!selectedSection && (
                                <div>
                                    <h2 className="text-xl text-gray-500">Select a menu option</h2>
                                </div>
                            )}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
    );
};

export default ProfileScreen;