import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FeaturedOutfits from './FeaturedOutfits';
import { getCSRFToken } from "../Utilities/csrf";
import { toast } from 'react-toastify';

const MainProfileSection = ({ user, onUsernameUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [outfits, setOutfits] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // To show preview of the image before upload
    const [showModal, setShowModal] = useState(false); // For showing image upload modal

    const fileInputRef = useRef(null); // Reference to the file input
    const API_URL = process.env.REACT_APP_API_URL;
    const AUTH_URL = process.env.REACT_APP_AUTH_URL;

    // Fetch user data and set initial states
    useEffect(() => {
        if (user) {
            setNewUsername(user.username);
            setImageUrl(user.profile_picture ? `${AUTH_URL}/storage/${user.profile_picture}` : '/images/defaultprofilepic.jpg');
        }
    }, [user]);

    // Fetch outfits when user is available
    useEffect(() => {
        if (!user) return;

        const fetchOutfits = async () => {
            try {
                const response = await axios.get(`${API_URL}/outfits`, {
                    params: { user_id: user.id },
                    headers: { 'Accept': 'application/json' },
                    withCredentials: true
                });
                setOutfits(response.data);
            } catch (error) {
                console.error('Failed to fetch outfits:', error);
            }
        };

        fetchOutfits();
    }, [API_URL, user]);

    // Username editing functions
    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = async () => {
        try {
            await getCSRFToken();
            await axios.put(`${AUTH_URL}/profile/update`, { username: newUsername }, {
                headers: { 'Accept': 'application/json' },
                withCredentials: true,
            });
            onUsernameUpdate(newUsername);
            setIsEditing(false);
            toast.success('Username updated successfully!');
        } catch (error) {
            console.error('Failed to update username:', error);
        }
    };

    const handleCancelClick = () => {
        setNewUsername(user.username);
        setIsEditing(false);
    };

    const handleInputChange = (e) => setNewUsername(e.target.value);

    // Profile picture upload functions
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfilePictureClick = async () => {
        const file = fileInputRef.current?.files[0];

        if (!file) {
            alert('Please select a file.');
            return;
        }
        console.log(file);

        try {
            await getCSRFToken();

            const formData = new FormData();
            formData.append('profile_picture', file);

            const response = await axios.post(`${AUTH_URL}/profile/update-picture`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const updatedUser = response.data.user;
            if (updatedUser.profile_picture) {
                setImageUrl(`${AUTH_URL}/storage/${updatedUser.profile_picture}`);
            }

            setPreviewImage(null);
            setShowModal(false);
            toast.success('Profile picture updated successfully!');
        } catch (error) {
            console.error('Failed to update profile picture:', error.response ? error.response.data : error.message);
        }
    };

    const handleProfilePictureClick = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            {/* Profile Section */}
            <div className="flex items-center pt-14">
                {/* Avatar */}
                <div className="relative group w-48 h-48 cursor-pointer" onClick={handleProfilePictureClick}>
                    <img
                        src={imageUrl || "/images/defaultprofilepic.jpg"}
                        alt="Profile"
                        className="w-full h-full rounded-full border-3 border-gray-300 object-cover transition-opacity duration-300 group-hover:opacity-50"
                    />
                    {/* Hover SVG Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        </svg>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-l-4 border-gray-400 h-48 mx-4"></div>

                {/* Username */}
                <div>
                    {isEditing ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={newUsername}
                                onChange={handleInputChange}
                                className="text-5xl rounded-xl font-bold border-b-2 border-gray-300 focus:outline-none dark:text-black"
                            />
                            <button onClick={handleSaveClick} className="ml-2 p-2 bg-green-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </button>
                            <button onClick={handleCancelClick} className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <h2 className="text-5xl font-bold">{user?.username ?? 'Loading...'}</h2>
                            <button onClick={handleEditClick} className="ml-2 p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Featured Outfits */}
            <FeaturedOutfits outfits={outfits} userId={user.id} />

            {/* Profile Picture Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg dark:bg-gray-800">
                        <h3 className="text-2xl mb-4">Upload New Profile Picture</h3>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="mb-4"
                        />
                        {previewImage && <img src={previewImage} alt="Preview" className="w-48 h-48 object-cover mb-4" />}
                        <div>
                            <button
                                onClick={handleSaveProfilePictureClick}
                                className="mr-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainProfileSection;
