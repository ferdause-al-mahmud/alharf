import React from "react";
const ActionButtons = ({
  selectedSize,
  isOutOfStock,
  handleAddToCart,
  handleBuyNow,
}) => (
  <div className="flex flex-col gap-4 mb-2 sm:mb-8">
    <div className="flex gap-4">
      <button
        className={`flex-1 py-3 rounded-lg flex items-center justify-center transition-all duration-200
          ${
            !selectedSize || isOutOfStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
          }`}
        disabled={!selectedSize || isOutOfStock}
        onClick={handleAddToCart}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Add to Cart
      </button>
      <button
        className={`flex-1 py-3 rounded-lg transition-all duration-200
          ${
            !selectedSize || isOutOfStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl"
          }`}
        disabled={!selectedSize || isOutOfStock}
        onClick={handleBuyNow}
      >
        Buy Now
      </button>
    </div>
  </div>
);

export default ActionButtons;
