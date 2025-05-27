// components/Header.js
import React from "react";

const Header = () => {
    return (
        <header className="text-gray-600 body-font bg-gray-900">
            <div className="container mx-auto flex flex-wrap px-5 py-12 flex-col md:flex-row items-center">
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                    <span className="ml-3 text-xl text-white animate-pulse">anonch.at</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
