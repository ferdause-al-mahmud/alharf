import React from "react";

const Breadcrumb = ({ product }) => (
  <nav className="flex text-sm text-gray-600 mb-6">
    <a href="/" className="hover:text-black transition-colors">
      Home
    </a>
    <span className="mx-2">/</span>
    <a
      href={`/collections/${
        product?.subcategory?.toLowerCase() || product?.category?.toLowerCase()
      }`}
      className="hover:text-black transition-colors"
    >
      {product?.subcategory || product?.category}
    </a>
    <span className="mx-2">/</span>
    <span className="text-gray-900 font-medium">{product?.name}</span>
  </nav>
);

export default Breadcrumb;
