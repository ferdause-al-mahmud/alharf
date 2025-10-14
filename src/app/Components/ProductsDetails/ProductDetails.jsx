"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/app/CartProvider/CartProvider";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Breadcrumb from "./Breadcrumb";
import ProductImageGallery from "./ProductImageGallery";
import ProductPrice from "./ProductPrice";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import QuantitySelector from "./QuantitySelector";
import ActionButtons from "./ActionButtons";
import DeliveryInfo from "./DeliveryInfo";
import ProductTabs from "./ProductTabs";
import RecommendedProducts from "./RecommendedProducts";

// Out of Stock Alert Component
const OutOfStockAlert = ({ isOutOfStock }) => {
  if (!isOutOfStock) return null;

  return (
    <div className="mb-2 sm:mb-8 flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
      <svg
        className="w-6 h-6 text-red-600 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-red-600 font-bold text-xl">
        Currently Out of Stock
      </span>
    </div>
  );
};

// Main ProductDetails Component
const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState(product?.imageUrl[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);

  // Fetch recommended products
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      if (!product?.category) return;

      setIsLoadingRecommended(true);
      try {
        const categorySlug = (
          product.subcategory || product.category
        ).toLowerCase();
        const winterCategories = ["hoodie", "jacket", "shacket", "sweatshirt"];

        const isWinter = winterCategories.includes(categorySlug);
        const pathPrefix = isWinter ? "winter-collections" : "collections";

        const response = await fetch(
          `/api/${pathPrefix}/${categorySlug}?limit=16`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data?.products);
        // Filter out the current product from recommendations
        const filteredProducts = data?.products?.filter(
          (item) => item.id !== product.id
        );
        setRecommendedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        toast.error("Failed to load recommended products");
      } finally {
        setIsLoadingRecommended(false);
      }
    };

    fetchRecommendedProducts();
  }, [product?.category, product?.id]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "BDT",
          value: product.offerPrice || product.price,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              price: product.offerPrice || product.price,
              quantity: 1,
            },
          ],
        },
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize, quantity);

      // Facebook Pixel
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "AddToCart", {
          content_ids: [product.id],
          content_name: product.name,
          content_type: "product",
          value: product.offerPrice || product.price,
          currency: "BDT",
        });
      }

      // Google Tag Manager Data Layer Push
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "add_to_cart",
          ecommerce: {
            currency: "BDT",
            value: (product.offerPrice || product.price) * quantity,
            items: [
              {
                item_id: product.id,
                item_name: product.name,
                price: product.offerPrice || product.price,
                quantity,
              },
            ],
          },
        });
      }

      confirmAlert({
        title: "Product Added to Cart",
        message: "Would you like to continue shopping or view your cart?",
        buttons: [
          { label: "View Cart", onClick: () => router.push("/cart") },
          { label: "Continue Shopping" },
        ],
      });
    } else {
      toast.error("Please select a size first");
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }

    addToCart(product, selectedSize, quantity);

    //initaiteCheckout datalayer
    // Facebook Pixel
    if (window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_ids: [product.id],
        content_name: product.name,
        content_type: "product",
        value: product.offerPrice || product.price,
        currency: "BDT",
      });
    }

    // Google Tag Manager Data Layer Push
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "initiateCheckout",
        ecommerce: {
          currency: "BDT",
          value: (product.offerPrice || product.price) * quantity,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              price: product.offerPrice || product.price,
              quantity,
            },
          ],
        },
      });
    }

    //add to cart data layer

    // Facebook Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "AddToCart", {
        content_ids: [product.id],
        content_name: product.name,
        content_type: "product",
        value: product.offerPrice || product.price,
        currency: "BDT",
      });
    }

    // Google Tag Manager Data Layer Push
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "BDT",
          value: (product.offerPrice || product.price) * quantity,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              price: product.offerPrice || product.price,
              quantity,
            },
          ],
        },
      });
    }

    router.push("/checkout");
  };

  const selectSize = (size) => {
    toast.success(`Selected Size: ${size}`);
    setSelectedSize(size);
    setQuantity(1);
  };

  const redirectToColorProduct = (productId) => {
    router.push(`/product/${productId}`);
  };

  const isOutOfStock = product.availableSizes.every(
    (sizeObj) => sizeObj.availability == 0
  );

  const handleRecommendedProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 py-8">
      <Breadcrumb product={product} />

      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <ProductImageGallery
          product={product}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />

        <div className="lg:w-1/2 w-full flex flex-col">
          {/* Product Title Section */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
          </div>

          <ProductPrice product={product} />
          <ColorSelection
            product={product}
            redirectToColorProduct={redirectToColorProduct}
          />
          <SizeSelection
            product={product}
            selectedSize={selectedSize}
            selectSize={selectSize}
          />
          <QuantitySelector
            product={product}
            selectedSize={selectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            isOutOfStock={isOutOfStock}
          />
          <OutOfStockAlert isOutOfStock={isOutOfStock} />
          <ActionButtons
            selectedSize={selectedSize}
            isOutOfStock={isOutOfStock}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
          />
          <DeliveryInfo />
        </div>
      </div>

      <ProductTabs
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <RecommendedProducts
        currentProduct={product}
        recommendedProducts={recommendedProducts}
        onProductClick={handleRecommendedProductClick}
        isLoading={isLoadingRecommended}
      />
    </div>
  );
};

export default ProductDetails;
