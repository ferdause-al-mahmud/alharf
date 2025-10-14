"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../CartProvider/CartProvider";
import { ImBin } from "react-icons/im";
import { CircularProgress } from "@mui/material";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [cartLoading, setCartLoading] = useState(true);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof fbq === "function" &&
      cart.length > 0
    ) {
      fbq("track", "ViewContent", {
        content_ids: cart.map((item) => item.id),
        content_name: cart.map((item) => item.name).join(", "),
        content_type: "product",
        value: totalPrice,
        currency: "BDT",
      });
    }
  }, [cart]);

  // Set loading to false once cart is retrieved from context
  useEffect(() => {
    setCartLoading(false);
  }, []);

  const totalPrice = cart.reduce((total, item) => {
    const itemTotal = (item.offerPrice || item.price) * item.quantity;
    return total + itemTotal;
  }, 0);

  const handleIncrement = (productId, size, quantity, availableStock) => {
    if (quantity < availableStock) {
      updateQuantity(productId, size, quantity + 1);
    }
  };

  const handleDecrement = (productId, size, quantity) => {
    if (quantity > 1) {
      updateQuantity(productId, size, quantity - 1);
    }
  };

  if (cartLoading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (cart.length === 0 && !cartLoading) {
    return (
      <div className="h-[100vh] flex flex-col gap-4 items-center justify-center">
        <p className="text-2xl sm:text-5xl">Your cart is empty</p>
        <Link
          href="/"
          className="p-5 btn-primary bg-[#242833] !text-white border-transparent hover:bg-white hover:!text-black hover:border-black border transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 py-8">
      {/* Cart Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Product</th>
            <th className="text-left p-4 hidden sm:table-cell">Quantity</th>
            <th className="text-left p-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <Image
                  src={item.imageUrl[0]}
                  alt={item?.name || "Image"}
                  width={50}
                  height={50}
                  className="object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Size: {item.selectedSize}</p>
                  <p>Price: BDT {item.offerPrice || item.price} TK</p>
                  <div className="flex items-center gap-2 sm:hidden mt-2">
                    <button
                      onClick={() =>
                        handleDecrement(
                          item.id,
                          item.selectedSize,
                          item.quantity
                        )
                      }
                      className="border border-gray-400 px-3 py-1 rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncrement(
                          item.id,
                          item.selectedSize,
                          item.quantity,
                          item.availableSizes.find(
                            (sizeObj) => sizeObj.size === item.selectedSize
                          ).availability
                        )
                      }
                      className="border border-gray-400 px-3 py-1 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-red-500 text-xl ml-2"
                    >
                      <ImBin />
                    </button>
                  </div>
                </div>
              </td>
              <td className="p-4 hidden sm:table-cell">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleDecrement(item.id, item.selectedSize, item.quantity)
                    }
                    className="border border-gray-400 px-3 py-1 rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleIncrement(
                        item.id,
                        item.selectedSize,
                        item.quantity,
                        item.availableSizes.find(
                          (sizeObj) => sizeObj.size === item.selectedSize
                        ).availability
                      )
                    }
                    className="border border-gray-400 px-3 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="text-red-500 text-xl ml-2"
                  >
                    <ImBin />
                  </button>
                </div>
              </td>
              <td className="p-4">
                BDT {(item.offerPrice || item.price) * item.quantity} TK
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-8">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-[18px] sm:text-xl font-semibold mb-2">
              Estimated total without delivery fee / ডেলিভারি ফি ছাড়া আনুমানিক
              মোট{" "}
            </p>
            <p className="text-[18px] sm:text-2xl font-bold mb-4">
              Tk {totalPrice.toFixed(2)} BDT
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Taxes, discounts and shipping calculated at checkout.
            </p>
            <div className="flex gap-4">
              <Link
                href="/checkout"
                className="w-full text-center border-2 border-black text-black py-2 rounded-md font-semibold hover:bg-black hover:text-white transition-all"
              >
                Check out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
