"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { Carter_One } from "next/font/google";

import panjabiImage from "@/app/CT.jpg";

const Carter = Carter_One({
  weight: ["400"],
  subsets: ["latin"],
});

const PanjabiBannerWithSlider = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannersAndProducts = async () => {
      try {
        const productResponse = await axios.get(
          `/api/panjabi-banner?name=panjabi`
        );

        setProductsData(productResponse.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannersAndProducts();
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="sm:w-2/3 w-full relative h-96 sm:h-[600px]">
            <Image
              src={panjabiImage}
              alt="Panjabi banner"
              fill
              className="hidden sm:block object-contain sm:rounded-lg"
            />
            <Image
              src={panjabiImage}
              alt="Panjabi banner"
              fill
              className="sm:hidden object-contain sm:rounded-lg"
            />
          </div>
          <div className="sm:w-1/3 w-full">
            {productsData.length > 0 && (
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false, // Ensures autoplay doesn't stop after user interaction
                }}
                speed={1500}
                // pagination={{ clickable: true }}
                loop={true}
                className="w-full h-[80vh] sm:h-[600px]"
              >
                {productsData?.map((product) => (
                  <SwiperSlide key={product._id}>
                    <div className="relative w-full h-full">
                      <Link href={`/product/${product.id}`}>
                        <Image
                          src={product?.firstImageUrl}
                          alt={product?.name || "Image shirt"}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanjabiBannerWithSlider;
