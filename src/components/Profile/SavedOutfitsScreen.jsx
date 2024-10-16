import React, { useState, useEffect } from 'react';
import savedOutfitsData from '../../data/SavedOutfits.json'; // Adjust the path based on your structure

const SavedOutfitsScreen = () => {
    const [savedOutfits, setSavedOutfits] = useState([]);

    useEffect(() => {
        // Set the data from the imported JSON file
        setSavedOutfits(savedOutfitsData);
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Saved Outfits</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedOutfits.map(outfit => (
                    <div key={outfit.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
                        <img src={outfit.image} alt={outfit.name} className="w-full h-40 object-cover rounded-md mb-3" />

                        <h3 className="text-xl font-semibold mb-2">{outfit.name}</h3>

                        <p className="text-gray-600">{outfit.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedOutfitsScreen;
