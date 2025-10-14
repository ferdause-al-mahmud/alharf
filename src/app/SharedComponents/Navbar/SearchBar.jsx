"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null); // Reference for outside click detection

  // Memoizing handleSearch to prevent unnecessary re-renders
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return; // Prevent API call for empty queries

    try {
      const response = await axios.get(`/api/products`, {
        params: { name: searchQuery },
      });

      setProducts(response.data.orders || []); // Ensure correct data mapping
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setProducts([]);
      }
      setIsTyping(false);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [handleSearch, searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
    setIsOpen(true); // Open the results div on input change
  };

  // Close the search results div on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false); // Close the search results div
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="h-12 px-4 py-3 bg-[#efefef] rounded-[62px] gap-3 flex items-center justify-center w-3/4 max-w-lg">
        <div>
          <CiSearch onClick={handleSearch} className="cursor-pointer" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)} // Open the results div on focus
          className="text-black/40 text-base bg-[#efefef] outline-none w-full"
          placeholder="Search for products..."
        />
      </div>

      {isOpen && searchQuery.trim() && (
        <div
          ref={searchRef}
          className="absolute top-full mt-2 w-[80vw] bg-white text-black overflow-y-auto max-h-[400px] border border-gray-200 rounded-lg shadow-lg mx-auto left-1/2 transform -translate-x-1/2"
        >
          {isTyping && <p className="p-4">Loading...</p>}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center border-b border-gray-300 pb-4"
                >
                  <div className="w-1/3">
                    <Image
                      src={product.imageUrl[0]}
                      alt={product?.name || "Image"}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 pl-4">
                    <p className="text-lg font-semibold">{product.name}</p>
                    <div className="flex flex-col-reverse items-start">
                      {product?.offerPrice ? (
                        <>
                          <span className="text-lg text-gray-500 line-through">
                            BDT {product?.price} TK
                          </span>
                          <span className="text-xl font-semibold text-gray-900">
                            BDT {product?.offerPrice} TK
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-semibold text-gray-900">
                          BDT {product?.price} TK
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !isTyping && <p className="p-4">No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
