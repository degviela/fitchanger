import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from "../Utilities/Buttons/BackButton";

const ClothingItemsPage = () => {
    const [clothingItems, setClothingItems] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;
    const AUTH_URL = process.env.REACT_APP_AUTH_URL;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${API_URL}/clothingitems`, {
                    withCredentials: true,
                });
                setClothingItems(response.data);
            } catch (error) {
                console.error('Error fetching clothing items:', error);
            }
        };

        fetchItems();
    }, [API_URL]);

    const getImageUrl = (imagePath) => {
        return `${AUTH_URL}/storage/${imagePath}`;
    };

    return (
        <div className="pt-32 min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            {/* Header with BackButton and Title */}
            <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <BackButton to = "/profile" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center flex-grow">
                    All Clothing Items
                </h1>
                <div className="w-12" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {clothingItems.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
                        <img
                            src={getImageUrl(item.image_path)}
                            alt={item.name}
                            className="w-full h-60 object-contain mb-4 rounded"
                        />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{item.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClothingItemsPage;
