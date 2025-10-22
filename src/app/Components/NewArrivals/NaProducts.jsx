"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const NaProducts = ({ products, loading }) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const calculateDiscountPercentage = (price, offerPrice) => {
    if (!offerPrice || offerPrice >= price) return 0;
    return Math.round(((price - offerPrice) / price) * 100);
  };

  const SkeletonCard = () => (
    <div className="bg-[#f3f3f3] border-b-2 p-4 flex flex-col items-center">
      <div className="h-[200px] w-full bg-gray-200 animate-pulse mb-4"></div>
      <div className="h-6 w-3/4 bg-gray-200 animate-pulse mb-2"></div>
      <div className="h-5 w-1/2 bg-gray-200 animate-pulse mb-2"></div>
      <div className="h-4 w-2/3 bg-gray-200 animate-pulse"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
      {products.map((product) => {
        const allSoldOut = product.availableSizes.every(
          (size) => size.availability == 0
        );
        const discountPercentage = calculateDiscountPercentage(
          product.price,
          product.offerPrice
        );

        return (
          <Link href={`/product/${product.id}`} key={product.id} passHref>
            <div
              className="relative group bg-[#f3f3f3] border-b-2 px-1 sm:p-2 transition-all duration-300 cursor-pointer flex flex-col gap-3 h-full"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <div className="relative pt-[100%] overflow-hidden ">
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute bottom-2 left-8 md:left-12 z-10 bg-red-600 text-white font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-lg">
                    {discountPercentage}% OFF
                  </div>
                )}

                <Image
                  src={product?.imageUrl?.[0] || ""}
                  alt={product?.name || "Image"}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={`object-contain absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${
                    hoveredProductId === product.id
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                />
                <Image
                  src={product?.imageUrl?.[1] || ""}
                  alt={product?.name || "Image"}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={`absolute top-0 left-0 object-contain transition-opacity duration-700 ease-in-out ${
                    hoveredProductId === product.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
                {allSoldOut && (
                  <div className="absolute top-[40%] font-mono py-8 w-full bg-black bg-opacity-50 flex justify-center items-center text-white text-2xl font-extrabold">
                    Sold Out
                  </div>
                )}
              </div>
              <div
                className="flex flex-col gap-2 p-2 sm:p-4 text-center "
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                <h3 className="font-medium text-[16px] sm:text-lg text-black ">
                  {product.name}
                </h3>
                {product?.offerPrice > 0 ? (
                  <div className="flex flex-col-reverse items-center">
                    <span className="text-sm text-gray-500 line-through">
                      BDT {product?.price} TK
                    </span>
                    <div className="flex gap-1 items-center justify-center">
                      <span className="text-sm sm:text-xl font-bold text-gray-900">
                        BDT {product?.offerPrice} TK
                      </span>
                      {!["PD-04", "PD-05", "PD-06"].includes(product?.id) && (
                        <span className="bg-black text-white text-xs  px-2 rounded-md">
                          Save{" "}
                          {parseInt(product?.price) -
                            parseInt(product?.offerPrice)}{" "}
                          BDT
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <p className="text-lg sm:text-xl font-bold mb-2">
                      BDT {product?.price} TK
                    </p>
                  </div>
                )}
                {product?.id === "PA-01" && (
                  <div className="max-w-xs sm:max-w-sm mx-auto bg-gradient-to-r from-red-500  to-yellow-400 text-white text-sm font-bold sm:mt-0 px-4 py-2 rounded-lg shadow-lg text-center ">
                    🕌 🎉 Buy 2 & Get 100 BDT Off! 🔥
                  </div>
                )}

                {["PD-04", "PD-05", "PD-06"].includes(product?.id) && (
                  <div className="max-w-xs sm:max-w-sm mx-auto bg-gradient-to-r from-red-500  to-yellow-400 text-white text-sm font-bold mt-2 sm:mt-0 px-4 py-2 rounded-lg shadow-lg text-center ">
                    Off{" "}
                    {parseInt(product?.price) - parseInt(product?.offerPrice)}{" "}
                    TK 🔥
                  </div>
                )}
                <p className="text-sm ">
                  {product.availableSizes
                    .map((sizeObj) => (
                      <span
                        key={sizeObj.size}
                        className={
                          sizeObj.availability == 0 ? "line-through " : ""
                        }
                      >
                        {sizeObj.size}
                      </span>
                    ))
                    .reduce((prev, curr) => [prev, ", ", curr])}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NaProducts;
