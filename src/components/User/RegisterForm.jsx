import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const AUTH_URL = `${process.env.REACT_APP_AUTH_URL}`;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required.";
        if (!formData.lastName) newErrors.lastName = "Last name is required.";
        if (!formData.username) newErrors.username = "Username is required.";
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
        }
        if (!formData.password) newErrors.password = "Password is required.";
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Passwords must match.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            await axios.get(`${AUTH_URL}/sanctum/csrf-cookie`, { withCredentials: true });

            const registerResponse = await axios.post(`${AUTH_URL}/register`, formData, { withCredentials: true });

            if (registerResponse.status === 204) {
                navigate('/login');
            } else {
                setErrors({ general: 'Registration failed. Please try again.' });
            }
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: 'Error during registration. Please try again.' });
            }
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100 dark:bg-black dark:bg-opacity-10">
            <div className="mt-8 flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[80%] rounded-2xl shadow-lg bg-white dark:bg-black dark:bg-opacity-10">
                <div className="flex flex-col w-full md:w-[50%] h-full items-center justify-center p-10 border-gray-300">
                    <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

                    <form onSubmit={handleSubmit} className="w-full">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full p-3 mb-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-black`}
                        />
                        {errors.firstName && <div className="text-red-500 text-xs mt-[-4px] mb-4">{errors.firstName}</div>}

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full p-3 mb-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-black`}
                        />
                        {errors.lastName && <div className="text-red-500 text-xs mt-[-4px] mb-4">{errors.lastName}</div>}

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full p-3 mb-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-black`}
                        />
                        {errors.username && <div className="text-red-500 text-xs mt-[-4px] mb-4">{errors.username}</div>}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-3 mb-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-black`}
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-[-4px] mb-4">{errors.email}</div>}

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-3 mb-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-black`}
                        />
                        {errors.password && <div className="text-red-500 text-xs mt-[-4px] mb-4">{errors.password}</div>}

                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className={`w-full p-3 mb-3 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-black`}
                        />
                        {errors.password_confirmation && <div className="text-red-500 text-xs mt-[-4px] mb-4">{errors.password_confirmation}</div>}

                        <div className="flex items-center mb-6">
                            <input type="checkbox" className="mr-2" />
                            <label className="text-sm">
                                I agree to the <a href="#" className="text-orange-500 hover:underline">Terms and Conditions</a>
                            </label>
                        </div>

                        <button type="submit" className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300">
                            Register
                        </button>
                    </form>

                    {errors.general && <div className="text-red-500 text-sm mt-4">{errors.general}</div>}

                    <div className="mt-6 text-gray-500">
                        Already have an account?
                        <Link to="/login" className="text-orange-500 ml-2 hover:underline">Log In</Link>
                    </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-full md:w-[50%] h-full p-10 bg-gray-50 rounded-2xl dark:bg-gray-900">
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
