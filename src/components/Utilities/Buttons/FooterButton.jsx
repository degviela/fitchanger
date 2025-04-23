import React, { useState } from 'react';

const FooterButton = ({ text, href }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <a
            href={href}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative text-white hover:text-gray-300"
            style={{ display: 'inline-block', position: 'relative' }}
        >
            {text}
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
        </a>
    );
};

export default FooterButton;