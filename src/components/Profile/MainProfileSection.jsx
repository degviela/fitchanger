import React from 'react';

const MainProfileSection = ({ user }) => {
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex items-center pt-14">
                <img
                    src={user.profilePicture || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-48 h-48 rounded-full border-3 border-gray-300 mr-4"
                />
                <div className="border-l-2 border-gray-300 h-48 mx-4"></div>
                <div>
                    <h2 className="text-5xl font-bold">{user.username}</h2>
                    <div className="mt-4">
                        {/*<p className="text-lg">Friends: {user.friendsCount}</p>*/}
                        {/*<p className="text-lg">Outfits: {user.outfitsCount}</p>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainProfileSection;