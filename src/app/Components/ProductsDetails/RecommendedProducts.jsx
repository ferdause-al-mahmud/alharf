import React, { useEffect } from "react";
import ProductsContainer from "../ProductsContainer/ProductsContainer";

// Shuffle utility
const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

// Check if a product is sold out
const isSoldOut = (product) => {
  const sizes = product.availableSizes;

  if (!Array.isArray(sizes)) {
    console.warn("No sizes found for product:", product);
    return true; // Consider it sold out if no size info
  }

  const allUnavailable = sizes.every((size) => {
    const available = Number(size.availability);
    return available === 0;
  });

  return allUnavailable;
};

const RecommendedProducts = ({ recommendedProducts }) => {
  if (!recommendedProducts || recommendedProducts.length === 0) {
    return null;
  }

  const inStockProducts = recommendedProducts.filter((p) => !isSoldOut(p));

  if (inStockProducts.length === 0) return null;

  const shuffled = shuffleArray(inStockProducts);

  return (
    <div className="border-t pt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Recommended Products
        </h2>
        <p className="text-gray-600">You might also like these products</p>
      </div>

      <ProductsContainer products={shuffled.slice(0, 8)} />
    </div>
  );
};

export default RecommendedProducts;
