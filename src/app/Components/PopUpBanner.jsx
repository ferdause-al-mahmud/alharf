"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const PopupBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Check if banner has been shown before
    const hasSeenBanner = sessionStorage.getItem("classyTouchBannerSeen");

    if (!hasSeenBanner) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("classyTouchBannerSeen", "true");
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  const handleShop = () => {
    router.push("/collections/new-arrivals");
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`popup-overlay ${isAnimating ? "animate-in" : "animate-out"}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`popup-banner ${isAnimating ? "animate-in" : "animate-out"}`}
      >
        {/* Close Button */}
        <button
          className="close-btn"
          onClick={handleClose}
          aria-label="Close banner"
        >
          ✕
        </button>

        {/* Decorative Elements */}
        <div className="decorative-elements">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        {/* Content */}
        <div className="banner-content">
          <div className="content-section">
            <div className="brand-name">Classy Touch</div>
            <div className="main-text">
              <span className="highlight">FREE DELIVERY</span>
              <div className="sub-line">
                on Any <span className="highlight number">3</span> Products
              </div>
            </div>
            <div className="sub-text">
              No delivery fees • Premium quality • Fast shipping
            </div>
            <button onClick={handleShop} className="cta-btn">
              Shop Now
            </button>
          </div>

          <div className="icon-section">
            <div className="delivery-icon">🚚</div>
            <div className="number-badge">3</div>
            <div className="offer-text">Items</div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="bottom-decoration"></div>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .popup-overlay.animate-in {
          opacity: 1;
        }

        .popup-overlay.animate-out {
          opacity: 0;
        }

        .popup-banner {
          width: 100%;
          max-width: 600px;
          height: 500px;
          background: linear-gradient(
            135deg,
            #1a1a2e 0%,
            #16213e 30%,
            #0f3460 70%,
            #1a1a2e 100%
          );
          border-radius: 25px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(255, 215, 0, 0.1);
          transform: scale(0.8) translateY(50px);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid rgba(255, 215, 0, 0.2);
        }

        .popup-banner.animate-in {
          transform: scale(1) translateY(0);
        }

        .popup-banner.animate-out {
          transform: scale(0.8) translateY(50px);
        }

        .popup-banner::before {
          content: "";
          position: absolute;
          top: -30%;
          right: -15%;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(255, 215, 0, 0.15) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .popup-banner::after {
          content: "";
          position: absolute;
          bottom: -20%;
          left: -10%;
          width: 250px;
          height: 250px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: float 4s ease-in-out infinite reverse;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .close-btn:hover {
          background: rgba(255, 71, 87, 0.8);
          transform: scale(1.1);
          box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
        }

        .decorative-elements {
          position: absolute;
          top: 30px;
          left: 30px;
          display: flex;
          gap: 8px;
          z-index: 5;
        }

        .dot {
          width: 10px;
          height: 10px;
          background: rgba(255, 215, 0, 0.7);
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }

        .dot:nth-child(2) {
          animation-delay: 0.5s;
        }
        .dot:nth-child(3) {
          animation-delay: 1s;
        }

        .banner-content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 60px 40px 40px;
          z-index: 5;
          position: relative;
        }

        .content-section {
          flex: 1;
          max-width: 350px;
        }

        .brand-name {
          font-size: 2.8rem;
          font-weight: 300;
          color: #ffd700;
          margin-bottom: 15px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-shadow: 0 3px 15px rgba(255, 215, 0, 0.4);
          animation: glow 3s ease-in-out infinite alternate;
        }

        .main-text {
          margin-bottom: 20px;
        }

        .main-text > .highlight {
          font-size: 2.8rem;
          font-weight: 800;
          color: #ffffff;
          display: block;
          text-shadow: 0 3px 15px rgba(0, 0, 0, 0.5);
          line-height: 1;
          margin-bottom: 8px;
        }

        .sub-line {
          font-size: 2rem;
          color: #e0e0e0;
          font-weight: 600;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .number {
          color: #ffd700;
          font-weight: 900;
          text-shadow: 0 2px 15px rgba(255, 215, 0, 0.6);
        }

        .sub-text {
          font-size: 1.1rem;
          color: #b0b0b0;
          font-weight: 400;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
          margin-bottom: 25px;
          line-height: 1.4;
        }

        .cta-btn {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #1a1a2e;
          border: none;
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255, 215, 0, 0.4);
        }

        .icon-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 30px;
        }

        .delivery-icon {
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: #1a1a2e;
          box-shadow: 0 15px 30px rgba(255, 215, 0, 0.3);
          animation: bounce 2s ease-in-out infinite;
          margin-bottom: 15px;
        }

        .number-badge {
          background: #ff4757;
          color: white;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: bold;
          box-shadow: 0 8px 20px rgba(255, 71, 87, 0.4);
          margin-bottom: 8px;
        }

        .offer-text {
          color: #ffd700;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .bottom-decoration {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #ffd700, #ffed4e, #ffd700);
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes glow {
          0% {
            text-shadow: 0 3px 15px rgba(255, 215, 0, 0.4);
          }
          100% {
            text-shadow: 0 3px 25px rgba(255, 215, 0, 0.8),
              0 0 35px rgba(255, 215, 0, 0.3);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .popup-overlay {
            padding: 15px;
            align-items: center;
            justify-content: center;
          }

          .popup-banner {
            height: auto;
            min-height: 450px;
            max-height: 85vh;
            max-width: 95vw;
            overflow: hidden;
          }

          .banner-content {
            flex-direction: column;
            padding: 50px 25px 25px;
            text-align: center;
            height: 100%;
            justify-content: space-evenly;
            display: flex;
          }

          .content-section {
            max-width: 100%;
            margin-bottom: 15px;
          }

          .brand-name {
            font-size: 2rem;
            letter-spacing: 2px;
            margin-bottom: 10px;
          }

          .main-text > .highlight {
            font-size: 2rem;
            margin-bottom: 5px;
          }

          .sub-line {
            font-size: 1.5rem;
          }

          .sub-text {
            font-size: 0.95rem;
            margin-bottom: 15px;
          }

          .cta-btn {
            padding: 12px 25px;
            font-size: 0.95rem;
          }

          .icon-section {
            margin-left: 0;
            margin-top: 0;
          }

          .delivery-icon {
            width: 70px;
            height: 70px;
            font-size: 1.8rem;
            margin-bottom: 8px;
          }

          .number-badge {
            width: 32px;
            height: 32px;
            font-size: 1rem;
            margin-bottom: 3px;
          }

          .offer-text {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .popup-overlay {
            padding: 10px;
          }

          .popup-banner {
            min-height: 400px;
            max-height: 80vh;
            border-radius: 20px;
            overflow: hidden;
          }

          .banner-content {
            padding: 45px 20px 20px;
          }

          .brand-name {
            font-size: 1.8rem;
            margin-bottom: 8px;
          }

          .main-text > .highlight {
            font-size: 1.8rem;
            margin-bottom: 4px;
          }

          .sub-line {
            font-size: 1.3rem;
          }

          .sub-text {
            font-size: 0.9rem;
            margin-bottom: 12px;
          }

          .cta-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .delivery-icon {
            width: 65px;
            height: 65px;
            font-size: 1.6rem;
            margin-bottom: 6px;
          }

          .number-badge {
            width: 30px;
            height: 30px;
            font-size: 0.95rem;
          }

          .close-btn {
            width: 35px;
            height: 35px;
            font-size: 18px;
            top: 15px;
            right: 15px;
          }
        }

        @media (max-width: 360px) {
          .popup-banner {
            min-height: 380px;
          }

          .banner-content {
            padding: 40px 18px 18px;
          }

          .brand-name {
            font-size: 1.6rem;
          }

          .main-text > .highlight {
            font-size: 1.6rem;
          }

          .sub-line {
            font-size: 1.2rem;
          }

          .sub-text {
            font-size: 0.85rem;
          }

          .delivery-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PopupBanner;
