import React, { useState } from 'react';

const Stickman = () => {
    const [skinColor, setSkinColor] = useState('#FAD7B5'); // Default skin tone

    // Predefined skin tones
    const skinTones = [
        { name: 'Light', color: '#FAD7B5' },
        { name: 'Fair', color: '#FCD7B6' },
        { name: 'Medium', color: '#D1A87D' },
        { name: 'Olive', color: '#A67C52' },
        { name: 'Dark Brown', color: '#7C4F28' },
        { name: 'Deep', color: '#4B2E1C' },
    ];

    return (
        <div className="w-screen h-[80%] bg-white flex flex-row justify-center items-center">
            <div className = "w-[50%] h-screen flex flex-col justify-center items-center">
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

            <div className="w-[40%] h-[70%] flex flex-col justify-center items-center">
                {/* Head */}
                <div className="w-full h-[20%] flex justify-center items-end">
                    <div id="head" className="w-[140px] h-[140px] border-2 rounded-full" style={{ backgroundColor: skinColor }}></div>
                </div>

                {/* Torso + Arms */}
                <div className="w-full h-[30%] flex justify-center items-start">
                    <div id="leftarm" className="w-[50px] h-[200px] border-2" style={{ backgroundColor: skinColor }}></div>
                    <div id="torso" className="w-[150px] h-full border-2" style={{ backgroundColor: skinColor }}></div>
                    <div id="rightarm" className="w-[50px] h-[200px] border-2" style={{ backgroundColor: skinColor }}></div>
                </div>

                {/* Legs */}
                <div className="w-full h-[30%] flex justify-center items-center">
                    <div className="h-full w-[150px] flex bg-[#3A5FCD]">
                        <div id="leftleg" className="h-full w-full border-2" style={{ backgroundColor: skinColor }}></div>
                        <div id="rightleg" className="h-full w-full border-2" style={{ backgroundColor: skinColor }}></div>
                    </div>
                </div>

                {/* Shoes */}
                <div className="w-full h-[5%] flex justify-center items-center">
                    <div className="h-full w-[75px] border-2"></div>
                    <div className="h-full w-[75px] border-2"></div>
                </div>
            </div>
            </div>
            <div className =" w-[50%] h-screen flex justify-center items-center">
                <div className = "w-[70%] h-[80%] border-2 rounded-2xl shadow-lg border-black">
                    <div className = "w-full h-[10%] border-b-2 border-black flex justify-center items-center">
                        <h1 className = "font-bold text-3xl">Clothes</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stickman;
