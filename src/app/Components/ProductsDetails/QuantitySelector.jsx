import React from "react";

const QuantitySelector = ({
  product,
  selectedSize,
  quantity,
  setQuantity,
  isOutOfStock,
}) => {
  const incrementQuantity = () => {
    const availableStock = product.availableSizes.find(
      (sizeObj) => sizeObj.size === selectedSize
    )?.availability;
    if (quantity < availableStock) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Only ${availableStock} items available in this size`);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isOutOfStock) return null;

  return (
    <div className="mb-2 sm:mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
      <div className="flex items-center">
        <button
          className={`border border-gray-300 h-10 w-10 flex items-center justify-center rounded-l-lg 
            ${
              !selectedSize
                ? "bg-gray-100 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          onClick={decrementQuantity}
          disabled={!selectedSize || quantity <= 1}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            />
          </svg>
        </button>
        <input
          type="number"
          className="h-10 w-16 border-t border-b border-gray-300 text-center focus:outline-none"
          value={quantity}
          readOnly
        />
        <button
          className={`border border-gray-300 h-10 w-10 flex items-center justify-center rounded-r-lg
            ${
              !selectedSize
                ? "bg-gray-100 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          onClick={incrementQuantity}
          disabled={!selectedSize}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
