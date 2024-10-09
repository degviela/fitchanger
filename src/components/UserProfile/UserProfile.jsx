import React from 'react';
import { useParams } from 'react-router-dom';
import usersData from '../../data/users.json';

const UserProfile = () => {
    const { id } = useParams(); // Get user ID from URL params
    const user = usersData.find((user) => user.id === parseInt(id)); // Find the user by ID

    if (!user) {
        return <p className="text-gray-500">User not found.</p>;
    }

    return (
        <div className="flex flex-col items-center w-full h-full bg-gray-100 p-5 mt-[6%]">
            <img
                src={user.profilePicture}
                alt={`${user.username}'s profile`}
                className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.username}</h2>
            <p className="text-lg text-gray-600">
                Saved Outfits: {user.savedOutfitsCount}
            </p>
        </div>
    );
};

export default UserProfile;