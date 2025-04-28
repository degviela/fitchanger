import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from "../Utilities/Buttons/BackButton";

const AddClothingItem = () => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!type || !name || !image) {
            toast.error('Please fill in all fields!');
            return;
        }

        const formData = new FormData();
        formData.append('type', type);
        formData.append('name', name);
        formData.append('image', image);

        try {
            await axios.post(`${API_URL}/clothingitems`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });

            toast.success('Clothing item added successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Error adding clothing item:', error);
            toast.error('Failed to add clothing item.');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirmAdd = () => {
        setShowModal(false);
        handleSubmit();
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-8 pt-32">

            {/* Header with BackButton and Title */}
            <div className="flex items-center justify-between w-full max-w-5xl mb-8">
                <BackButton to = "/profile"/>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center flex-grow">
                    Add Clothing Item
                </h2>
                {/* Spacer to balance */}
                <div className="w-12" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex w-full max-w-5xl">
                {/* Left Side: Image Preview */}
                <div className="w-1/2 flex flex-col items-center justify-center p-4">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-auto rounded-lg shadow-md" />
                    ) : (
                        <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
                            <span className="text-gray-400 dark:text-gray-500">Image Preview</span>
                        </div>
                    )}
                </div>

                {/* Right Side: Form + Dummy Text */}
                <div className="w-1/2 p-4">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 dark:text-white">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select type</option>
                                <option value="head">Head</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                                <option value="footwear">Footwear</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 dark:text-white">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-gray-700 dark:text-white">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Add Item
                        </button>
                    </form>

                    {/* Dummy text */}
                    <div className="mt-6 text-gray-600 dark:text-gray-400 text-sm">
                        <p><h1 className="font-bold">IMPORTANT:</h1> Read the tutorial first!</p>
                        <p className="mt-2">The tutorial gives you a good example of how to add a clothing item with it being accepted and not deleted upon post!</p>
                        <p className="mt-2">You MUST strictly read the rules for clothing item posting so it gives the best experience for all users!</p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">Are you sure you want to post this?</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">The team will delete your clothing item if the clothing item is not added correctly!</p>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                            >
                                Cancel
                            </button>

                            <Link to="/adding-tutorial">
                                <button
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                >
                                    Read Tutorial
                                </button>
                            </Link>

                            <button
                                onClick={handleConfirmAdd}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddClothingItem;
