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
    const apiUrlWithParams = `${apiUrl}/api/collections/shirts?${queryParams.toString()}`;

    const response = await axios.get(apiUrlWithParams);

    // Axios automatically parses JSON, so return the data directly
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const metadata = {
  title: "Shirts",
  description:
    "Explore our latest collection of stylish shirts perfect for any occasion. From casual outings to formal events, find the perfect fit for your wardrobe. Our range includes everything from classic button-downs to relaxed-fit casual shirts, crafted from high-quality materials for comfort and durability. Whether you're dressing up for a business meeting or keeping it laid-back for a weekend brunch, our shirts are designed to elevate your look while ensuring you feel your best.",
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
        <h1 className="text-3xl sm:text-5xl">Shirts</h1>
        <p className="text-[14px] my-6 text-gray-600 sm:text-[18px]">
          Explore our latest collection of stylish shirts perfect for any
          occasion. From casual outings to formal events, find the perfect fit
          for your wardrobe. Our range includes everything from classic
          button-downs to relaxed-fit casual shirts, crafted from high-quality
          materials for comfort and durability. Choose from a variety of colors,
          patterns, and styles to express your unique personality. Whether
          you&apos;re dressing up for a business meeting or keeping it laid-back
          for a weekend brunch, our shirts are designed to elevate your look
          while ensuring you feel your best.
        </p>
      </div>

      <div>
        {/* Render Filters (Client Component) and pass products and currentPage */}
        {/* <Filters products={products} currentPage={page} /> */}
        <TempleteProductsContainer
          products={products}
          currentPage={page}
          basePath="/collections/shirts"
        />
      </div>
    </div>
  );
};

export default Page;
