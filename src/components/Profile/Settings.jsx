// src/components/Profile/Settings.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../Utilities/ThemeContext';

const Settings = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="settings-page p-5 bg-gray-100 dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-5">Settings</h1>
            <div className="flex items-center">
                <label className="mr-2">Dark Mode</label>
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    className="toggle-switch"
                />
            </div>
        </div>
    );
};

export default Settings;