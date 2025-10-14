import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

const HamburgerMenu = ({
  clothingCategories,
  winterCategories,
  pathName,
  links,
  isMenuOpen,
  toggleMenu,
  toggleDropdownMobile,
  isDropdownOpenMobile,
}) => {
  const [isJoggersDropdownOpen, setIsJoggersDropdownOpen] = useState(false);
  const [isWinterDropdownOpen, setIsWinterDropdownOpen] = useState(false);
  const [isPantsDropdownOpen, setIsPantsDropdownOpen] = useState(false); // State for Pants dropdown
  const menuRef = useRef(null); // Create a ref for the menu container

  // Toggle Joggers dropdown
  const toggleJoggersDropdown = () => {
    setIsJoggersDropdownOpen(!isJoggersDropdownOpen);
  };

  // Toggle Winter Collections dropdown
  const toggleWinterDropdown = () => {
    setIsWinterDropdownOpen(!isWinterDropdownOpen);
  };

  // Toggle Pants dropdown
  const togglePantsDropdown = () => {
    setIsPantsDropdownOpen(!isPantsDropdownOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = (event) => {
      if (event.matches && isMenuOpen) {
        toggleMenu();
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [isMenuOpen, toggleMenu]);

  // Function to close the menu if clicked outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      toggleMenu(); // Close the menu if the click was outside the menu
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="dropdown" ref={menuRef}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost lg:hidden"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>

      <div
        className={`fixed inset-y-0 top-14 left-0 z-[10] bg-[#242833] w-64 overflow-y-auto p-2 shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <ul>
          {links.map((link, idx) => (
            <li key={idx} className="mb-2">
              <div className="flex justify-between items-center">
                {/* Clothing title without Link, triggers dropdown */}
                {link.title === "Clothing" ? (
                  <div
                    className={`p-2 text-[14px] rounded-md cursor-pointer ${
                      isDropdownOpenMobile
                        ? "text-white underline"
                        : "hover:text-white hover:underline"
                    }`}
                    onClick={toggleDropdownMobile}
                  >
                    {link.title}
                  </div>
                ) : link.title === "Winter Collections" ? (
                  // Winter Collections title triggers its own dropdown
                  <div
                    className={`p-2 text-[14px] rounded-md cursor-pointer ${
                      isWinterDropdownOpen
                        ? "text-white underline"
                        : "hover:text-white hover:underline"
                    }`}
                    onClick={toggleWinterDropdown}
                  >
                    {link.title}
                  </div>
                ) : (
                  // Normal links
                  <Link
                    className={`p-2 text-[14px] rounded-md ${
                      pathName === link.path
                        ? "text-white underline"
                        : "hover:text-white hover:underline"
                    }`}
                    href={link.path}
                  >
                    {link.title}
                  </Link>
                )}

                {/* Chevron Icon for Clothing */}
                {link.title === "Clothing" && (
                  <div onClick={toggleDropdownMobile}>
                    {isDropdownOpenMobile ? (
                      <FiChevronUp className="text-white" />
                    ) : (
                      <FiChevronDown className="text-white" />
                    )}
                  </div>
                )}

                {/* Chevron Icon for Winter Collections */}
                {link.title === "Winter Collections" && (
                  <div onClick={toggleWinterDropdown}>
                    {isWinterDropdownOpen ? (
                      <FiChevronUp className="text-white" />
                    ) : (
                      <FiChevronDown className="text-white" />
                    )}
                  </div>
                )}
              </div>

              {/* Clothing Dropdown */}
              {link.title === "Clothing" && isDropdownOpenMobile && (
                <ul className="pl-4">
                  {clothingCategories.map((category, idx) => (
                    <li key={idx} className="relative">
                      <div className="flex !text-[12px] items-center justify-between">
                        {/* Only make Joggers clickable to toggle subcategories */}
                        {category.title === "Joggers" ? (
                          <div
                            onClick={toggleJoggersDropdown}
                            className={`block px-3 py-2 uppercase !text-white hover:bg-gray-700 hover:underline cursor-pointer whitespace-nowrap`}
                          >
                            {category.title}
                            <span className="ml-2 inline-flex items-center">
                              {isJoggersDropdownOpen ? (
                                <FiChevronUp className="text-white" />
                              ) : (
                                <FiChevronDown className="text-white" />
                              )}
                            </span>
                          </div>
                        ) : category.title === "Pants" ? (
                          // Pants category with subcategories
                          <div
                            onClick={togglePantsDropdown}
                            className={`block px-3 py-2 uppercase !text-white hover:bg-gray-700 hover:underline cursor-pointer whitespace-nowrap`}
                          >
                            {category.title}
                            <span className="ml-2 inline-flex items-center">
                              {isPantsDropdownOpen ? (
                                <FiChevronUp className="text-white" />
                              ) : (
                                <FiChevronDown className="text-white" />
                              )}
                            </span>
                          </div>
                        ) : (
                          // Other subcategories that are clickable links
                          <Link
                            href={category.path}
                            className={`block px-3 py-2 uppercase !text-white hover:bg-gray-700 hover:underline whitespace-nowrap ${
                              pathName === category.path
                                ? " underline "
                                : "text-white hover:underline"
                            }`}
                          >
                            {category.title}
                          </Link>
                        )}
                      </div>

                      {/* Subcategories for Joggers */}
                      {category.title === "Joggers" &&
                        isJoggersDropdownOpen && (
                          <ul className="ml-4 mt-2 space-y-1  text-[12px]">
                            <li>
                              <Link
                                href="/collections/baggy-joggers"
                                className={`block p-2 !text-white hover:bg-gray-700 hover:underline ${
                                  pathName ===
                                  "/collections/joggers/baggy-joggers"
                                    ? "!text-white underline "
                                    : "text-white hover:underline"
                                }`}
                              >
                                Baggy Joggers
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/collections/narrow-joggers"
                                className={`block p-2 !text-white hover:bg-gray-700 hover:underline ${
                                  pathName ===
                                  "/collections/joggers/narrow-joggers"
                                    ? "!text-white underline "
                                    : "text-white hover:underline"
                                }`}
                              >
                                Narrow Joggers
                              </Link>
                            </li>
                          </ul>
                        )}

                      {/* Subcategories for Pants */}
                      {category.title === "Pants" && isPantsDropdownOpen && (
                        <ul className="ml-4 mt-2 space-y-1 text-[12px]">
                          <li>
                            <Link
                              href="/collections/pants"
                              className={`block p-2 !text-white hover:bg-gray-700 hover:underline ${
                                pathName === "/collections/pants"
                                  ? "!text-white underline "
                                  : "text-white hover:underline"
                              }`}
                            >
                              Casual Pants
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/collections/baggy-pants"
                              className={`block p-2 !text-white hover:bg-gray-700 hover:underline ${
                                pathName === "/collections/baggy-pants"
                                  ? "!text-white underline "
                                  : "text-white hover:underline"
                              }`}
                            >
                              Baggy Pants
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {/* Winter Collections Dropdown */}
              {link.title === "Winter Collections" && isWinterDropdownOpen && (
                <ul className="pl-4">
                  {winterCategories.map((category, idx) => (
                    <li key={idx} className="relative">
                      <Link
                        href={category.path}
                        className={`block px-3 text-[12px] py-2 uppercase !text-white hover:bg-gray-700 hover:underline whitespace-nowrap ${
                          pathName === category.path
                            ? "!text-white underline "
                            : "text-white hover:underline"
                        }`}
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
