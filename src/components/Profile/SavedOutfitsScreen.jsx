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

   return (
       <div className="w-full h-full flex flex-col">
           <h2 className="pt-8 pl-8 text-4xl font-bold mb-4">Saved Outfits</h2>

           <div className="pl-8 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-[80vh] overflow-y-auto">
               {savedOutfits.map(outfit => (
                   <div key={outfit.id} className="dark:bg-black dark:bg-opacity-20 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 min-w-[370px]">
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