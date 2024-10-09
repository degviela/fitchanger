import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderButton = ({ to, onClick, color, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Link
            to={to}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`flex justify-center p-2 w-[25%] max-w-[30%] transform-gpu hover:scale-105 rounded-2xl transition hover:ease-in-out hover:text-white text-xs font-semibold sm:text-sm md:text-base ${color}`}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            <span
                style={{
                    position: 'relative',
                    display: 'inline-block',
                }}
            >
                {children}
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
                        transformOrigin: 'bottom left',
                        transition: 'transform 0.3s ease-out',
                    }}
                />
            </span>
        </Link>
    );
};

export default HeaderButton;