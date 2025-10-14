"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const SalePopUpBanner = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Show popup only once per session
    const hasSeenSaleBanner = sessionStorage.getItem(
      "classyTouchSaleBannerSeen"
    );
    if (!hasSeenSaleBanner) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Skip directly to Free Delivery popup
      onClose();
    }
  }, [onClose]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("classyTouchSaleBannerSeen", "true");
      onClose(); // trigger next popup
    }, 300);
  };

  const handleImageClick = () => {
    sessionStorage.setItem("classyTouchSaleBannerSeen", "true");
    router.push("/sale");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`popup-overlay ${isAnimating ? "animate-in" : "animate-out"}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`popup-banner ${isAnimating ? "animate-in" : "animate-out"}`}
      >
        <button className="close-btn" onClick={handleClose}>
          ✕
        </button>
        <img
          src="https://res.cloudinary.com/dqsjmcelc/image/upload/v1759521249/IMG_5031_upya2d.png"
          alt="Sale Banner"
          className="sale-img"
          onClick={handleImageClick}
        />
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .popup-overlay.animate-in {
          opacity: 1;
        }
        .popup-overlay.animate-out {
          opacity: 0;
        }
        .popup-banner {
          max-width: 600px;
          width: 90%;
          border-radius: 15px;
          overflow: hidden;
          position: relative;
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }
        .popup-banner.animate-in {
          transform: scale(1);
        }
        .popup-banner.animate-out {
          transform: scale(0.8);
        }
        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          cursor: pointer;
          font-size: 18px;
        }
        .sale-img {
          width: 100%;
          display: block;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SalePopUpBanner;
