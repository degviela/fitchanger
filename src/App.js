import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stickman from './components/Stickman';
import Header from "./components/Header/Header";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
    return (
        <Router>
                <Header />
                <Routes>
                    {/* Define routes */}
                    <Route  path = "/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/demo" element={<Stickman />} />
                    {/* Add more routes as needed */}
                </Routes>
        </Router>
    );
}

export default App;
