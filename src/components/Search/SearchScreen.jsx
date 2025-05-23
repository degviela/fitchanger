import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchScreen = () => {
    const query = useQuery();
    const searchQuery = query.get('query') || '';
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/users/search?query=${encodeURIComponent(searchQuery)}`);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchUsers();
        } else {
            setFilteredUsers([]);
            setLoading(false);
        }
    }, [searchQuery]);

    return (
        <div className="flex flex-col items-center w-full h-[90%] bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <h1 className="text-3xl font-bold mt-10 text-black dark:text-white">Search Results</h1>

            <div className="mt-10 w-[80%] sm:w-[60%] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
                {loading ? (
                    <p className="text-gray-600 dark:text-gray-300">Loading...</p>
                ) : filteredUsers.length > 0 ? (
                    <div className="flex flex-col space-y-4">
                        {filteredUsers.map((user) => (
                            <Link
                                key={user.id}
                                to={`/user/${user.id}`}
                                className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 shadow hover:shadow-lg transition duration-300 ease-in-out"
                            >
                                <p className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-2">
                                    {user.username}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>ID:</strong> {user.id}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                        {searchQuery ? 'No users found.' : 'Please enter a search query.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchScreen;
