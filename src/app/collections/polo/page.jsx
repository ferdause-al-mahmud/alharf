import TempleteProductsContainer from "@/app/Components/TempleteProductsContainer/TempleteProductsContainer";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Modify getProducts to accept page and limit as parameters
const getProducts = async (
  page = 1,
  limit = 8,
  sortBy = "",
  minPrice = "",
  maxPrice = ""
) => {
  try {
    // Create URLSearchParams object to dynamically add query parameters
    const queryParams = new URLSearchParams();

    // Add non-empty parameters to the query string
    queryParams.append("page", page);
    queryParams.append("limit", limit);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);

    // Construct the full API URL with the dynamic query string
    const apiUrlWithParams = `${apiUrl}/api/collections/polo?${queryParams.toString()}`;
    const response = await axios.get(apiUrlWithParams);

    // Axios automatically parses JSON, so return the data directly
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const metadata = {
  title: "Polo T-Shirts",
  description:
    "Elevate your casual wardrobe with our stylish polo t-shirts, the perfect blend of comfort and sophistication. Crafted from soft, breathable fabric, these polos are ideal for everything from weekend outings to relaxed office settings.The timeless design and versatile nature of polo t-shirts make them a must-have staple for any wardrobe, effortlessly pairing with jeans, shorts, or chinos for a polished yet laid-back look.",
};

// Server Component: Page
const Page = async ({ searchParams }) => {
  // Extract query parameters with default values
  const page = parseInt(searchParams?.page || "1"); // Default to page 1
  const sortBy = searchParams?.sortBy || ""; // Default to no sorting
  const minPrice = searchParams?.minPrice || ""; // Default to no minimum price
  const maxPrice = searchParams?.maxPrice || ""; // Default to no maximum price

  // Fetch the products with updated parameters
  const products = await getProducts(page, 16, sortBy, minPrice, maxPrice);
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-6">
        <h1 className="text-3xl sm:text-5xl">Polo T-Shirts</h1>
        <p className="text-[14px] my-6 text-gray-600 sm:text-[18px]">
          Elevate your casual wardrobe with our stylish polo t-shirts, the
          perfect blend of comfort and sophistication. Crafted from soft,
          breathable fabric, these polos are ideal for everything from weekend
          outings to relaxed office settings.The timeless design and versatile
          nature of polo t-shirts make them a must-have staple for any wardrobe,
          effortlessly pairing with jeans, shorts, or chinos for a polished yet
          laid-back look.
        </p>
      </div>

      <div>
        {/* Render Filters (Client Component) and pass products and currentPage */}
        {/* <Filters products={products} currentPage={page} /> */}
        <TempleteProductsContainer
          products={products}
          currentPage={page}
          basePath="/collections/polo"
        />
      </div>
    </div>
  );
};

export default Page;
