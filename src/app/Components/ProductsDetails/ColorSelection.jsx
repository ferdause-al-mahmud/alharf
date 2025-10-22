import React from "react";

const ColorSelection = ({ product, redirectToColorProduct }) => {
  if (!product?.colors?.length) return null;

  // IDs that should use image previews instead of color swatches
  const previewIds = [
    "CBC-01",
    "CBC-02",
    "CBC-03",
    "CBC-04",
    "CBC-05",
    "CBC-06",
  ];
  const isDesignMode = previewIds.includes(product?.id);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {isDesignMode ? "Available Designs" : "Available Colors"}
      </h3>

      {/* Design mode (image previews) */}
      {isDesignMode ? (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]">
          {product?.colors?.map((color) => {
            const isCurrentProduct = product?.id === color?.productId;

            return (
              <button
                key={color?.productId}
                type="button"
                className={[
                  "group flex flex-col items-center outline-none",
                  "transition-all duration-200",
                  isCurrentProduct ? "cursor-default" : "hover:opacity-90",
                ].join(" ")}
                onClick={() =>
                  !isCurrentProduct &&
                  redirectToColorProduct?.(color?.productId)
                }
                disabled={isCurrentProduct}
                aria-pressed={isCurrentProduct}
              >
                <span
                  className={[
                    "inline-flex items-center justify-center border-2 w-20 h-20 sm:w-24 sm:h-24", // bigger square images
                    isCurrentProduct
                      ? "border-black"
                      : "border-gray-300 group-hover:border-gray-600",
                  ].join(" ")}
                >
                  <img
                    src={color?.name}
                    alt="Design Preview"
                    className="w-full h-full object-cover"
                  />
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Color mode (hex swatches) */
        <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-4">
          {product?.colors?.map((color) => {
            const isCurrentProduct = product?.id === color?.productId;
            const hasSwatch = !!color?.color;
            const label = color?.name || "";

            return (
              <button
                key={color?.productId || label}
                type="button"
                className={[
                  "group flex flex-col items-center outline-none",
                  "transition-all duration-200",
                  isCurrentProduct ? "cursor-default" : "hover:opacity-90",
                ].join(" ")}
                onClick={() =>
                  !isCurrentProduct &&
                  redirectToColorProduct?.(color?.productId)
                }
                disabled={isCurrentProduct}
                aria-pressed={isCurrentProduct}
                aria-label={label || "Color"}
                title={label}
              >
                <span
                  className={[
                    "inline-flex items-center justify-center rounded-full border-2 p-1",
                    isCurrentProduct
                      ? "border-black"
                      : "border-gray-300 group-hover:border-gray-600",
                  ].join(" ")}
                >
                  {hasSwatch ? (
                    <span
                      className="rounded-full w-10 h-10 flex items-center justify-center"
                      style={{ backgroundColor: color?.color }}
                    >
                      {isCurrentProduct && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                  ) : (
                    <span
                      className={[
                        "px-3 py-1 rounded-md text-sm",
                        isCurrentProduct
                          ? "bg-gray-900 text-white border-black"
                          : "bg-white text-gray-800 border-gray-300 group-hover:border-gray-600",
                      ].join(" ")}
                    >
                      {label || "—"}
                    </span>
                  )}
                </span>

                {label ? (
                  <span className="mt-2 max-w-[6.5rem] text-center text-xs font-medium text-gray-700 leading-tight truncate">
                    {label}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ColorSelection;
