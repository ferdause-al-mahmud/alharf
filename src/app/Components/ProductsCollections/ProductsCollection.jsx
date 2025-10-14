"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Baggy from "../../../../baggy.jpg";
import shoes from "../../../../shoes.jpg";
import polo from "../../../../polo.jpg";
import Link from "next/link";

const products = [
  {
    id: 1,
    imageUrl: "https://i.ibb.co/ccqKXnfg/THP05289.jpg",
    name: "Panjabi",
    path: "/collections/panjabi",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/dqsjmcelc/image/upload/v1742773612/ClassyTouch/m9zloitgzyi27fg6jrfb.jpg",
    name: "Casual Shirts",
    path: "/collections/shirts",
  },
  {
    id: 5,
    imageUrl: Baggy,
    name: "Baggy Pants",
    path: "/collections/baggy-pants",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/dqsjmcelc/image/upload/v1742684908/ClassyTouch/uxh4itnlmydnqrzsszj6.jpg",
    name: "Drop Shoulders",
    path: "/collections/t-shirts",
  },
  {
    id: 2,
    imageUrl: polo,
    name: "Polo",
    path: "/collections/polo",
  },
  {
    id: 6,
    imageUrl: "https://i.ibb.co.com/CVXSmXk/IMG-2511.jpg",
    name: "Joggers",
    path: "/collections/joggers",
  },
  {
    id: 8,
    imageUrl: shoes,
    name: "Shoes",
    path: "/collections/shoes",
  },
];

const ProductsCollection = () => {
  return (
    <div className="max-w-7xl mx-auto pt-10 px-4">
      <div className="relative mb-12 flex flex-col items-center justify-center">
        <h2
          className="text-3xl sm:text-5xl font-light text-[#1a1a1a] tracking-wider"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Our Collections
        </h2>
        <div className="w-32 h-0.5 bg-gradient-to-r from-amber-600 to-amber-800 mt-4 rounded"></div>
      </div>

      {/* Mobile Layout - 3 items in first row, 3 centered in third row */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 bg-white border border-gray-100 hover:shadow-2xl hover:border-gray-200"
            >
              <Link href={product.path} className="block">
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-2 sm:p-3 text-center bg-white">
                  <h3
                    className="text-xs font-medium text-gray-800 group-hover:text-amber-700 transition-colors duration-300"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {product.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - All items in one row */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-6 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 bg-white border border-gray-100 hover:shadow-2xl hover:border-gray-200 hover:-translate-y-2"
            >
              <Link href={product.path} className="block">
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 16.67vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-4 text-center bg-white">
                  <h3
                    className="text-base font-medium text-gray-800 group-hover:text-amber-700 transition-colors duration-300"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {product.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCollection;
