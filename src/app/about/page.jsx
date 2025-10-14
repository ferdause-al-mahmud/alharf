// AboutUs.js
// /about/page.jsx
"use client"
import dynamic from "next/dynamic";

import React from 'react';
const Map = dynamic(() => import('../Components/Map/Map'), {
    ssr: false
})

const AboutUs = () => {
    return (
        <div className="max-w-7xl mx-auto flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            <div className="flex flex-col md:flex-row w-full items-center gap-6">
                {/* Render the Map component client-side only */}
                <div className="w-full md:w-1/2 h-72 md:h-96">
                    <Map />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-2xl font-semibold mb-4">Welcome to Classy Touch BD</h2>
                    <p className="text-gray-700">
                        At Classy Touch BD, we specialize in high-quality men’s clothing accessories, designed to elevate your style with ease. From classic ties and cufflinks to modern belts and wallets, we offer a curated selection that speaks to the sophistication of our customers.
                    </p>
                    <p className="text-gray-700 mt-4">
                        Our office is located at 20 Udayan School Rd, where we welcome you to discover the finest in men’s accessories.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
