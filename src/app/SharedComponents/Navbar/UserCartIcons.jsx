import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useCart } from "@/app/CartProvider/CartProvider";
import { IoCart } from "react-icons/io5";

const UserCartIcons = ({ user, loading }) => {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
    return null; // Show a loading indicator if needed
  }

  const href = user ? "/profile" : "/login";

  return (
    <>
      {/* Navbar Icons */}
      <div className="flex flex-row items-center justify-center gap-4">
        {/* User Icon or Login Button */}
        {user ? (
          <Link href={href}>
            <div className="btn transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-[#242833] bg-[#242833] border-none px-2 flex items-center justify-center cursor-pointer">
              <FaRegUserCircle className="text-2xl text-white" />
            </div>
          </Link>
        ) : (
          <Link href="/login">
            <CiLogin className="text-2xl font-bold text-white transition-transform duration-200 ease-in-out hover:scale-110" />
          </Link>
        )}

        {/* Cart Icon with Total Quantity for Navbar */}
        <div className="relative hidden lg:block">
          <Link href="/cart">
            <IoCart className="text-2xl text-white transition-transform duration-200 ease-in-out hover:scale-110" />
          </Link>
          {totalQuantity > 0 && (
            <div className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {totalQuantity}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCartIcons;
