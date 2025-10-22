"use client";

import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductsContainer = ({ products }) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const calculateDiscountPercentage = (price, offerPrice) => {
    if (!offerPrice || offerPrice >= price) return 0;
    return Math.round(((price - offerPrice) / price) * 100);
  };

  if (!products) {
    return (
      <div className="h-[100vh] w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-5xl">
        No products available
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
        {products.map((product) => {
          const allSoldOut = product.availableSizes.every(
            (size) => size.availability == 0
          );
          const discountPercentage = calculateDiscountPercentage(
            product.price,
            product.offerPrice
          );

          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              passHref
              className="group relative bg-[#f3f3f3] border-b-2 transition-all duration-300 cursor-pointer"
            >
              <div
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className="flex flex-col h-full gap-3"
              >
                {/* Image Container */}
                {product?.imageUrl?.length > 1 ? (
                  <div className="relative pt-[100%] overflow-hidden ">
                    {/* Discount Badge */}
                    {discountPercentage > 0 && (
                      <div className="absolute bottom-2 left-8 md:left-12 z-10 bg-red-600 text-white font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-lg">
                        {discountPercentage}% OFF
                      </div>
                    )}

                    {/* First Image */}
                    <Image
                      src={product?.imageUrl?.[0] || ""}
                      alt={product?.name || "Image"}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className={`object-contain absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
                        hoveredProductId === product.id
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
                    />

                    {/* Second Image (Visible on hover) */}
                    <Image
                      src={product.imageUrl?.[1] || ""}
                      alt={product?.name || "Image"}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className={`absolute top-0 left-0 object-contain transition-opacity duration-1000 ease-in-out ${
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
                ) : (
                  <div className="relative pt-[100%] overflow-hidden bg-white">
                    {/* Discount Badge */}
                    {discountPercentage > 0 && (
                      <div className="absolute bottom-2 left-8 md:left-12 z-10 bg-red-600 text-white font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-lg">
                        {discountPercentage}% OFF
                      </div>
                    )}

                    <Image
                      src={product.imageUrl?.[0] || ""}
                      alt={product?.name || "Image"}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain absolute top-0 left-0"
                    />
                    {allSoldOut && (
                      <div className="absolute top-[40%] font-mono py-8 w-full bg-black bg-opacity-50 flex justify-center items-center text-white text-2xl font-extrabold">
                        Sold Out
                      </div>
                    )}
                  </div>
                )}

                {/* Product Details */}
                <div
                  className="flex flex-col gap-1 p-2 sm:p-4 text-center "
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
                        <span className="text-sm sm:text-lg font-semibold text-gray-900">
                          BDT {product?.offerPrice} TK
                        </span>
                        {!["PD-04", "PD-05", "PD-06"].includes(product?.id) && (
                          <span className="bg-black text-white text-xs  px-2 rounded-md">
                            Save{" "}
                            {Number.parseInt(product?.price) -
                              Number.parseInt(product?.offerPrice)}{" "}
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
                    <div className="bg-gradient-to-r from-yellow-400 to-red-500 text-white text-sm font-bold p-3 rounded-lg shadow-lg">
                      🎉 Buy 2 & Get 100 BDT Off! 🔥
                    </div>
                  )}
                  {["PD-04", "PD-05", "PD-06"].includes(product?.id) && (
                    <div className="max-w-xs sm:max-w-sm mx-auto bg-gradient-to-r from-red-500  to-yellow-400 text-white text-sm font-bold mt-2 sm:mt-0 px-4 py-2 rounded-lg shadow-lg text-center ">
                      Off{" "}
                      {Number.parseInt(product?.price) -
                        Number.parseInt(product?.offerPrice)}{" "}
                      TK 🎉
                    </div>
                  )}
                  <p className="text-sm ">
                    {product.availableSizes
                      .map((sizeObj) => (
                        <span
                          key={sizeObj.size}
                          className={
                            sizeObj.availability == 0
                              ? "line-through text-gray-400"
                              : ""
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
    </div>
  );
};

export default ProductsContainer;
