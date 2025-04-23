import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavedOutfitsScreen = ({ userId }) => {
    const [savedOutfits, setSavedOutfits] = useState([]);
    const [clothingItems, setClothingItems] = useState({});

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchSavedOutfits = async () => {
            try {
                const response = await axios.get(`${API_URL}/outfits/user/${userId}`);
                setSavedOutfits(response.data);
                const clothingIds = new Set();
                response.data.forEach(outfit => {
                    clothingIds.add(outfit.head_id);
                    clothingIds.add(outfit.top_id);
                    clothingIds.add(outfit.bottom_id);
                    clothingIds.add(outfit.footwear_id);
                });
                await fetchClothingItems([...clothingIds]);
            } catch (error) {
                console.error('Failed to fetch saved outfits:', error);
            }
        };

        const fetchClothingItems = async (ids) => {
            try {
                const items = {};
                await Promise.all(ids.map(async (id) => {
                    const response = await axios.get(`${API_URL}/clothingitems/${id}`);
                    items[id] = response.data;
                }));
                setClothingItems(items);
            } catch (error) {
                console.error('Failed to fetch clothing items:', error);
            }
        };

        fetchSavedOutfits();
    }, [userId]);

    const getImageUrl = (imagePath) => {
        return `http://localhost/storage/${imagePath}`;
    };

    const handleEdit = (outfitId) => {
        console.log(`Edit outfit with ID: ${outfitId}`);
        // Add your edit logic here
    };

    const handleDelete = (outfitId) => {
        console.log(`Delete outfit with ID: ${outfitId}`);
        // Add your delete logic here
    };

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="pt-8 pl-8 text-4xl font-bold mb-4">Saved Outfits</h2>

            <div className="pl-8 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-[80vh] overflow-y-auto">
                {savedOutfits.map(outfit => (
                    <div
                        key={outfit.id}
                        className="relative dark:bg-black dark:bg-opacity-20 bg-white rounded-lg p-4 shadow-md transition duration-300 transform hover:shadow-lg min-w-[370px] group"
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
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-4">
                            <button
                                onClick={() => handleEdit(outfit.id)}
                                className="w-12 h-12 border border-white rounded-md flex justify-center items-center hover:bg-blue-600 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-6 h-6 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.5 1.5 1.5-4.5L16.862 3.487z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDelete(outfit.id)}
                                className="w-12 h-12 border border-white rounded-md flex justify-center items-center hover:bg-red-600 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedOutfitsScreen;