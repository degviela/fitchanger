import React, { useState } from 'react';

const AddFriend = ({ onAddFriend, onClose }) => {
    const [username, setUsername] = useState('');

    const handleAddFriend = () => {
        onAddFriend(username);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add Friend</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full p-2 border rounded-lg mb-4"
                />
                <div className="flex justify-between space-x-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddFriend}
                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFriend;