import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import FeaturedOutfits from './FeaturedOutfits';
import {getCSRFToken} from "../Utilities/csrf";

const MainProfileSection = ({ user, onUsernameUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [outfits, setOutfits] = useState([]);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1, unit: '%', width: 50 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [imageRef, setImageRef] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;
    const AUTH_URL = process.env.REACT_APP_AUTH_URL;

  useEffect(() => {
      if (user) {
          setNewUsername(user.username); // Initialize newUsername when user is available
          console.log('MainProfileSection user:', user);
      }
  }, [user]);

  useEffect(() => {
      if (!user) return;

      const fetchOutfits = async () => {
          try {
              const response = await axios.get(`${API_URL}/outfits`, {
                  params: { user_id: user.id },
                  headers: { 'Accept': 'application/json' },
                  withCredentials: true
              });

              setOutfits(response.data);
          } catch (error) {
              console.error('Failed to fetch outfits:', error);
          }
      };

      fetchOutfits();
  }, [API_URL, user]);

  if (!user) return <div>Loading...</div>;

  const handleEditClick = () => {
      setIsEditing(true);
  };

    const handleSaveClick = async () => {
        try {
            await getCSRFToken();
            await axios.put(`${AUTH_URL}/profile/update`, { username: newUsername }, {
                headers: { 'Accept': 'application/json' },
                withCredentials: true,
            });

            onUsernameUpdate(newUsername); // <- Trigger change in parent
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update username:', error);
        }
    };



  const handleCancelClick = () => {
      setNewUsername(user.username);
      setIsEditing(false);
  };

  const handleInputChange = (e) => {
      setNewUsername(e.target.value);
  };

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              setSrc(reader.result);
              setShowCropper(true);
          };
          reader.readAsDataURL(file);
      }
  };

  const onImageLoaded = (image) => {
      setImageRef(image);
  };

const onCropComplete = (crop) => {
    if (imageRef && crop.width && crop.height) {
        const canvas = document.createElement('canvas');
        const scaleX = imageRef.naturalWidth / imageRef.width;
        const scaleY = imageRef.naturalHeight / imageRef.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            imageRef,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
        );

        canvas.toBlob(blob => {
            const croppedUrl = URL.createObjectURL(blob); // Define croppedUrl here
            setCroppedImageUrl(croppedUrl); // Set the cropped image URL
            setShowCropper(false);
        }, 'image/jpeg');
    }
};

  return (
      <div>
          <div className="flex items-center pt-14">
              {/* Avatar */}
              <div className="relative group">
                  <img
                      src={croppedImageUrl || "/images/pfpexample.jpg"}
                      alt="Profile"
                      className="w-48 h-48 rounded-full border-3 border-gray-300 mr-4 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                      </svg>
                  </div>
              </div>

              {/* Vertical Divider */}
              <div className="border-l-4 border-gray-400 h-48 mx-4"></div>

              {/* Username & Edit Button */}
              <div>
                  {isEditing ? (
                      <div className="flex items-center">
                          <input
                              type="text"
                              value={newUsername}
                              onChange={handleInputChange}
                              className="text-5xl rounded-xl font-bold border-b-2 border-gray-300 focus:outline-none dark:text-black"
                          />
                          <button
                              onClick={handleSaveClick}
                              className="ml-2 p-2 bg-green-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                          </button>
                          <button
                              onClick={handleCancelClick}
                              className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                          </button>
                      </div>
                  ) : (
                      <div className="flex items-center">
                          <h2 className="text-5xl font-bold">{user?.username ?? 'Loading...'}</h2>
                          <button
                              onClick={handleEditClick}
                              className="ml-2 p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                          </button>
                      </div>
                  )}
              </div>
          </div>

          {/* Featured Outfits */}
          <FeaturedOutfits outfits={outfits} userId={user.id} />

          {/* Image Cropper Popup */}
          {showCropper && src && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-w-full">
                      <h2 className="text-xl font-bold mb-4 text-center">Crop Your Image</h2>
                      <div className="flex justify-center">
                          <ReactCrop
                              src={src}
                              crop={crop}
                              onImageLoaded={onImageLoaded}
                              onChange={newCrop => setCrop(newCrop)}
                              onComplete={onCropComplete}
                              className="max-w-[700px]"
                          />
                      </div>
                      <div className="flex justify-between mt-4">
                          <button
                              onClick={() => setShowCropper(false)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                          >
                              Cancel
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
};

export default MainProfileSection;