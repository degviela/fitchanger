import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedOutfits = ({ userId }) => {
    const [featuredOutfits, setFeaturedOutfits] = useState([]);
    const [clothingItems, setClothingItems] = useState({});

    const API_URL = process.env.REACT_APP_API_URL;
    const AUTH_URL = process.env.REACT_APP_AUTH_URL;

    useEffect(() => {
        const fetchFeaturedOutfits = async () => {
            try {
                const response = await axios.get(`${API_URL}/outfits/user/${userId}`);
                setFeaturedOutfits(response.data);
                const clothingIds = new Set();
                response.data.forEach(outfit => {
                    clothingIds.add(outfit.head_id);
                    clothingIds.add(outfit.top_id);
                    clothingIds.add(outfit.bottom_id);
                    clothingIds.add(outfit.footwear_id);
                });
                await fetchClothingItems([...clothingIds]);
            } catch (error) {
                console.error('Failed to fetch featured outfits:', error);
            }
        };

        const fetchClothingItems = async (ids) => {
            try {
                const items = {};
                const responses = await Promise.all(ids.map(id => axios.get(`${API_URL}/clothingitems/${id}`)));
                responses.forEach(response => {
                    items[response.data.id] = response.data;
                });
                setClothingItems(items);
            } catch (error) {
                console.error('Failed to fetch clothing items:', error);
            }
        };

        fetchFeaturedOutfits();
    }, [userId]);

    const getImageUrl = (imagePath) => {
        return `${AUTH_URL}/storage/${imagePath}`;
    };

    return (
        <div className="w-full flex flex-col px-8 pt-8">
            {/* Static Header */}
            <h2 className="text-4xl font-bold mb-4">Featured Outfits</h2>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(100vh-370px)] pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredOutfits.map(outfit => (
                        <div
                            key={outfit.id}
                            className="dark:bg-black dark:bg-opacity-20 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 min-w-[370px]"
                        >
                            <h3 className="text-xl font-semibold mb-2">{outfit.name}</h3>
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
            </div>
        </div>
    );
};

export default FeaturedOutfits;
