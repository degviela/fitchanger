import React from 'react';

const FriendList = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Friends</h2>
            <ul className="space-y-4">
                {/* Example friend items */}
                <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
                    <span className="text-lg dark:text-white">Friend 1</span>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">Remove</button>
                </li>
                <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
                    <span className="text-lg dark:text-white">Friend 2</span>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">Remove</button>
                </li>
            </ul>
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Add Friend</button>
        </div>
    );
};

export default FriendList;