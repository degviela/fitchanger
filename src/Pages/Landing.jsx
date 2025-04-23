import React from 'react';
import LandingPageFirstScreen from "../components/Landing/LandingPageFirstScreen";
import LandingPageSecondScreen from "../components/Landing/LandingPageSecondScreen";
import LandingPageThirdScreen from "../components/Landing/LandingPageThirdScreen";
import LandingFooter from "../components/Landing/LandingFooter";

const Landing = () => {
    return (
        <div className = "w-screen h-screen">
            <LandingPageFirstScreen />
            <LandingPageSecondScreen />
            <LandingPageThirdScreen />
            <LandingFooter />
        </div>
    );
};

export default Landing;