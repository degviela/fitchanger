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

            console.log(registerResponse); // Log the response

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
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
            <div className="flex w-[60%] h-[70%] rounded-2xl shadow-lg">
                <div className="flex flex-col w-[50%] h-full items-center justify-center p-10 border-gray-300">
                    <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

                    <form onSubmit={handleSubmit} className="w-full">
                        {/* First Name Input */}
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full p-3 mb-4 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

                        {/* Last Name Input */}
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full p-3 mb-4 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

                        {/* Username Input */}
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full p-3 mb-4 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                        {/* Email Input */}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-3 mb-4 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        {/* Password Input */}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-3 mb-4 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        {/* Confirm Password Input */}
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className={`w-full p-3 mb-4 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        />
                        {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}

                        {/* Agree to Terms and Conditions */}
                        <div className="flex items-center mb-6">
                            <input type="checkbox" className="mr-2" />
                            <label className="text-sm">
                                I agree to the <a href="#" className="text-orange-500 hover:underline">Terms and Conditions</a>
                            </label>
                        </div>

                        {/* Register Button */}
                        <button type="submit" className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300">
                            Register
                        </button>
                    </form>

                    {errors.general && <p className="text-red-500 text-sm mt-4">{errors.general}</p>}

                    <div className="mt-6 text-gray-500">
                        Already have an account?
                        <Link to="/login" className="text-orange-500 ml-2 hover:underline">Log In</Link>
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

export default RegisterForm;