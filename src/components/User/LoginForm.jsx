import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const AUTH_URL = process.env.REACT_APP_AUTH_URL;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.get(`${AUTH_URL}/sanctum/csrf-cookie`, { withCredentials: true });
            const response = await axios.post(
                `${AUTH_URL}/login`,
                { username, password },
                { withCredentials: true }
            );

            if (response.status === 204 || response.status === 200) {
                navigate('/profile');
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100 dark:bg-black dark:bg-opacity-10 px-4">
            <div className="flex flex-col md:flex-row w-full md:w-[60%] h-[70%] rounded-2xl shadow-lg overflow-hidden dark:bg-black dark:bg-opacity-15">
                {/* Left: Form */}
                <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-10 bg-white dark:bg-black dark:bg-opacity-20">
                    <h1 className="text-3xl font-bold mb-6">Log In</h1>

                    <form onSubmit={handleLogin} className="w-full">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:placeholder-transparent focus:ring-orange-500 dark:text-black"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:placeholder-transparent focus:ring-orange-500 dark:text-black"
                        />

                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <button className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300">
                            Log In
                        </button>
                    </form>

                    <div className="mt-6 text-gray-500">
                        Don’t have an account?
                        <a href="/register" className="text-orange-500 ml-2 hover:underline">Sign Up</a>
                    </div>
                </div>

                {/* Right: Logo (Hidden on small screens) */}
                <div className="hidden md:flex w-1/2 h-full items-center justify-center p-10 bg-gray-50 dark:bg-gray-900">
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

export default LoginForm;
