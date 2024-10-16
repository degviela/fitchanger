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

function App() {
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
    });

    const location = useLocation();
    const noHeaderRoutes = ['/profile'];
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
    }, [theme]);

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {!noHeaderRoutes.includes(location.pathname) && <Header />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/register" element={<Register />} />
                <Route path="/demo" element={<Stickman />} />
                <Route path="/profile" element={<Profile />} />
                {/* Add more routes as needed */}
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