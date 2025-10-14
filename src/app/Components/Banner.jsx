"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import { Autoplay, Navigation, EffectFade } from "swiper/modules"
import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import { Skeleton } from "@mui/material"

const Banner = () => {
    const [banner, setBanner] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get("/api/banner")
                setBanner(response.data.data || [])
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching banners:", error)
                setBanner([])
                setIsLoading(false)
            }
        }
        fetchBanner()
    }, [])

    return (
        <div className="relative w-full overflow-hidden">
            {isLoading ? (
                <div className="relative w-full h-0 pb-[66.67%]">
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: 0, left: 0 }}
                    />
                </div>
            ) : (
                <Swiper
                    loop={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    centeredSlides={true}
                    speed={1000}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    touchRatio={1}
                    effect="fade"
                    modules={[Autoplay, Navigation, EffectFade]}
                    className="mySwiper w-full h-auto"
                >
                    {banner.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-0 pb-[66.67%]">
                                <Image
                                    src={image.url || "/placeholder.svg"}
                                    alt={`banner image ${index + 1}`}
                                    fill
                                    sizes="100vw"
                                    priority={index === 0}
                                    className="object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}

export default Banner

