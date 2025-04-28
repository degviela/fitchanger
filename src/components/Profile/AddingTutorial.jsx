import React from 'react';
import BackButton from "../Utilities/Buttons/BackButton";

const TutorialPage = () => {
    return (
        <div className="pt-32 min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            {/* Header with BackButton and Title */}
            <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
                <BackButton to = "/add-clothing-item"/>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center flex-grow">
                    Tutorial
                </h1>
                {/* Empty div to balance space after flex-grow */}
                <div className="w-12" />
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
                {/* Section 1 */}
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <span className="absolute -top-4 left-4 bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wide">
                        IMPORTANT
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                        Make sure you have the exact parameters for each clothing item! If the parameters are not correct, the item will not be accepted.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <span className="absolute -top-4 left-4 bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wide">
                        IMPORTANT
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                        Upload your clothing items with clear backgrounds if possible.
                        This makes sure your wardrobe looks clean and professional. Images that are blurry or low quality may be DELETED.
                    </p>
                </div>
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <span className="absolute -top-4 left-4 bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wide">
                        IMPORTANT
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                        Make sure the file is in PNG format and with no redundant space around the clothing item.
                    </p>
                </div>

                {/* Section 3 */}
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <span className="absolute -top-4 left-4 bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wide">
                        IMPORTANT
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                        After uploading, your added item will be posted, but if it does not meet the requirements, it will be DELETED.
                    </p>
                </div>

                {/* Section 4 */}
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <span className="absolute -top-4 left-4 bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wide">
                        REQUIREMENTS
                    </span>
                    <div className="text-gray-700 dark:text-gray-300 space-y-2">
                        <p><span className="font-bold">HEAD:</span> Headwear has to be 1400x1400 pixels, and the headwear has to be in the middle of the image. The head should not be too big or too small.</p>
                        <p><span className="font-bold">TOP:</span> Top has to be exactly 2500x2000 pixels, and the top has to be in the middle of the image. The hands for the top are 500 pixels WIDE on each side!</p>
                        <p><span className="font-bold">BOTTOM:</span> Bottom has to be exactly 1500x1500 pixels. Each leg is split in 2 VERTICALLY!</p>
                        <p><span className="font-bold">FOOTWEAR:</span> Footwear has to be 1500x200 pixels and is counted together! It splits in 2 VERTICALLY!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialPage;
