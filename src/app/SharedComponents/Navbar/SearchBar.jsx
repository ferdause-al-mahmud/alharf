"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/products?name=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setProducts(data.orders || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setProducts([]);
        setIsLoading(false);
      }
      setIsTyping(false);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [handleSearch, searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
    setIsOpen(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setProducts([]);
    setIsOpen(false);
  };

  // Close search results on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="lg:flex justify-center relative hidden">
      <div className="relative w-full max-w-lg">
        {/* Enhanced search input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/8 to-teal-500/8 rounded-xl blur group-hover:blur-md transition-all duration-300" />
          <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-gray-300/30 group-hover:border-emerald-400/40 transition-all duration-300 group-hover:shadow-lg">
            <div className="flex items-center px-4 py-2">
              <div className="text-gray-500 group-hover:text-emerald-600 transition-colors duration-200 mr-3">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                className="flex-1 bg-transparent text-gray-700 text-base outline-none placeholder-gray-500"
                placeholder="Search for products..."
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="ml-2 p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced results dropdown */}
        {isOpen && searchQuery.trim() && (
          <div
            ref={searchRef}
            className="absolute top-full mt-2 w-full bg-[#F5EFDF] rounded-xl shadow-xl border border-gray-300/40 overflow-hidden z-50 animate-in slide-in-from-top duration-300"
          >
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              {isLoading || isTyping ? (
                <div className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full" />
                      <div className="absolute inset-0 animate-ping h-6 w-6 border border-emerald-500/20 rounded-full" />
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium">
                    Searching products...
                  </p>
                </div>
              ) : products.length > 0 ? (
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-sm font-medium text-gray-600">
                      Found {products.length} products
                    </span>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 ml-4" />
                  </div>
                  {products.map((product, index) => (
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      className="group flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-emerald-50/80 hover:to-teal-50/80 border border-transparent hover:border-emerald-200/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.01] hover:shadow-sm"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {/* Enhanced product image */}
                      <div className="relative overflow-hidden rounded-lg bg-gray-50 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <img
                          src={
                            product?.imageUrl
                              ? product?.imageUrl[0]
                              : product?.variants[0]?.images[0]
                          }
                          alt={product?.name || "Product"}
                          className="w-16 h-16 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Enhanced product details */}
                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors duration-200 truncate mb-1">
                          {product.name}
                        </h3>

                        {/* Enhanced price section */}
                        <div className="flex items-center gap-3">
                          {product.offerPrice ? (
                            <>
                              <span className="text-lg font-bold text-green-600 group-hover:text-green-700 transition-colors duration-200">
                                ৳{product.offerPrice}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ৳{product.price}
                              </span>
                              <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium rounded-full shadow-sm">
                                {Math.round(
                                  ((product.price - product.offerPrice) /
                                    product.price) *
                                    100
                                )}
                                % OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-gray-800 group-hover:text-emerald-700 transition-colors duration-200">
                              ৳{product.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Subtle hover indicator */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-emerald-600 transform group-hover:translate-x-1 transition-transform duration-200">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                !isTyping && (
                  <div className="p-12 text-center">
                    <div className="mb-4 text-gray-300">
                      <Search size={48} className="mx-auto opacity-50" />
                    </div>
                    <p className="text-lg text-gray-600 mb-2">
                      No products found
                    </p>
                    <p className="text-gray-400">
                      Try searching with different keywords
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #14b8a6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0d9488);
        }

        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: animate-in 0.3s ease-out forwards;
        }

        .slide-in-from-top {
          animation: slide-in-from-top 0.3s ease-out;
        }

        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
