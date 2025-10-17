"use client";
import { useState, useEffect } from "react";
import { Pacifico, Assistant } from "next/font/google";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import MenuLinks from "./MenuLinks";
import SearchBar from "./SearchBar";
import UserCartIcons from "./UserCartIcons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase.config";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoCart, IoSearch } from "react-icons/io5";
import FullScreenSearch from "./FullScreenSearch";
import Link from "next/link";
import { useCart } from "@/app/CartProvider/CartProvider";

const assistant = Assistant({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
});

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenMobile, setIsDropdownOpenMobile] = useState(false);
  const isDashboard = pathName.includes("dashboard");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdownMobile = () =>
    setIsDropdownOpenMobile(!isDropdownOpenMobile);
  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);
  const [hideFloatingButtons, setHideFloatingButtons] = useState(false);

  useEffect(() => {
    const footerDivider = document.getElementById("footer-divider");

    if (!footerDivider) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideFloatingButtons(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(footerDivider);

    return () => {
      observer.unobserve(footerDivider);
    };
  }, []);

  const { cart } = useCart();
  const messengerWebLink = "https://www.facebook.com/messages/t/AlharfBD";
  const messengerMobileLink = "https://m.me/AlharfBD";

  const handleMessengerRedirect = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      const url = isMobile ? messengerMobileLink : messengerWebLink;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={`bg-[#F2DADF] fixed z-50 w-full`}>
      <div className="navbar max-w-7xl mx-auto !text-[#000000]">
        <div className="navbar-start">
          <HamburgerMenu
            links={links}
            clothingCategories={clothingCategories}
            winterCategories={winterCategories}
            pathName={pathName}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            toggleDropdownMobile={toggleDropdownMobile}
            isDropdownOpenMobile={isDropdownOpenMobile}
          />
          <Logo pacifico={pacifico} />
        </div>

        <div className="navbar-center hidden lg:flex">
          <MenuLinks
            links={links}
            clothingCategories={clothingCategories}
            pathName={pathName}
            isDropdownOpen={isDropdownOpen}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            winterCategories={winterCategories}
          />
          <SearchBar />
        </div>

        <div className="navbar-end pr-2">
          <IoSearch
            className="lg:hidden text-black mr-2 text-3xl cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          />
          <UserCartIcons user={user} loading={loading} />
        </div>
      </div>
      <FullScreenSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {!isDashboard && !hideFloatingButtons && (
        <div className="fixed bottom-[35%] md:bottom-5 right-3 z-50 flex flex-col items-center justify-center gap-2">
          <div className="relative">
            <Link
              href={messengerWebLink}
              onClick={handleMessengerRedirect}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookMessenger className="text-5xl text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110 bg-white p-2 rounded-full animate-messenger-glow" />
            </Link>
          </div>
          <div className="relative">
            <Link href="/cart">
              <IoCart className="text-5xl text-white transition-transform duration-200 ease-in-out hover:scale-110 bg-[#242833] p-2 rounded-full" />
            </Link>
            {totalQuantity > 0 && (
              <div className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const links = [
  { title: "Home", path: "/" },
  // { title: "Clothing", path: "/clothing" },
  // { title: "Accessories", path: "/accessories" },
  { title: "Shoes", path: "/collections/shoes" },
  // { title: "Winter Collections", path: "/Winter" },
];
const winterCategories = [
  // { title: "Hoodie", path: "/winter-collections/hoodie" },
  // { title: "Jacket", path: "/winter-collections/jacket" },
  // { title: "Shacket", path: "/winter-collections/shacket" },
  // { title: "Sweatshirt", path: "/winter-collections/sweatshirt" },
];
const clothingCategories = [
  // { title: "Panjabi", path: "/collections/panjabi" },
  // { title: "Pajama", path: "/collections/pajama" },
  // { title: "T-shirts", path: "/collections/t-shirts" },
  // { title: "Shirts", path: "/collections/shirts" },
  // { title: "Polo", path: "/collections/polo" },
  // { title: "Pants", path: "/collections/pants" },
  // { title: "Joggers", path: "/collections/joggers" },
];

export default Navbar;
