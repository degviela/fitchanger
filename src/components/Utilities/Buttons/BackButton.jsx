import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            onClick={() => navigate(-1)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex pt-1 pb-1 items-center text-current transition duration-300 ease-in-out group"
            style={{
                border: '2px solid transparent',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 mr-1">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
            Back
            <span
                style={{
                    content: '',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'currentColor',
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.3s ease-out',
                }}
            />
        </button>
    );
};

export default BackButton;