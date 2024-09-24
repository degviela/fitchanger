import React from 'react';
import { useParams } from 'react-router-dom';
import usersData from '../../data/users.json'; // Import users JSON

const UserDetailScreen = () => {
    const { id } = useParams(); // Get user ID from URL params
    const user = usersData.find((user) => user.id === parseInt(id)); // Find the user by ID

    if (!user) {
        return <p className="text-gray-500">User not found.</p>;
    }

    return (
        <div className="flex flex-col items-center w-full h-[90%] bg-gray-100">
            <h1 className="text-3xl font-bold mt-10">User Details</h1>
            <div className="mt-10 w-[80%] sm:w-[60%] bg-white rounded-lg shadow-lg p-5">
                <p className="text-xl font-semibold text-orange-600 mb-2">
                    {user.username}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>ID:</strong> {user.id}
                </p>
                <p className="text-gray-700">
                    <strong>Email:</strong> {user.email}
                </p>
            </div>
        </div>
    );
};

export default UserDetailScreen;
