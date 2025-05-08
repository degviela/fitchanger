import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import BackButton from '../Utilities/Buttons/BackButton';

const EditOutfitScreen = () => {
    const { id } = useParams(); // outfit ID from URL
    const [skinColor, setSkinColor] = useState('#FAD7B5');
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

    const API_URL = process.env.REACT_APP_API_URL;
    const AUTH_URL = process.env.REACT_APP_AUTH_URL;

    const skinTones = [
        { name: 'Light', color: '#FAD7B5' },
        { name: 'Medium Light', color: '#FFDAB9' },
        { name: 'Medium', color: '#D2A679' },
        { name: 'Medium Dark', color: '#A67B5B' },
        { name: 'Dark', color: '#8D5524' }
    ];
    const navigate = useNavigate();

    const getImageUrl = (path) => {
        return `${AUTH_URL}/storage/${path}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`${AUTH_URL}/user`, {
                    headers: { 'Accept': 'application/json' },
                    withCredentials: true
                });
                setUserId(userResponse.data.id);

                const clothesResponse = await axios.get(`${API_URL}/clothingitems`, {
                    headers: { 'Accept': 'application/json' }
                });
                const clothes = clothesResponse.data;

                const sortedClothes = {
                    head: clothes.filter(item => item.type === 'head'),
                    top: clothes.filter(item => item.type === 'top'),
                    bottom: clothes.filter(item => item.type === 'bottom'),
                    footwear: clothes.filter(item => item.type === 'footwear')
                };
                setClothesOptions(sortedClothes);

                const outfitResponse = await axios.get(`${API_URL}/outfits/${id}`, {
                    headers: { 'Accept': 'application/json' }
                });
                const outfit = outfitResponse.data;

                setOutfitName(outfit.name);

                const selected = {
                    head: sortedClothes.head.find(item => item.id === outfit.head_id) || '',
                    top: sortedClothes.top.find(item => item.id === outfit.top_id) || '',
                    bottom: sortedClothes.bottom.find(item => item.id === outfit.bottom_id) || '',
                    footwear: sortedClothes.footwear.find(item => item.id === outfit.footwear_id) || ''
                };
                setSelectedClothes(selected);

            } catch (error) {
                console.error('Failed to fetch outfit or user data:', error);
                toast.error('Failed to load outfit.');
            }
        };

        fetchData();
    }, [id, API_URL, AUTH_URL]);

    const handleClothingSelect = (part, item) => {
        setSelectedClothes(prev => ({
            ...prev,
            [part]: prev[part] === item ? '' : item
        }));
    };

    const handleUpdateOutfit = async () => {
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
            await axios.put(`${API_URL}/outfits/${id}`, outfitData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Outfit updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Failed to update outfit:', error);
            toast.error('Failed to update outfit. Please try again.');
        }
    };

    return (
        <div className="w-screen min-h-screen bg-white flex flex-col lg:flex-row justify-center items-center dark:bg-gray-900 overflow-x-hidden">
            <div className="absolute top-4 left-4 z-10">
                <BackButton to="/profile" />
            </div>

            {/* Left Side: Avatar Preview */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 mt-10 md:mt-2">
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

                {/* Character Preview */}
                <div className="w-[300px] h-auto relative flex flex-col justify-center items-center">
                    {/* Head */}
                    <div className="w-full flex justify-center items-end relative">
                        <div id="head" className="w-[140px] h-[140px] rounded-full" style={{ backgroundColor: skinColor }}></div>
                        {selectedClothes.head && (
                            <img
                                src={getImageUrl(selectedClothes.head.image_path)}
                                alt="Headwear"
                                className="absolute top-[-20px] w-[160px] h-[90px]"
                            />
                        )}
                    </div>

                    {/* Torso */}
                    <div className="w-full flex justify-center items-start relative">
                        <div id="leftarm" className="w-[50px] h-[200px]" style={{ backgroundColor: skinColor }}></div>
                        <div id="torso" className="w-[150px] h-[200px]" style={{ backgroundColor: skinColor }}></div>
                        <div id="rightarm" className="w-[50px] h-[200px]" style={{ backgroundColor: skinColor }}></div>
                        {selectedClothes.top && (
                            <img
                                src={getImageUrl(selectedClothes.top.image_path)}
                                alt="Top"
                                className="absolute top-0 w-[250px] h-[200px]"
                            />
                        )}
                    </div>

                    {/* Legs */}
                    <div className="w-full flex justify-center items-start relative">
                        <div className="h-full w-[150px] flex">
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

                    {/* Feet */}
                    <div className="w-full flex justify-center items-end relative mt-2">
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

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4">
                <div className="w-full max-w-[600px] rounded-2xl shadow-lg bg-white dark:bg-black dark:bg-opacity-10">
                    <div className="w-full border-b border-black flex justify-center items-center py-4">
                        <h1 className="font-bold text-3xl">Edit Outfit</h1>
                    </div>
                    <div className="p-4">
                        <input
                            type="text"
                            value={outfitName}
                            onChange={(e) => setOutfitName(e.target.value)}
                            placeholder="Outfit Name"
                            className="mb-4 p-2 border rounded w-full dark:text-black dark:bg-gray-200 dark:border-black focus:outline-none focus:placeholder-transparent"
                        />

                        {/* Clothing Pickers */}
                        {['head', 'top', 'bottom', 'footwear'].map((part) => (
                            <div key={part}>
                                <h2 className="font-semibold capitalize">{part}:</h2>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {clothesOptions[part].map((item) => (
                                        <button
                                            key={item.id}
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

                        <button
                            onClick={handleUpdateOutfit}
                            className="mt-4 p-2 bg-green-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105"
                        >
                            Update Outfit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditOutfitScreen;
