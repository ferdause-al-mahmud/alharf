import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IoClose, IoSearch, IoSparkles } from "react-icons/io5";
import Image from "next/image";

const FullScreenSearch = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Close the overlay on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/products?name=${encodeURIComponent(searchQuery)}`
      );
      setProducts(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
      setIsTyping(false);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, handleSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Animated backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Main content */}
      <div className="relative w-full max-w-2xl mx-4 mt-8 animate-in slide-in-from-top-4 duration-300">
        {/* Search header */}
        <div className="relative mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
              <div className="absolute left-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                <IoSearch size={24} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsTyping(true);
                }}
                className="w-full py-4 pl-14 pr-16 text-lg bg-transparent text-gray-800 placeholder-gray-400 outline-none rounded-2xl"
                placeholder="Search for products..."
                autoFocus
              />
              <button
                onClick={onClose}
                className="absolute right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
              >
                <IoClose size={24} />
              </button>
            </div>
          </div>

          {/* Search indicator */}
          {searchQuery && (
            <div className="flex items-center justify-center mt-2 text-sm text-gray-300">
              {isLoading || isTyping ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full" />
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-blue-400">
                  <IoSparkles size={16} />
                  <span>{products.length} results found</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results container */}
        {searchQuery.trim() && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-h-[60vh] animate-in slide-in-from-bottom-4 duration-300">
            {isLoading || isTyping ? (
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin h-8 w-8 border-3 border-blue-400 border-t-transparent rounded-full" />
                </div>
                <p className="text-gray-600 text-lg">
                  Finding products for you...
                </p>
              </div>
            ) : products.length > 0 ? (
              <div className="overflow-y-auto max-h-[50vh] custom-scrollbar">
                <div className="p-6 space-y-4">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="group flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {/* Product image */}
                      <div className="relative overflow-hidden rounded-xl bg-gray-100 group-hover:shadow-lg transition-shadow duration-300">
                        <Image
                          src={
                            product?.imageUrl
                              ? product?.imageUrl[0]
                              : product?.variants[0]?.images[0]
                          }
                          alt={product?.name || "Product"}
                          width={80}
                          height={80}
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Product details */}
                      <div className="ml-6 flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                          {product.name}
                        </h3>

                        {/* Price section */}
                        <div className="flex items-center gap-3">
                          {product.offerPrice ? (
                            <>
                              <span className="text-gray-400 line-through text-lg">
                                ৳{product.price}
                              </span>
                              <span className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-200">
                                ৳{product.offerPrice}
                              </span>
                              <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full shadow-lg">
                                {Math.round(
                                  ((product.price - product.offerPrice) /
                                    product.price) *
                                    100
                                )}
                                % OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                              ৳{product.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Hover arrow */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500">
                        <svg
                          className="w-6 h-6"
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
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="mb-4 text-gray-300">
                  <IoSearch size={48} className="mx-auto opacity-50" />
                </div>
                <p className="text-xl text-gray-600 mb-2">No products found</p>
                <p className="text-gray-400">
                  Try searching with different keywords
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick suggestions (optional) */}
        {/* {!searchQuery && (
          <div className="mt-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <p className="text-center text-gray-300 mb-4 text-lg">
              Popular searches
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Electronics", "Fashion", "Home & Garden", "Sports"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105 border border-white/20"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        )} */}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }

        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: animate-in 0.3s ease-out forwards;
        }

        .slide-in-from-top-4 {
          animation: slide-in-from-top 0.3s ease-out;
        }

        .slide-in-from-bottom-4 {
          animation: slide-in-from-bottom 0.3s ease-out;
        }

        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-from-bottom {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FullScreenSearch;
