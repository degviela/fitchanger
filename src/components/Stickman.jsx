import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BackButton from './Utilities/Buttons/BackButton';

const OutfitCreation = () => {
    const [skinColor, setSkinColor] = useState('#FAD7B5'); // Default skin tone
    const [selectedClothes, setSelectedClothes] = useState({
        head: '',
        top: '',
        bottom: '',
        footwear: ''
    });
    const [clothesOptions, setClothesOptions] = useState({
        head: [],
        top: [],
        bottom: [],
        footwear: []
    });
    const [outfitName, setOutfitName] = useState('');
    const [userId, setUserId] = useState(null);

    const skinTones = [
        { name: 'Light', color: '#FAD7B5' },
        { name: 'Medium Light', color: '#FFDAB9' },
        { name: 'Medium', color: '#D2A679' },
        { name: 'Medium Dark', color: '#A67B5B' },
        { name: 'Dark', color: '#8D5524' }
    ];

    const API_URL = process.env.REACT_APP_API_URL;
    const AUTH_URL = process.env.REACT_APP_AUTH_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${AUTH_URL}/user`, {
                    headers: {
                        'Accept': 'application/json',
                    },
                    withCredentials: true
                });
                setUserId(response.data.id);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        const fetchClothes = async () => {
            try {
                const response = await axios.get(`${API_URL}/clothingitems`, {
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const clothes = response.data;

                const sortedClothes = {
                    head: clothes.filter(item => item.type === 'head'),
                    top: clothes.filter(item => item.type === 'top'),
                    bottom: clothes.filter(item => item.type === 'bottom'),
                    footwear: clothes.filter(item => item.type === 'footwear')
                };

                setClothesOptions(sortedClothes);
            } catch (error) {
                console.error('Failed to fetch clothing items:', error);
            }
        };

        fetchUserData();
        fetchClothes();
    }, []);

    const handleClothingSelect = (part, item) => {
        setSelectedClothes((prev) => ({
            ...prev,
            [part]: prev[part] === item ? '' : item
        }));
    };

    const getImageUrl = (path) => {
        return `${AUTH_URL}/storage/${path}`;
    };

    const handleSaveOutfit = async () => {
        const clothingItems = Object.keys(selectedClothes).map(part => ({
            type: part,
            id: selectedClothes[part] ? selectedClothes[part].id : null
        })).filter(item => item.id !== null);

        const outfitData = {
            user_id: userId,
            name: outfitName,
            clothing_items: clothingItems
        };

        try {
            await axios.post(`${API_URL}/outfits`, outfitData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Outfit saved successfully!');
        } catch (error) {
            console.error('Failed to save outfit:', error);
            toast.error('Failed to save outfit. Please try again.');
        }
    };

    return (
        <div className="w-screen h-auto min-h-screen bg-white flex flex-col lg:flex-row justify-center items-center dark:bg-gray-900 overflow-x-hidden">
            <div className="absolute top-4 left-4 z-10">
                <BackButton to="/profile" />
            </div>

            {/* Left: Avatar */}
            <div className="w-full lg:w-1/2 h-auto flex flex-col justify-center items-center p-4 mt-10 md:mt-2">
                <div className="mb-4 flex flex-wrap gap-2 justify-center">
                    {skinTones.map((tone) => (
                        <button
                            key={tone.name}
                            onClick={() => setSkinColor(tone.color)}
                            className="w-10 h-10 rounded-full border-2 dark:border-white"
                            style={{ backgroundColor: tone.color }}
                            title={tone.name}
                        ></button>
                    ))}
                </div>

                <div className="w-[300px] h-auto relative flex flex-col justify-center items-center">
                    <div className="w-full h-auto flex justify-center items-end relative">
                        <div id="head" className="w-[140px] h-[140px] rounded-full" style={{ backgroundColor: skinColor }}></div>
                        {selectedClothes.head && (
                            <img
                                src={getImageUrl(selectedClothes.head.image_path)}
                                alt="Headwear"
                                className="absolute top-[-20px] w-[160px] h-[90px]"
                            />
                        )}
                    </div>

                    <div className="w-full h-auto flex justify-center items-start relative">
                        <div id="leftarm" className="w-[50px] h-[200px]" style={{ backgroundColor: skinColor }}></div>
                        <div id="torso" className="w-[150px] h-[200px]" style={{ backgroundColor: skinColor }}></div>
                        <div id="rightarm" className="w-[50px] h-[200px]" style={{ backgroundColor: skinColor }}></div>
                        {selectedClothes.top && (
                            <img
                                src={getImageUrl(selectedClothes.top.image_path)}
                                alt="Top"
                                className="absolute top-[0] w-[250px] h-[200px]"
                            />
                        )}
                    </div>

                    <div className="w-full h-auto flex justify-center items-start relative">
                        <div className="h-[150px] w-[150px] flex">
                            <div id="leftleg" className="h-[150px] w-[75px]" style={{ backgroundColor: skinColor }}></div>
                            <div id="rightleg" className="h-[150px] w-[75px]" style={{ backgroundColor: skinColor }}></div>
                        </div>
                        {selectedClothes.bottom && (
                            <img
                                src={getImageUrl(selectedClothes.bottom.image_path)}
                                alt="Bottom"
                                className="absolute top-0 w-[150px] h-[150px]"
                            />
                        )}
                    </div>

                    <div className="w-full h-auto flex justify-center items-end relative">
                        <div className="h-[20px] w-[150px]" style={{ backgroundColor: skinColor }}></div>
                        {selectedClothes.footwear && (
                            <img
                                src={getImageUrl(selectedClothes.footwear.image_path)}
                                alt="Footwear"
                                className="absolute w-[150px] h-[20px]"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-1/2 h-auto p-4 flex flex-col justify-center items-center">
                <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto rounded-2xl shadow-lg bg-white dark:bg-black dark:bg-opacity-10">
                    <div className="w-full py-4 border-black flex justify-center items-center">
                        <h1 className="font-bold text-2xl sm:text-3xl">Clothes</h1>
                    </div>

                        {['head', 'top', 'bottom', 'footwear'].map((part) => (
                            <div key={part} className="mb-4">
                                <h2 className="font-semibold capitalize">{part}:</h2>
                                <div className="flex flex-wrap gap-2">
                                    {clothesOptions[part].map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={() => handleClothingSelect(part, item)}
                                            className={`p-2 rounded ${
                                                selectedClothes[part] === item
                                                    ? 'bg-blue-500 dark:bg-green-400 text-white dark:text-black'
                                                    : 'bg-gray-200 dark:text-black'
                                            }`}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

    );
};

export default OutfitCreation;