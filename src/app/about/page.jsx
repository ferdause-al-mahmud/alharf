// /about/page.jsx
"use client";
import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import("../Components/Map/Map"), {
  ssr: false,
});

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
          <h2 className="text-2xl font-semibold mb-4">Welcome to Alharf</h2>
          <p className="text-gray-700">
            At Alharf, we celebrate women’s elegance and individuality through
            our exclusive collection of fashion wear, footwear, and accessories.
            From timeless dresses and trendy tops to chic shoes and stylish
            handbags, our curated selection is designed to empower every woman’s
            confidence and charm.
          </p>
          <p className="text-gray-700 mt-4">
            Visit us at 20 Udayan School Rd to explore our wide range of women’s
            fashion essentials and discover what makes Alharf a destination for
            modern style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
