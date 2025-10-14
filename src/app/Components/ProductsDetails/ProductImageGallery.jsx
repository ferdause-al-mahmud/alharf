import Image from "next/image";
import { useState } from "react";

const ProductImageGallery = ({ product, mainImage, setMainImage }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleImageHover = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="lg:w-1/2 w-full">
      <div className="sticky top-24 flex flex-col items-center">
        {/* Main Image with Zoom Effect */}
        <div
          className="w-full mb-4 rounded-lg overflow-hidden relative cursor-zoom-in"
          style={{ height: "500px" }}
          onClick={() => setIsZoomed(!isZoomed)}
          onMouseMove={handleImageHover}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <div
            className={`w-full h-full transition-all duration-200 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={
              isZoomed
                ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                : {}
            }
          >
            <Image
              src={mainImage}
              alt={product?.name || "Product Image"}
              layout="fill"
              className="object-contain"
              priority={true}
            />
          </div>
          {isZoomed && (
            <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-sm shadow-md">
              Click to exit zoom
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex flex-wrap gap-2 justify-center">
          {product?.imageUrl.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                mainImage === image
                  ? "border-black scale-105"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              onClick={() => setMainImage(image)}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-cover rounded-lg"
                quality={50}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
