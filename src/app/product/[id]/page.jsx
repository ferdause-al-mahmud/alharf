"use client";
import { useEffect, useState } from "react";
import ProductDetails from "@/app/Components/ProductsDetails/ProductDetails";
import Link from "next/link";
import { useParams } from "next/navigation"; // Import useParams
import ReactPixel from "react-facebook-pixel";

const ProductPage = () => {
  const params = useParams(); // Get dynamic route params
  const productId = params?.id; // Ensure id is defined
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return; // Ensure ID exists before fetching
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${productId}`); // Fetch product data by ID
        if (response.ok) {
          const data = await response.json();
          setProduct(data);

          // Trigger ViewContent event for Facebook Pixel
          if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "ViewContent", {
              content_name: data.name,
              content_ids: [data.id],
              content_type: "product",
              value: data.price,
              currency: "BDT", // Or your currency
              category: data.category,
              brand: "Classy Touch", // You can add the brand or any other relevant information
            });
          }
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Failed to load product");
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return (
      <div className="h-[100vh] flex flex-col gap-4 items-center justify-center ">
        <p className="text-2xl sm:text-5xl">Error</p>
        <p className="text-2xl sm:text-5xl">{error}</p>
        <Link
          href={"/"}
          className="p-5 btn-primary bg-[#242833] !text-white border-transparent hover:bg-white hover:!text-black hover:border-black border transition-all duration-300"
        >
          HOME
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 py-8 animate-pulse">
        {/* Image Skeleton */}
        <div className="lg:w-1/2 w-full flex flex-col items-center">
          <div className="w-full max-w-md mb-4">
            <div className="bg-gray-300 h-[500px] w-full rounded-lg"></div>
          </div>
          <div className="flex gap-3">
            <div className="bg-gray-300 h-[100px] w-[100px] rounded-lg"></div>
            <div className="bg-gray-300 h-[100px] w-[100px] rounded-lg"></div>
            <div className="bg-gray-300 h-[100px] w-[100px] rounded-lg"></div>
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="lg:w-1/2 w-full lg:pl-8 mt-6 lg:mt-0 flex justify-center items-center">
          <div className="w-full max-w-lg">
            <div className="bg-gray-300 h-8 w-3/4 mb-4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/3 mb-6 rounded"></div>
            <div className="bg-gray-300 h-4 w-full mb-4 rounded"></div>
            <div className="bg-gray-300 h-4 w-full mb-4 rounded"></div>
            <div className="bg-gray-300 h-4 w-full mb-6 rounded"></div>
            <div className="bg-gray-300 h-10 w-2/3 mb-6 rounded"></div>
            <div className="bg-gray-300 h-12 w-1/2 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
