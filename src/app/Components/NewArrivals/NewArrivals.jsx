"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import NaProducts from "./NaProducts";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set filters and sorting options as state variables (customize as needed)
  const [sortBy, setSortBy] = useState("newest"); // Options: 'newest', 'lowToHigh', 'highToLow'
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const limit = 8; // Limit the number of products fetched

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/new-arrivals`, {
          headers: {
            "Cache-Control": "no-store, max-age=0, must-revalidate",
          },
          params: {
            limit,
            sortBy,
            minPrice,
            maxPrice,
          },
        });

        setProducts(response.data.products); // Update with fetched products
      } catch (error) {
        console.error("Error fetching new products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy, minPrice, maxPrice]); // Re-fetch on filter/sort changes

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div>
        <div className="relative mb-12 flex flex-col items-center justify-center">
          <h2
            className="text-3xl sm:text-5xl font-light text-[#1a1a1a] tracking-wider"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            New Arrivals
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-amber-600 to-amber-800 mt-4 rounded"></div>
        </div>
        <NaProducts products={products} loading={loading} />
      </div>

      {/* Link to Full Collection */}
      <div className="flex justify-center items-center mt-4">
        <Link
          href={"/collections/new-arrivals"}
          className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-lg  btn-primary bg-[#242833] text-white border-transparent hover:bg-white hover:text-black hover:border-black border transition-all duration-300"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default NewArrivals;
