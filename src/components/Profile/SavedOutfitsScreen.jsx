import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavedOutfitsScreen = ({ userId }) => {
    const [savedOutfits, setSavedOutfits] = useState([]);

    useEffect(() => {
        const fetchSavedOutfits = async () => {
            try {
                const response = await axios.get(`http://localhost/api/authenticated/outfits/user/${userId}`);
                setSavedOutfits(response.data);
            } catch (error) {
                console.error('Failed to fetch saved outfits:', error);
            }
        };

        fetchSavedOutfits();
    }, [userId]);

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Saved Outfits</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedOutfits.map(outfit => (
                    <div key={outfit.id} className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
                        <img alt={outfit.name} className="w-full h-40 object-cover rounded-md mb-3" />
                        <h3 className="text-xl font-semibold mb-2">{outfit.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedOutfitsScreen;