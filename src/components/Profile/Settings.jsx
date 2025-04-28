import React, { useContext, useState } from 'react';
  import { ThemeContext } from '../Utilities/ThemeContext';
  import axios from 'axios';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  const Settings = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    // const handlePasswordReset = async () => {
    //   if (!email) {
    //     toast.error('Please enter your email.');
    //     return;
    //   }
    //
    //   try {
    //     const response = await axios.post(`${API_URL}/password/reset`, { email });
    //     setMessage('Password reset link sent to your email.');
    //     toast.success('Password reset link sent to your email.');
    //   } catch (error) {
    //     setMessage('Failed to send password reset link.');
    //     toast.error('Failed to send password reset link.');
    //   }
    // };

    const handleNameChange = async () => {
      if (!firstName || !lastName) {
        toast.error('Please enter your first and last name.');
        return;
      }

      try {
        const response = await axios.post(`${API_URL}/name/change`, { firstName, lastName });
        setMessage('Name changed successfully.');
        toast.success('Name changed successfully.');
      } catch (error) {
        setMessage('Failed to change name.');
        toast.error('Failed to change name.');
      }
    };

    const togglePasswordModal = () => {
      setIsPasswordModalOpen(!isPasswordModalOpen);
    };

    const toggleNameModal = () => {
      setIsNameModalOpen(!isNameModalOpen);
    };

    return (
      <div className="settings-page p-10 w-full h-full">
        <h1 className="text-3xl font-bold mb-5">Settings</h1>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4">General Settings</h2>
            <div className="flex items-center mb-5">
              <label className="mr-2">Dark Mode</label>
              <label className="relative inline-block w-16 h-8 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  className="absolute opacity-0 w-0 h-0"
                />
                <span className={`block overflow-hidden h-8 rounded-full cursor-pointer ${theme === 'dark' ? 'bg-green-500' : 'bg-red-500'}`}>
                  <span className={`absolute left-0 top-0 bottom-0 w-8 h-8 bg-white rounded-full transition-transform duration-200 ease-in-out ${theme === 'dark' ? 'transform translate-x-full' : ''}`}></span>
                  <span className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xs ${theme === 'dark' ? 'block' : 'hidden'}`}>On</span>
                  <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs ${theme === 'dark' ? 'hidden' : 'block'}`}>Off</span>
                </span>
              </label>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <button
              onClick={toggleNameModal}
              className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Change Name
            </button>
          </div>
        </div>

        {isNameModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl w-[90%] max-w-md text-center relative">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Change Your Name</h2>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex justify-between gap-4">
                  <button
                      onClick={handleNameChange}
                      className="flex-1 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                      onClick={toggleNameModal}
                      className="flex-1 py-2 rounded-xl bg-gray-400 text-white font-semibold hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
                {message && <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{message}</p>}
              </div>
            </div>
        )}
      </div>
    );
  };

  export default Settings;