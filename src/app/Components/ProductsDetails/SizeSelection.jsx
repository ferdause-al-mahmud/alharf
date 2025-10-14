import React from "react";

const SizeSelection = ({ product, selectedSize, selectSize }) => (
  <div className="mb-2 sm:mb-8">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold text-gray-800">
        Available Sizes <span className="text-gray-500">(Select a Size)</span>
      </h3>
    </div>

    {product?.category === "shoes" ? (
      <div className="flex flex-wrap gap-3">
        {product?.availableSizes.map((sizeObj, index) => {
          const isSelected = selectedSize === sizeObj.size;
          const isOutOfStock = parseInt(sizeObj.availability) === 0;

          return (
            <button
              key={index}
              className={`w-14 h-12 text-sm rounded-md transition-all duration-200 
                ${
                  isSelected
                    ? "bg-black text-white border-black shadow-lg transform -translate-y-1"
                    : "bg-white text-gray-800 border border-gray-300 hover:border-black hover:shadow"
                }
                ${
                  isOutOfStock
                    ? "line-through bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed hover:shadow-none hover:border-gray-200"
                    : ""
                }`}
              onClick={() => !isOutOfStock && selectSize(sizeObj.size)}
              disabled={isOutOfStock}
            >
              {sizeObj.size}
              {isOutOfStock && <div className="text-xs mt-1">Out of stock</div>}
            </button>
          );
        })}
      </div>
    ) : (
      <div className="space-y-3 overflow-y-auto pr-2 styled-scrollbar">
        {product?.availableSizes.map((sizeObj, index) => {
          const isSelected = selectedSize === sizeObj.size;
          const isOutOfStock = parseInt(sizeObj.availability) === 0;

          return (
            <div
              key={index}
              className={`flex justify-between text-gray-700 items-center p-2 rounded-lg transition-colors
                ${isSelected ? "bg-gray-100" : ""}
                ${isOutOfStock ? "opacity-60" : ""}`}
            >
              <div className="flex items-center gap-4">
                <button
                  className={`px-4 py-2 rounded-full transition-all duration-200
                    ${
                      isSelected
                        ? "bg-black text-white shadow-md"
                        : "border-2 border-gray-300 hover:border-gray-600"
                    } 
                    ${
                      isOutOfStock
                        ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed line-through hover:border-gray-200"
                        : ""
                    }`}
                  onClick={() => !isOutOfStock && selectSize(sizeObj.size)}
                  disabled={isOutOfStock}
                >
                  {sizeObj.size}
                </button>
                {isOutOfStock && (
                  <span className="text-red-500 text-sm">Out of stock</span>
                )}
              </div>
              <span className="text-black text-sm">{sizeObj.measurements}</span>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default SizeSelection;
