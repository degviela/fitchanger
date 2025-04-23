import React, { useContext } from 'react';
  import { ThemeContext } from '../Utilities/ThemeContext';
  import FooterButton from '../Utilities/Buttons/FooterButton';

  const LandingFooter = () => {
      const { theme } = useContext(ThemeContext);

      return (
          <footer className={`py-8 ${theme === 'dark' ? 'bg-orange-500' : 'bg-gray-800'} text-white`}>
              <div className="container mx-auto px-6">
                  <div className="flex flex-wrap justify-between">
                      <div className="w-full md:w-1/3 md:text-left mb-4 md:mb-0">
                          <h2 className="text-2xl font-bold">FitChanger</h2>
                          <p className="mt-2">Transform your style with ease.</p>
                      </div>
                      <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
                          <ul className="list-none flex flex-col items-center md:items-start">
                              <li className="mb-2"><FooterButton text="About Us" href="#about" /></li>
                              <li className="mb-2"><FooterButton text="Services" href="#services" /></li>
                              <li className="mb-2"><FooterButton text="Contact" href="#contact" /></li>
                          </ul>
                      </div>
                      <div className="w-full md:w-1/3 text-center md:text-right">
                          <div className="flex justify-center md:justify-end space-x-4">
                              <a href="https://facebook.com" className="text-white hover:text-gray-400 transition-colors duration-300 ease-in-out">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                      <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.324V1.325C24 .595 23.405 0 22.675 0z"/>
                                  </svg>
                              </a>
                              <a href="https://twitter.com" className="text-white hover:text-gray-400 transition-colors duration-300 ease-in-out">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                      <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.944 13.944 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.573 4.897 4.897 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.918 4.918 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 21.543a13.905 13.905 0 0 0 7.548 2.212c9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/>
                                  </svg>
                              </a>
                              <a href="https://instagram.com" className="text-white hover:text-gray-400 transition-colors duration-300 ease-in-out">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.332.012 7.052.07 5.773.128 4.512.334 3.354 1.492 2.196 2.65 1.99 3.911 1.932 5.19.874 6.47.862 6.894.862 12s.012 5.53.07 6.81c.058 1.279.264 2.54 1.422 3.698 1.158 1.158 2.419 1.364 3.698 1.422 1.28.058 1.704.07 6.81.07s5.53-.012 6.81-.07c1.279-.058 2.54-.264 3.698-1.422 1.158-1.158 1.364-2.419 1.422-3.698.058-1.28.07-1.704.07-6.81s-.012-5.53-.07-6.81c-.058-1.279-.264-2.54-1.422-3.698-1.158-1.158-2.419-1.364-3.698-1.422-1.28-.058-1.704-.07-6.81-.07zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
                                  </svg>
                              </a>
                          </div>
                      </div>
                  </div>
                  <div className="mt-8 text-center text-white opacity-30 py-6">
                      &copy; {new Date().getFullYear()} FitChanger. All rights reserved.
                  </div>
              </div>
          </footer>
      );
  };

  export default LandingFooter;