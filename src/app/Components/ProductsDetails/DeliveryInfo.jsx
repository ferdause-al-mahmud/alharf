import React from "react";

const DeliveryInfo = () => (
  <div className="mb-2 sm:mb-8 bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold mb-3 flex items-center">
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
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Delivery Information
    </h3>
    <div className="space-y-2 text-sm">
      <div className="flex items-center">
        <svg
          className="w-4 h-4 mr-2 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>Estimated delivery: 2-4 business days</span>
      </div>
      <div className="flex items-center">
        <svg
          className="w-4 h-4 mr-2 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>30-day easy returns</span>
      </div>
    </div>
  </div>
);

export default DeliveryInfo;
