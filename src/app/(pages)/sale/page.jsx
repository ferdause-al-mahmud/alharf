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
    const apiUrlWithParams = `${apiUrl}/api/sale?${queryParams.toString()}`;

    const response = await axios.get(apiUrlWithParams);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const metadata = {
  title: "Flash Sale – Huge Discounts on Top Picks",
  description:
    "Shop our limited-time Flash Sale and grab unbeatable deals on your favorite styles. Don’t miss out—exclusive discounts, trending products, and best-sellers available now while stocks last!",
};

// Server Component: Page
const Page = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page || "1");
  const sortBy = searchParams?.sortBy || "";
  const minPrice = searchParams?.minPrice || "";
  const maxPrice = searchParams?.maxPrice || "";

  const products = await getProducts(page, 16, sortBy, minPrice, maxPrice);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-6">
        <h1 className="text-3xl sm:text-5xl font-bold">Flash Sale</h1>
        <p className="text-[14px] my-6 text-gray-600 sm:text-[18px]">
          Don’t wait—our Flash Sale brings you limited-time offers on trending
          products at unbeatable prices. From must-have essentials to fashion
          favorites, enjoy massive discounts while stocks last. Shop now before
          the deals disappear!
        </p>
      </div>

      <div>
        <TempleteProductsContainer
          products={products}
          currentPage={page}
          basePath="/sale"
        />
      </div>
    </div>
  );
};

export default Page;
