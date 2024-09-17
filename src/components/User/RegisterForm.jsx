import React from 'react';
import {Link} from "react-router-dom";

const RegisterForm = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
            {/* Container for the form */}
            <div className="flex w-[60%] h-[70%] rounded-2xl shadow-lg">
                {/* Left Side: Register Form */}
                <div className="flex flex-col w-[50%] h-full items-center justify-center p-10 border-gray-300">
                    <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

                    {/* Username Input */}
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    {/* Password Input */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    {/* Confirm Password Input */}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    {/* Agree to Terms and Conditions */}
                    <div className="flex items-center mb-6">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-sm">
                            I agree to the <a href="#" className="text-orange-500 hover:underline">Terms and Conditions</a>
                        </label>
                    </div>

                    {/* Register Button */}
                    <button className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300">
                        Register
                    </button>

                    {/* Or Login Link */}
                    <div className="mt-6 text-gray-500">
                        Already have an account?
                        <Link to = "/login">
                        <a href="/login" className="text-orange-500 ml-2 hover:underline">Log In</a>
                        </Link>
                    </div>
                </div>

                {/* Right Side: Logo */}
                <div className="flex items-center justify-center w-[50%] h-full p-10 bg-gray-50 rounded-2xl">
                    <img
                        src="/images/fitchangerlogo3.png"
                        alt="FitChanger Logo"
                        className="object-contain w-[80%] h-[80%]"
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
