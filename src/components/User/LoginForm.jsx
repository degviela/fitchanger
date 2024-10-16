import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Fetch the CSRF token first
            await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });

            // Then make the login request
            const response = await axios.post(
                'http://localhost/login',
                { username, password },
                { withCredentials: true }
            );

            console.log(response); // Log the response

            if (response.status === 204 || response.status === 200) {
                navigate('/profile');
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
            <div className="flex w-[60%] h-[70%] rounded-2xl shadow-lg">
                <div className="flex flex-col w-[50%] h-full items-center justify-center p-10 border-gray-300">
                    <h1 className="text-3xl font-bold mb-6">Log In</h1>

                    <form onSubmit={handleLogin} className="w-full">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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

export default LoginForm;