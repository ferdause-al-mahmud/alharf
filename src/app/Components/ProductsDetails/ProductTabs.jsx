import React from "react";

const ProductTabs = ({ product, activeTab, setActiveTab }) => (
  <div className="">
    <div className="border-b border-gray-200">
      <div className="flex overflow-x-auto styled-scrollbar">
        <button
          className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
            activeTab === "details"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Product Details
        </button>
      </div>
    </div>

    <div className="py-6">
      {activeTab === "details" && (
        <div className="prose max-w-none">
          {product?.description &&
            (product?.description.includes("<") &&
            product?.description.includes(">") ? (
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              />
            ) : (
              <p className="text-gray-700">{product?.description}</p>
            ))}
        </div>
      )}
    </div>
  </div>
);

export default ProductTabs;
