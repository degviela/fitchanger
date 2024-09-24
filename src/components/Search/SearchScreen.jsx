import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import usersData from '../../data/users.json'; // Import users JSON

// Helper function to get query params
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchScreen = () => {
    const query = useQuery();
    const searchQuery = query.get('query') || ''; // Get the search query from URL
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        // Filter users based on search query
        const results = usersData.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchQuery]);

    return (
        <div className="flex flex-col items-center w-full h-[90%] bg-gray-100">
            <h1 className="text-3xl font-bold mt-10">Search Results</h1>

            {/* Search Results */}
            <div className="mt-10 w-[80%] sm:w-[60%] bg-white rounded-lg shadow-lg p-5">
                {filteredUsers.length > 0 ? (
                    <div className="flex flex-col space-y-4">
                        {filteredUsers.map((user) => (
                            <Link
                                key={user.id}
                                to={`/user/${user.id}`} // Link to user details page
                                className="p-4 border rounded-lg bg-gray-50 shadow hover:shadow-lg transition duration-300 ease-in-out"
                            >
                                <p className="text-xl font-semibold text-orange-600 mb-2">
                                    {user.username}
                                </p>
                                <p className="text-gray-700">
                                    <strong>ID:</strong> {user.id}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        {searchQuery ? 'No users found.' : 'Please enter a search query.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchScreen;
