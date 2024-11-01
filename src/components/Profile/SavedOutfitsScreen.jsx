import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavedOutfitsScreen = ({ userId }) => {
    const [savedOutfits, setSavedOutfits] = useState([]);
    const [clothingItems, setClothingItems] = useState({});

    useEffect(() => {
        const fetchSavedOutfits = async () => {
            try {
                const response = await axios.get(`http://localhost/api/authenticated/outfits/user/${userId}`);
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
                    const response = await axios.get(`http://localhost/api/authenticated/clothingitems/${id}`);
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

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Saved Outfits</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedOutfits.map(outfit => (
                    <div key={outfit.id} className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 min-w-[370px]">
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
    );
};

export default SavedOutfitsScreen;