import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Stickman from './components/Stickman';
import Header from "./components/Header/Header";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";
import User from "./Pages/User";
import axios from "axios";
import { ThemeContext } from './components/Utilities/ThemeContext';
import OutfitMaker from "./Pages/OutfitMaker";
import ProtectedRoute from "./components/Utilities/ProtectedRoute";
import {ToastContainer} from "react-toastify";
import AddClothingItem from "./components/Profile/AddClothingItem";
import ClothingItemsPage from "./components/Profile/ClothingItems";
import AddingTutorial from "./components/Profile/AddingTutorial";
import EditOutfitScreen from "./components/Profile/EditOutfitScreen";

function App() {
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
    });

    const location = useLocation();
    const noHeaderRoutes = ['/profile', '/OutfitMaker', '/user/:id', '/edit-outfit/:id'];

    const shouldHideHeader = noHeaderRoutes.some((route) =>
        route.includes(':')
            ? location.pathname.startsWith(route.split(':')[0]) // handles dynamic routes
            : location.pathname === route
    );
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
    }, [theme]);

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-black dark:bg-opacity-10 text-gray-900 dark:text-gray-100">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />
            {!shouldHideHeader && <Header />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
                <Route path="/user/:id" element={<ProtectedRoute element={<User />} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/demo" element={<Stickman />} />
                <Route path="/adding-tutorial" element={<AddingTutorial />} />
                <Route path="/profile" element ={<ProtectedRoute element ={<Profile />} />}/>
                <Route path="/add-clothing-item" element ={<ProtectedRoute element ={<AddClothingItem />} />}/>
                <Route path="/OutfitMaker" element={<ProtectedRoute element ={<OutfitMaker />} />} />
                <Route path="/clothingitems" element={<ProtectedRoute element={<ClothingItemsPage />} />} />
                <Route path="/edit-outfit/:id" element={<ProtectedRoute element={<EditOutfitScreen />} />} />

            </Routes>
        </div>
    );
}

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);


export default AppWrapper;