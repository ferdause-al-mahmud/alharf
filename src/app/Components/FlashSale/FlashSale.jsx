"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const FlashSale = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/sale");
  };
  return (
    <div
      onClick={handleClick}
      className="relative w-full mx-auto my-8 hover:cursor-pointer "
    >
      {/* Discount Badge */}
      <div className="absolute top-2 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm md:text-base z-10  shadow-lg animate-pulse-soft">
        UP TO 50% OFF
      </div>

      {/* Main Banner Container */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800  overflow-hidden shadow-2xl">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 md:w-24 bg-white bg-opacity-10 rounded-full animate-float-1"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 md:w-28 md:h-28 bg-white bg-opacity-10 rounded-full animate-float-2"></div>

          {/* Sparkle Effects */}
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-white rounded-full animate-sparkle-1"></div>
          <div className="absolute top-2/5 right-1/4 w-1 h-1 bg-white rounded-full animate-sparkle-2"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-sparkle-3"></div>
          <div className="absolute top-3/5 right-1/6 w-1 h-1 bg-white rounded-full animate-sparkle-4"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white pt-12 pb-8 px-6 md:py-16 md:px-12">
          {/* Flash Sale Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 uppercase tracking-wider animate-glow">
            ⚡ FLASH SALE ⚡
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl lg:text-3xl mb-2 opacity-90">
            on selective products
          </p>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-4 mt-6 md:mt-8">
            <Link
              //   onClick={handleOrderNow}
              href={"/sale"}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 md:py-5 md:px-12 rounded-full text-lg md:text-xl uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl animate-bounce"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 1),
              0 0 40px rgba(255, 255, 255, 0.8);
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-180deg);
          }
        }

        @keyframes sparkle-1 {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sparkle-2 {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sparkle-3 {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sparkle-4 {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-soft {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 6s ease-in-out infinite 3s;
        }

        .animate-sparkle-1 {
          animation: sparkle-1 3s infinite;
        }

        .animate-sparkle-2 {
          animation: sparkle-2 3s infinite 1s;
        }

        .animate-sparkle-3 {
          animation: sparkle-3 3s infinite 2s;
        }

        .animate-sparkle-4 {
          animation: sparkle-4 3s infinite 1.5s;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default FlashSale;
