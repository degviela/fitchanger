import React, { useState } from 'react';

const Stickman = () => {
    const [skinColor, setSkinColor] = useState('#FAD7B5'); // Default skin tone
    const [selectedClothes, setSelectedClothes] = useState({
        head: '',
        torso: '',
        legs: '',
        shoes: ''
    });

    // Predefined skin tones
    const skinTones = [
        { name: 'Light', color: '#FAD7B5' },
        { name: 'Fair', color: '#FCD7B6' },
        { name: 'Medium', color: '#D1A87D' },
        { name: 'Olive', color: '#A67C52' },
        { name: 'Dark Brown', color: '#7C4F28' },
        { name: 'Deep', color: '#4B2E1C' },
    ];

    // Predefined clothes (basic examples)
    const clothesOptions = {
        head: [
            { name: 'Pink Cap', URL: '/images/clothes/head/pinkcap.png' },
            { name: 'Cap', URL: '/images/clothes/head/redcap.png' }
        ],
        torso: [
            { name: 'Pink Shirt', URL: '/images/clothes/top/pinkshirt2.png' },
            { name: 'Jacket', URL: '/images/clothes/top/jacket.png' }
        ],
        legs: [
            { name: 'Pink Shorts', URL: '/images/clothes/bottom/pinkshorts.png' }, // Added URL for legs
            { name: 'Shorts', URL: '/images/clothes/bottom/shorts.png' } // Added URL for shorts
        ],
        shoes: [
            { name: 'Sneakers', style: 'w-[75px] h-[20px] bg-white' },
            { name: 'Boots', style: 'w-[75px] h-[30px] bg-brown-700' }
        ]
    };

    const handleClothingSelect = (part, item) => {
        setSelectedClothes((prev) => ({
            ...prev,
            [part]: item // Pass the entire item, including the URL for images
        }));
    };

    return (
        <div className="w-screen h-[80%] bg-white flex flex-row justify-center items-center">
            <div className="w-[50%] h-screen flex flex-col justify-center items-center">
                {/* Skin Tone Selector */}
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
                    {/* Head */}
                    <div className="w-full h-[20%] flex justify-center items-end relative">
                        <div id="head" className="w-[140px] h-[140px] border-2 rounded-full" style={{ backgroundColor: skinColor }}></div>
                        {/* Clothing on Head */}
                        {selectedClothes.head && (
                            <img
                                src={selectedClothes.head.URL}
                                alt="Headwear"
                                className="absolute top-[-40px] w-[160px] h-[90px]"
                            />
                        )}
                    </div>

                    {/* Torso + Arms */}
                    <div className="w-full h-[30%] flex justify-center items-start relative">
                        <div id="leftarm" className="w-[50px] h-[200px] border-2" style={{ backgroundColor: skinColor }}></div>
                        <div id="torso" className="w-[150px] h-[200px] border-2" style={{ backgroundColor: skinColor }}></div>
                        <div id="rightarm" className="w-[50px] h-[200px] border-2" style={{ backgroundColor: skinColor }}></div>

                        {/* Clothing on Torso */}
                        {selectedClothes.torso && (
                            <img
                                src={selectedClothes.torso.URL}
                                alt="torso"
                                className="absolute top-[0] w-[250px] h-[200px]"
                            />
                        )}
                    </div>

                    {/* Legs */}
                    <div className="w-full h-[25%] flex justify-center items-start relative">
                        <div className="h-full w-[150px] flex">
                            <div id="leftleg" className="h-[150px] w-[75px] border-2" style={{ backgroundColor: skinColor }}></div>
                            <div id="rightleg" className="h-[150px] w-[75px] border-2" style={{ backgroundColor: skinColor }}></div>
                        </div>
                        {/* Clothing on Legs */}
                        {selectedClothes.legs && (
                            <img
                                src={selectedClothes.legs.URL} // Use the URL from selected clothes
                                alt="legs"
                                className="absolute top-[0] w-[150px] h-[150px]" // Adjust the size as needed
                            />
                        )}
                    </div>

                    {/* Shoes */}
                    <div className="w-full h-[5%] flex justify-center items-end relative">
                        <div className="h-[20px] w-[75px] border-2"></div>
                        <div className="h-[20px] w-[75px] border-2"></div>
                        {/* Clothing on Shoes */}
                        {selectedClothes.shoes && (
                            <div className="absolute bottom-[-10px] flex justify-center items-center">
                                <div className={`${selectedClothes.shoes} w-[75px] h-[20px]`} />
                                <div className={`${selectedClothes.shoes} w-[75px] h-[20px]`} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-[50%] h-screen flex justify-center items-center">
                <div className="w-[70%] h-[80%] border-2 rounded-2xl shadow-lg border-black">
                    <div className="w-full h-[10%] border-b-2 border-black flex justify-center items-center">
                        <h1 className="font-bold text-3xl">Clothes</h1>
                    </div>
                    <div className="p-4">
                        {/* Head Clothing */}
                        <h2 className="font-semibold">Head:</h2>
                        <div className="flex space-x-4 mb-4">
                            {clothesOptions.head.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleClothingSelect('head', item)}
                                    className="p-2 bg-gray-200 rounded"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        {/* Torso Clothing */}
                        <h2 className="font-semibold">Torso:</h2>
                        <div className="flex space-x-4 mb-4">
                            {clothesOptions.torso.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleClothingSelect('torso', item)}
                                    className="p-2 bg-gray-200 rounded"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        {/* Legs Clothing */}
                        <h2 className="font-semibold">Legs:</h2>
                        <div className="flex space-x-4 mb-4">
                            {clothesOptions.legs.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleClothingSelect('legs', item)}
                                    className="p-2 bg-gray-200 rounded"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        {/* Shoes Clothing */}
                        <h2 className="font-semibold">Shoes:</h2>
                        <div className="flex space-x-4 mb-4">
                            {clothesOptions.shoes.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleClothingSelect('shoes', item.style)}
                                    className="p-2 bg-gray-200 rounded"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stickman;
