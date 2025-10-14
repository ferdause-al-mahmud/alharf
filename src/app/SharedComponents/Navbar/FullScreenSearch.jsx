import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

const FullScreenSearch = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Close the overlay on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial render

    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  // Define handleSearch using useCallback
  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(`/api/products`, {
        params: { name: searchQuery },
      });
      setProducts(response.data.products || []); // Ensure correct key (not `orders`)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts([]); // Clear products if no input
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
      setIsTyping(false);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, handleSearch]); // ✅ Added handleSearch as a dependencys

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center p-4">
        <div className="w-full max-w-lg relative flex items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsTyping(true);
            }}
            className="w-full p-3 text-lg rounded bg-gray-100 text-black outline-none"
            placeholder="Search for products..."
          />
          <button
            onClick={onClose}
            className="absolute right-3 text-2xl text-gray-500"
          >
            <IoClose />
          </button>
        </div>

        {searchQuery.trim() && (
          <div className="w-full max-w-lg bg-white text-black rounded-lg overflow-y-auto max-h-[400px] shadow-lg">
            {isTyping && <p className="p-4">Loading...</p>}
            {products.length > 0 ? (
              <div className="p-4 grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center border-b pb-4"
                  >
                    <Image
                      src={product.imageUrl[0]}
                      alt={product?.name || "Image"}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <div className="ml-4">
                      <p className="text-lg font-semibold">{product.name}</p>
                      {product.offerPrice ? (
                        <>
                          <span className="text-gray-500 line-through">
                            BDT {product.price} TK
                          </span>
                          <span className="ml-2 text-gray-900 font-semibold">
                            BDT {product.offerPrice} TK
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-900 font-semibold">
                          BDT {product.price} TK
                        </span>
                      )}
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
    )
  );
};

export default FullScreenSearch;
