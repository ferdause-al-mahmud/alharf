import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";

const MenuLinks = ({
  links,
  clothingCategories,
  winterCategories,
  pathName,
  isDropdownOpen,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const [isJoggersDropdownOpen, setIsJoggersDropdownOpen] = useState(false);
  const [isPantsDropdownOpen, setIsPantsDropdownOpen] = useState(false); // State for Pants dropdown

  // Toggle Joggers dropdown
  const toggleJoggersDropdown = () => {
    setIsJoggersDropdownOpen(!isJoggersDropdownOpen);
  };

  // Toggle Pants dropdown
  const togglePantsDropdown = () => {
    setIsPantsDropdownOpen(!isPantsDropdownOpen);
  };

  return (
    <ul className="menu menu-horizontal px-1">
      {links.map((link, idx) => (
        <li
          key={idx}
          className="relative group"
          onMouseEnter={
            link.title === "Clothing" || link.title === "Winter Collections"
              ? handleMouseEnter
              : null
          }
          onMouseLeave={
            link.title === "Clothing" || link.title === "Winter Collections"
              ? handleMouseLeave
              : null
          }
        >
          {link.title === "Clothing" || link.title === "Winter Collections" ? (
            // Non-clickable Clothing and Winter Collections link, only for hover
            <div className="p-2 text-[16px] uppercase font-medium rounded-md cursor-pointer text-[#000000] hover:underline">
              {link.title}
              <span className="inline-flex items-center">
                {isDropdownOpen ? (
                  <FiChevronUp className="text-[#000000]" />
                ) : (
                  <FiChevronDown className="text-[#000000]" />
                )}
              </span>
            </div>
          ) : (
            // Other clickable links
            <Link
              className={`p-2 text-[16px] !text-[#000000] uppercase font-medium rounded-md ${
                pathName === link.path ? " underline" : " hover:underline"
              }`}
              href={link.path}
            >
              {link.title}
            </Link>
          )}

          {/* Submenu for Clothing */}
          {link.title === "Clothing" && (
            <ul className="absolute -left-14 top-6 mt-2 p-3 bg-[#242833] border rounded-md shadow-lg z-10 w-auto transition-all duration-300 ease-in-out opacity-0 transform translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
              {clothingCategories.map((category, idx) => (
                <li key={idx} className="relative">
                  <div className="flex items-center text-[14px] justify-between">
                    {/* Only make Joggers clickable to toggle subcategories */}
                    {category.title === "Joggers" ? (
                      <div
                        onClick={toggleJoggersDropdown}
                        className={`block px-3 py-2 uppercase !text-[#000000] hover:bg-gray-700 hover:underline cursor-pointer whitespace-nowrap`}
                      >
                        {category.title}
                        <span className="ml-2 inline-flex items-center">
                          {isJoggersDropdownOpen ? (
                            <FiChevronUp className="text-[#000000]" />
                          ) : (
                            <FiChevronDown className="text-[#000000]" />
                          )}
                        </span>
                      </div>
                    ) : category.title === "Pants" ? (
                      // Make Pants clickable to toggle subcategories
                      <div
                        onClick={togglePantsDropdown}
                        className={`block px-3 py-2 uppercase !text-[#000000] hover:bg-gray-700 hover:underline cursor-pointer whitespace-nowrap`}
                      >
                        {category.title}
                        <span className="ml-2 inline-flex items-center">
                          {isPantsDropdownOpen ? (
                            <FiChevronUp className="text-[#000000]" />
                          ) : (
                            <FiChevronDown className="text-[#000000]" />
                          )}
                        </span>
                      </div>
                    ) : (
                      // Other subcategories that are clickable links
                      <Link
                        href={category.path}
                        className={`block px-3 py-2 uppercase !text-[#000000] hover:bg-gray-700 hover:underline whitespace-nowrap ${
                          pathName === category.path
                            ? " underline "
                            : "text-[#000000] hover:underline"
                        }`}
                      >
                        {category.title}
                      </Link>
                    )}
                  </div>

                  {/* Subcategories for Joggers */}
                  {category.title === "Joggers" && isJoggersDropdownOpen && (
                    <ul className="ml-4 mt-2 text-[14px] space-y-1">
                      <li>
                        <Link
                          href="/collections/baggy-joggers"
                          className="block text-[12px] px-3 py-1 uppercase !text-[#000000] hover:bg-gray-700 hover:underline"
                        >
                          Baggy Joggers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/collections/narrow-joggers"
                          className="block px-3 text-[12px] py-1 uppercase !text-[#000000] hover:bg-gray-700 hover:underline"
                        >
                          Narrow Joggers
                        </Link>
                      </li>
                    </ul>
                  )}

                  {/* Subcategories for Pants */}
                  {category.title === "Pants" && isPantsDropdownOpen && (
                    <ul className="ml-4 mt-2 text-[14px] space-y-1">
                      <li>
                        <Link
                          href="/collections/pants"
                          className="block text-[12px] px-3 py-1 uppercase !text-[#000000] hover:bg-gray-700 hover:underline"
                        >
                          Casual Pants
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/collections/baggy-pants"
                          className="block text-[12px] px-3 py-1 uppercase !text-[#000000] hover:bg-gray-700 hover:underline"
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

          {/* Submenu for Winter Collections */}
          {link.title === "Winter Collections" && (
            <ul className="absolute left-10 top-6 mt-2 p-3 bg-[#242833] border rounded-md shadow-lg z-10 w-auto transition-all duration-300 ease-in-out opacity-0 transform translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
              {winterCategories.map((category, idx) => (
                <li key={idx} className="relative">
                  <Link
                    href={category.path}
                    className={`block px-3 text-[14px] py-2 uppercase !text-[#000000] hover:bg-gray-700 hover:underline whitespace-nowrap ${
                      pathName === category.path
                        ? " underline "
                        : "text-[#000000] hover:underline"
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
  );
};

export default MenuLinks;
