import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [clothingItems, setClothingItems] = useState({});
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/${id}`);
                const userData = response.data;
                setUser(userData);

                const clothingIds = new Set();
                userData.outfits.forEach(outfit => {
                    if (outfit.head_id) clothingIds.add(outfit.head_id);
                    if (outfit.top_id) clothingIds.add(outfit.top_id);
                    if (outfit.bottom_id) clothingIds.add(outfit.bottom_id);
                    if (outfit.footwear_id) clothingIds.add(outfit.footwear_id);
                });

                await fetchClothingItems([...clothingIds]);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchClothingItems = async (ids) => {
            try {
                const items = {};
                await Promise.all(
                    ids.map(async (id) => {
                        const res = await axios.get(`${API_URL}/clothingitems/${id}`);
                        items[id] = res.data;
                    })
                );
                setClothingItems(items);
            } catch (error) {
                console.error('Failed to fetch clothing items:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const getImageUrl = (imagePath) => `http://localhost/storage/${imagePath}`;

    if (loading)
        return (
            <div className="p-8 text-xl text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 min-h-screen">
                Loading...
            </div>
        );

    if (!user)
        return (
            <div className="p-8 text-xl text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 min-h-screen">
                User not found.
            </div>
        );

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-5 mt-[6%]">
            <img
                src={user.profilePicture || '/images/defaultprofilepic.jpg'}
                alt={`${user.username}'s profile`}
                className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {user.username}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Saved Outfits: {user.outfits.length}
            </p>

            {user.outfits.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
                    {user.outfits.map((outfit) => (
                        <div
                            key={outfit.id}
                            className="relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md group"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                {outfit.name}
                            </h3>
                            <div className="grid grid-cols-2 grid-rows-2 gap-2">
                                {clothingItems[outfit.head_id] && (
                                    <img
                                        src={getImageUrl(clothingItems[outfit.head_id].image_path)}
                                        alt="Head"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                                {clothingItems[outfit.top_id] && (
                                    <img
                                        src={getImageUrl(clothingItems[outfit.top_id].image_path)}
                                        alt="Top"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                                {clothingItems[outfit.bottom_id] && (
                                    <img
                                        src={getImageUrl(clothingItems[outfit.bottom_id].image_path)}
                                        alt="Bottom"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                                {clothingItems[outfit.footwear_id] && (
                                    <img
                                        src={getImageUrl(clothingItems[outfit.footwear_id].image_path)}
                                        alt="Footwear"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No outfits to show.</p>
            )}
        </div>
    );
};

export default UserProfile;
