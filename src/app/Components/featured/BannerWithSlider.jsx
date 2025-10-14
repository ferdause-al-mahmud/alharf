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

const Carter = Carter_One({
  weight: ["400"],
  subsets: ["latin"],
});

const BannerWithSlider = () => {
  const [banners, setBanners] = useState([]);
  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannersAndProducts = async () => {
      try {
        const bannerResponse = await axios.get("/api/banners-data");
        if (bannerResponse.data.banners?.length > 0) {
          setBanners(bannerResponse.data.banners);
          const productData = {};
          await Promise.all(
            bannerResponse.data.banners.map(async (banner) => {
              const productResponse = await axios.get(
                `/api/${
                  banner?.name === "luxury-panjabi"
                    ? "luxury-panjabi"
                    : "products-banner"
                }?name=${banner.name}`
              );
              productData[banner._id] = productResponse.data.products;
            })
          );
          setProductsData(productData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannersAndProducts();
  }, []);

  if (loading || banners.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col gap-6">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <div className="sm:w-2/3 w-full relative h-72 sm:h-[600px]">
              <Image
                src={banner?.url}
                alt={banner?.name || "Image"}
                fill
                priority
                className="object-contain sm:rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 rounded-lg">
                <h1
                  className={`capitalize ${Carter.className} text-white bg-black w-full max-w-[430px] sm:max-w-full bg-opacity-10 text-xl sm:text-4xl font-bold text-center p-4`}
                >
                  {banner.name === "panjabi" ? "Panjabi" : banner?.name}
                </h1>
              </div>
            </div>
            <div className="sm:w-1/3 w-full">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 1500 }}
                speed={1500}
                // pagination={{ clickable: true }}
                loop={true}
                className="w-full h-[80vh] sm:h-[600px]"
              >
                {productsData[banner._id]?.map((product) => (
                  <SwiperSlide key={product._id}>
                    <div className="relative w-full h-full">
                      <Link href={`/product/${product.id}`}>
                        <Image
                          src={product?.firstImageUrl}
                          alt={product?.name || "Image"}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerWithSlider;
