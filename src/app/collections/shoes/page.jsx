import TempleteProductsContainer from "@/app/Components/TempleteProductsContainer/TempleteProductsContainer";

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
    const apiUrlWithParams = `${apiUrl}/api/collections/shoes?${queryParams.toString()}`;

    const res = await fetch(apiUrlWithParams, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await res.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const metadata = {
  title: "Shoes",
  description:
    "Step up your style with our collection of premium shoes, crafted for comfort, durability, and fashion-forward appeal. From casual sneakers to formal dress shoes, each pair is designed to complement your wardrobe and elevate your look. Whether you're heading to work, hitting the streets, or attending an event, our shoes deliver the perfect blend of function and flair.",
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
        <h1 className="text-3xl sm:text-5xl">Shoes</h1>
        <p className="text-[14px] my-6 text-gray-600 sm:text-[18px]">
          Step into style with our versatile shoe collection, designed for
          comfort, durability, and effortless fashion. From casual sneakers to
          sleek formal shoes, each pair is thoughtfully crafted to elevate your
          everyday look or complete your special occasion outfit. No matter the
          setting, our shoes provide the perfect foundation for any wardrobe.
        </p>
      </div>

      <div>
        {/* Render Filters (Client Component) and pass products and currentPage */}
        {/* <Filters products={products} currentPage={page} /> */}
        <TempleteProductsContainer
          products={products}
          currentPage={page}
          basePath="/collections/shoes"
        />
      </div>
    </div>
  );
};

export default Page;
