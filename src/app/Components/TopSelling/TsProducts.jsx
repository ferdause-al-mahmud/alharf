"use client";
import Image from "next/image";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

const TsProducts = ({ products }) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }
  return (
    <div>
      {/* For desktop devices */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            passHref
            className="group bg-[#f3f3f3] border-b-2 p-4 transition-all duration-300 cursor-pointer"
          >
            <div
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              className="justify-center items-center flex flex-col"
            >
              <figure className="overflow-hidden">
                <Image
                  src={
                    hoveredProductId === product.id
                      ? product.imageUrl?.[1]
                      : product.imageUrl?.[0] || ""
                  }
                  alt={product?.name || "Image"}
                  width={200}
                  height={200}
                  className="object-cover h-auto transform group-hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="flex gap-2 flex-col p-4 text-center">
                <h3 className="card-title font-medium text-lg">
                  {product.name}
                </h3>
                <p className="text-xl font-semibold text-gray-700">
                  BDT {product.price} TK
                </p>
                <p className="text-sm text-gray-600">
                  Available Sizes:{" "}
                  {product.availableSizes
                    ?.map((sizeObj) => sizeObj.size)
                    .join(", ") || "N/A"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* For mobile and tablet devices */}
      <div className="md:hidden">
        <Swiper
          spaceBetween={16}
          grabCursor={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            350: {
              slidesPerView: 2,
            },
            501: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          {products.slice(0, 8).map((product) => (
            <SwiperSlide key={product.id}>
              <Link href={`/product/${product.id}`} passHref>
                <div
                  className="group bg-[#f3f3f3] border-b-2 p-4 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <figure className="overflow-hidden flex items-center justify-center">
                    <Image
                      src={
                        hoveredProductId === product.id
                          ? product.imageUrl?.[1]
                          : product.imageUrl?.[0] || ""
                      }
                      alt={product?.name || "Image"}
                      width={200}
                      height={200}
                      className="object-cover h-auto transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </figure>
                  <div className="flex gap-2 flex-col p-4 text-center">
                    <h3 className="card-title font-medium text-sm sm:text-lg">
                      {product.name}
                    </h3>
                    <p className="text-sm sm:text-xl font-semibold text-gray-700">
                      BDT {product.price} TK
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Available Sizes:{" "}
                      {product.availableSizes
                        ?.map((sizeObj) => sizeObj.size)
                        .join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TsProducts;
