const ProductPrice = ({ product }) => {
  const discountPercentage = product?.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <div className="mb-2 sm:mb-8">
      {product?.offerPrice > 0 ? (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-3xl font-bold text-gray-900">
            BDT {product?.offerPrice}
          </span>
          <div className="flex flex-col">
            <span className="text-lg text-gray-500 line-through">
              BDT {product?.price}
            </span>
            <span className="text-green-600 font-medium">
              Save {discountPercentage}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            {discountPercentage >= 15 && (
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                🔥 HOT DEAL
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-3xl font-bold text-gray-900">
            BDT {product?.price}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
