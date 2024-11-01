import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost/api/authenticated/user', {
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
                const response = await axios.get('http://localhost/api/authenticated/clothingitems', {
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
        return `http://localhost/storage/${path}`;
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
            await axios.post('http://localhost/api/authenticated/outfits', outfitData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            alert('Outfit saved successfully!');
        } catch (error) {
            console.error('Failed to save outfit:', error);
            alert('Failed to save outfit. Please try again.');
        }
    };

    return (
        <div className="w-screen h-[80%] bg-white flex flex-row justify-center items-center">
            <div className="w-[50%] h-screen flex flex-col justify-center items-center">
                {/* Krāsu toņi */}
                <div className="mb-4 flex space-x-4">
                    {skinTones.map((tone) => (
                        <button
                            key={tone.name}
                            onClick={() => setSkinColor(tone.color)}
                            className="w-10 h-10 rounded-full border-2"
                            style={{ backgroundColor: tone.color }}
                            title={tone.name}
                        ></button>
                    ))}
                </div>

                <div className="w-[40%] h-[70%] relative flex flex-col justify-center items-center">
                    {/* Galva */}
                    <div className="w-full h-[20%] flex justify-center items-end relative">
                        <div id="head" className="w-[140px] h-[140px] border-2 rounded-full" style={{ backgroundColor: skinColor }}></div>
                        {/* Drēbes galvai */}
                        {selectedClothes.head && (
                            <img
                                src={getImageUrl(selectedClothes.head.image_path)}
                                alt="Headwear"
                                className="absolute top-[-40px] w-[160px] h-[90px]"
                            />
                        )}
                    </div>

                    {/* Augšdaļa */}
                    <div className="w-full h-[30%] flex justify-center items-start relative">
                        <div id="leftarm" className="w-[50px] h-[200px] border-2" style={{ backgroundColor: skinColor }}></div>
                        <div id="torso" className="w-[150px] h-[200px] border-2" style={{ backgroundColor: skinColor }}></div>
                        <div id="rightarm" className="w-[50px] h-[200px] border-2" style={{ backgroundColor: skinColor }}></div>

                        {/* Augšdaļas drēbes */}
                        {selectedClothes.top && (
                            <img
                                src={getImageUrl(selectedClothes.top.image_path)}
                                alt="Top"
                                className="absolute top-[0] w-[250px] h-[200px]"
                            />
                        )}
                    </div>

                    {/* Apakšdaļa */}
                    <div className="w-full h-[25%] flex justify-center items-start relative">
                        <div className="h-full w-[150px] flex">
                            <div id="leftleg" className="h-[150px] w-[75px] border-2" style={{ backgroundColor: skinColor }}></div>
                            <div id="rightleg" className="h-[150px] w-[75px] border-2" style={{ backgroundColor: skinColor }}></div>
                        </div>
                        {/* Apakšdaļas virsdrēbes */}
                        {selectedClothes.bottom && (
                            <img
                                src={getImageUrl(selectedClothes.bottom.image_path)}
                                alt="Bottom"
                                className="absolute top-[0] w-[150px] h-[150px]"
                            />
                        )}
                    </div>

                    {/* Pēdas */}
                    <div className="w-full h-[5%] flex justify-center items-end relative"  >
                        <div className="h-[20px] w-[150px] border-2" style={{ backgroundColor: skinColor }}></div>
                        {/* Kurpes */}
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

            <div className="w-[50%] h-screen flex flex-col justify-center items-center">
                <div className="w-[70%] h-[80%] border-2 rounded-2xl shadow-lg border-black">
                    <div className="w-full h-[10%] border-b-2 border-black flex justify-center items-center">
                        <h1 className="font-bold text-3xl">Clothes</h1>
                    </div>
                    <div className="p-4">
                        <input
                            type="text"
                            value={outfitName}
                            onChange={(e) => setOutfitName(e.target.value)}
                            placeholder="Outfit Name"
                            className="mb-4 p-2 border rounded w-full"
                        />
                        {/* Pogas galvai */}
                        <h2 className="font-semibold">Head:</h2>
                        <div className="flex space-x-4 mb-4">
                            {clothesOptions.head.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleClothingSelect('head', item)}
                                    className={`p-2 rounded ${selectedClothes.head === item ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        {/* Augšdaļas Pogas */}
                        <h2 className="font-semibold">Top:</h2>
                        <div className="flex space-x-4 mb-4">
                            {clothesOptions.top.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleClothingSelect('top', item)}
                                    className={`p-2 rounded ${selectedClothes.top === item ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        {/* Apakšdaļas pogas  */}
                        <h2 className="font-semibold">Bottom:</h2>
                        <div className="flex space-x-4 mb-4">
                            {clothesOptions.bottom.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleClothingSelect('bottom', item)}
                                    className={`p-2 rounded ${selectedClothes.bottom === item ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        {/* Kurpju pogas */}
                        <h2 className="font-semibold">Footwear:</h2>
                        <div className="flex space-x-4 mb-4">
                            {clothesOptions.footwear.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleClothingSelect('footwear', item)}
                                    className={`p-2 rounded ${selectedClothes.footwear === item ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleSaveOutfit}
                            className="mt-4 p-2 bg-green-500 text-white rounded"
                        >
                            Save Outfit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutfitCreation;