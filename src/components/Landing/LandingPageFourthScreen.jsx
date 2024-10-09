import React from 'react';
import { Link } from 'react-router-dom';

const LandingPageFourthScreen = () => {
    return (
        <div className="w-screen h-screen flex flex-col bg-gray-100 relative overflow-hidden">
            <div className="absolute w-full h-full flex justify-center items-center">
                <div className="w-full h-full bg-white transform -skew-y-12 origin-top-left scale-[2]"></div>
            </div>
            <div className="relative w-full h-full flex justify-between items-center z-10">
                <div className="w-1/2 flex justify-center items-center">
                    <Link to="/login" className="flex justify-center items-center w-[60%] h-[20%] border-orange-500 border-2 rounded-2xl text-orange-500 text-4xl font-bold hover:transition hover:ease-in-out hover:bg-orange-500 hover:text-white">Login</Link>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <Link to="/register" className="flex justify-center items-center w-[60%] h-[20%] border-black border-2 rounded-2xl text-black text-4xl font-bold hover:transition hover:ease-in-out hover:bg-black hover:text-white">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPageFourthScreen;