"use client";
import React, { useState, useEffect } from "react";

const SalePopUpBanner = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  const COUPON_CODE = "SILVER10";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10000] transition-opacity duration-500 px-4 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`max-w-[420px] sm:max-w-[480px] w-full bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-3xl relative overflow-hidden shadow-2xl transition-all duration-500 ${
          isAnimating ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200/50 text-rose-400 hover:bg-rose-50 hover:text-rose-600 hover:rotate-90 transition-all duration-300 flex items-center justify-center z-10 shadow-sm"
          onClick={handleClose}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Floating Petals */}
        <div className="petals absolute inset-0 pointer-events-none overflow-hidden"></div>

        {/* Sparkle Effects */}
        <div className="sparkle sparkle-1 absolute w-1 h-1 bg-rose-300 rounded-full"></div>
        <div className="sparkle sparkle-2 absolute w-1.5 h-1.5 bg-pink-300 rounded-full"></div>
        <div className="sparkle sparkle-3 absolute w-1 h-1 bg-rose-400 rounded-full"></div>

        {/* Content */}
        <div className="relative z-[2] px-8 py-12 text-center">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>

          {/* Badge */}
          <div className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2 rounded-full text-[10px] font-semibold tracking-widest mb-6 shadow-lg shadow-rose-300/40">
            EXCLUSIVE FOR YOU
          </div>

          {/* Icon - Sparkle Heart */}
          <div className="mb-6 animate-float">
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="url(#heart-gradient)"
              className="mx-auto drop-shadow-[0_8px_16px_rgba(244,63,94,0.25)]"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <div className="flex gap-1 justify-center mt-3">
              <span className="text-rose-400 text-xs">✦</span>
              <span className="text-pink-400 text-xs">✦</span>
              <span className="text-rose-300 text-xs">✦</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-light mb-3 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent tracking-tight">
            Welcome
          </h2>

          {/* Subtitle */}
          <p className="text-base text-gray-600 font-light mb-8 tracking-wide italic">
            Your exclusive 10% discount awaits
          </p>

          {/* Coupon Container */}
          <div className="mb-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-rose-200/60 relative overflow-hidden shadow-xl hover:shadow-2xl hover:border-rose-300 hover:-translate-y-0.5 transition-all duration-300 group">
              {/* Shimmer Effect */}
              <div className="shimmer absolute inset-0 pointer-events-none"></div>

              <div className="text-[10px] text-rose-500 font-semibold tracking-[0.2em] mb-3 uppercase">
                Your Personal Code
              </div>

              <div className="text-3xl font-semibold text-gray-800 tracking-[0.3em] font-serif relative z-[1] mb-2">
                {COUPON_CODE}
              </div>

              <div className="flex items-center justify-center gap-1 text-rose-400 text-xs">
                <span>✧</span>
                <span>Limited Time</span>
                <span>✧</span>
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide shadow-lg shadow-rose-300/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-300/60 active:translate-y-0 transition-all duration-300 relative overflow-hidden group mb-6"
          >
            <span className="btn-shimmer absolute inset-0 pointer-events-none"></span>
            {copied ? (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="relative z-[1]"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="relative z-[1]">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="relative z-[1]"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span className="relative z-[1]">Copy Your Code</span>
              </>
            )}
          </button>

          {/* Note */}
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2 font-light">
            <span className="text-rose-500">♡</span>
            Valid on all products • No minimum purchase
          </p>

          {/* Decorative Bottom Border */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .petals::before,
        .petals::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(
            circle,
            rgba(251, 113, 133, 0.4),
            transparent
          );
          border-radius: 50%;
          animation: float-petal 8s infinite ease-in-out;
        }

        .petals::before {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .petals::after {
          top: 60%;
          right: 15%;
          animation-delay: 3s;
        }

        @keyframes float-petal {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.6;
          }
        }

        .sparkle-1 {
          top: 15%;
          right: 20%;
          animation: sparkle 3s infinite ease-in-out;
        }

        .sparkle-2 {
          bottom: 25%;
          left: 15%;
          animation: sparkle 2.5s infinite ease-in-out 1s;
        }

        .sparkle-3 {
          top: 40%;
          right: 10%;
          animation: sparkle 3.5s infinite ease-in-out 0.5s;
        }

        @keyframes sparkle {
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

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(251, 113, 133, 0.1),
            transparent
          );
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .btn-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: btn-shimmer 0.6s;
        }

        @keyframes btn-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .group:hover .btn-shimmer {
          animation: btn-shimmer 0.6s;
        }
      `}</style>

      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="heart-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SalePopUpBanner;
