import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usersData from '../../data/users.json'; // Import users JSON
import savedOutfitsData from '../../data/SavedOutfits.json'; // Import saved outfits JSON

const UserDetailScreen = () => {
    const { id } = useParams(); // Get user ID from URL params
    const [user, setUser] = useState(null);
    const [userSavedOutfits, setUserSavedOutfits] = useState([]);

    useEffect(() => {
        const foundUser = usersData.find((user) => user.id === parseInt(id)); // Find the user by ID
        setUser(foundUser);

        if (foundUser) {
            console.log('User:', foundUser);
            // Correct filtering for user outfits based on userid
            const outfits = savedOutfitsData.filter((savedOutfit) => savedOutfit.userid === foundUser.id);
            console.log('User Saved Outfits:', outfits); // Print the matching outfits
            setUserSavedOutfits(outfits);
        }
    }, [id]);

    if (!user) {
        return <p className="text-gray-500">User not found.</p>;
    }

    return (
        <div className="flex flex-col items-center w-full h-[90%] bg-gray-100">
            <h1 className="text-3xl font-bold mt-10">User Details</h1>
            <div className="mt-10 w-[80%] sm:w-[60%] bg-white rounded-lg shadow-lg p-5">
                <p className="text-xl font-semibold text-orange-600 mb-2">
                    {user.username}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>ID:</strong> {user.id}
                </p>
                <p className="text-gray-700">
                    <strong>Email:</strong> {user.email}
                </p>
            </div>

            <div className="mt-10 w-[80%] sm:w-[60%] bg-white rounded-lg shadow-lg p-5">
                <h2 className="text-2xl font-bold mb-5">Saved Outfits</h2>
                {userSavedOutfits.length > 0 ? (
                    userSavedOutfits.map((outfit) => (
                        <div key={outfit.id} className="mb-5">
                            <img src={outfit.image} alt={outfit.name} className="w-full h-auto rounded-lg mb-2" />
                            <p className="text-lg font-semibold">{outfit.name}</p>
                            <p className="text-gray-700">{outfit.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No saved outfits found.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetailScreen;
