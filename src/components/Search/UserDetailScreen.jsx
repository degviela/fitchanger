import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetailScreen = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error loading user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (!user) return <p className="text-gray-500">User not found.</p>;

    return (
        <div className="flex flex-col items-center w-full h-[90%] bg-gray-100">
            <h1 className="text-3xl font-bold mt-10">User Details</h1>
            <div className="mt-10 w-[80%] sm:w-[60%] bg-white rounded-lg shadow-lg p-5">
                <p className="text-xl font-semibold text-orange-600 mb-2">{user.username}</p>
                <p className="text-gray-700 mb-2"><strong>ID:</strong> {user.id}</p>
                <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="mt-10 w-[80%] sm:w-[60%] bg-white rounded-lg shadow-lg p-5">
                <h2 className="text-2xl font-bold mb-5">Saved Outfits</h2>
                {user.outfits && user.outfits.length > 0 ? (
                    user.outfits.map((outfit) => (
                        <div key={outfit.id} className="mb-8 border-b pb-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{outfit.name}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {outfit.head && (
                                    <div>
                                        <p className="font-medium text-gray-700">Head</p>
                                        <img src={outfit.head.image} alt="Head" className="w-full h-auto rounded" />
                                    </div>
                                )}
                                {outfit.top && (
                                    <div>
                                        <p className="font-medium text-gray-700">Top</p>
                                        <img src={outfit.top.image} alt="Top" className="w-full h-auto rounded" />
                                    </div>
                                )}
                                {outfit.bottom && (
                                    <div>
                                        <p className="font-medium text-gray-700">Bottom</p>
                                        <img src={outfit.bottom.image} alt="Bottom" className="w-full h-auto rounded" />
                                    </div>
                                )}
                                {outfit.footwear && (
                                    <div>
                                        <p className="font-medium text-gray-700">Footwear</p>
                                        <img src={outfit.footwear.image} alt="Footwear" className="w-full h-auto rounded" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No outfits found.</p>
                )}

            </div>
        </div>
    );
};

export default UserDetailScreen;
