import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SavedOutfitsScreen from './SavedOutfitsScreen';
import MainSection from './MainProfileSection';
import Sidebar from './ProfileSidebar';
import Settings from './Settings';
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
    const nodeRef = React.useRef(null);

    const AUTH_URL = process.env.REACT_APP_AUTH_URL;
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
                console.log('Logged-in user:', response.data); // Log the user data
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
            await axios.get(`${AUTH_URL}/sanctum/csrf-cookie`);
            await axios.post(`${AUTH_URL}/logout`, {}, {
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
                            {
                                selectedSection === 'main' && user &&
                                <MainSection user={user.user} onUsernameUpdate={(newUsername) =>
                                {
                                setUser(prev => ({
                                    ...prev,
                                    user: {
                                        ...prev.user,
                                        username: newUsername
                                    }
                                    }));
                            }} />
                            }
                            {selectedSection === 'savedOutfits' && user && <SavedOutfitsScreen userId={user.user.id} />}
                            {selectedSection === 'settings' && <Settings />}
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