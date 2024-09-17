import React from 'react';
import {Link} from "react-router-dom";

const LandingPageFourthScreen = () => {
    return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
        <div className="w-full h-[50%] flex justify-center items-center">
            <h1 className="font-bold text-8xl">Ready to go further?</h1>
        </div>
        <div className="w-full h-[50%] flex flex-col justify-center items-center">
                <Link to="/login" className="flex justify-center items-center w-[30%] h-[20%] border-orange-500 border-2 rounded-2xl text-orange-500 text-4xl font-bold hover:transition hover:ease-in-out hover:bg-orange-500 hover:text-white">Login</Link>
            <div className="text-xl">or</div>
            <Link to="/register" className=" flex justify-center items-center w-[30%] h-[20%] border-black border-2 rounded-2xl text-black text-4xl font-bold hover:transition hover:ease-in-out hover:bg-black hover:text-white">Sign Up</Link>
        </div>
    </div>
);
};

export default LandingPageFourthScreen;