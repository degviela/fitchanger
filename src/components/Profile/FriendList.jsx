import React, { useState } from 'react';
import AddFriend from './AddFriend';

const FriendList = ({ friends, onAddFriend }) => {
    const [isAddFriendVisible, setIsAddFriendVisible] = useState(false);

    const handleAddFriendClick = () => {
        setIsAddFriendVisible(true);
    };

    const handleCloseAddFriend = () => {
        setIsAddFriendVisible(false);
    };

    return (
        <div className="p-6 bg-gray-300 rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold dark:text-white">Friends</h2>
                <button
                    onClick={handleAddFriendClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition duration-300 transform hover:scale-105"
                >
                    Add Friend
                </button>
            </div>
            <ul className="space-y-4">
                {friends.map((friend, index) => (
                    <li key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
                        <span className="text-lg dark:text-white">{friend.name}</span>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105">Remove</button>
                    </li>
                ))}
            </ul>
            {isAddFriendVisible && (
                <AddFriend onAddFriend={onAddFriend} onClose={handleCloseAddFriend} />
            )}
        </div>
    );
};

export default FriendList;