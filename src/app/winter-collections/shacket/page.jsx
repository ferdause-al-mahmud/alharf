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
    const apiUrlWithParams = `${apiUrl}/api/winter-collections/shacket?${queryParams.toString()}`;

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
  title: "Shacket",
  description:
    "Embrace the best of both worlds with our trendy shacket, combining the structure of a jacket with the comfort of a shirt. Perfect for layering, these versatile pieces can be dressed up or down, making them a staple in any wardrobe. With various colors and patterns available, a shacket adds a stylish touch to any ensemble while keeping you cozy and chic.",
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
        <h1 className="text-3xl sm:text-5xl">Shacket</h1>
        <p className="text-[14px] my-6 text-gray-600 sm:text-[18px]">
          Embrace the best of both worlds with our trendy shacket, combining the
          structure of a jacket with the comfort of a shirt. Perfect for
          layering, these versatile pieces can be dressed up or down, making
          them a staple in any wardrobe. With various colors and patterns
          available, a shacket adds a stylish touch to any ensemble while
          keeping you cozy and chic.
        </p>
      </div>

      <div>
        {/* Render Filters (Client Component) and pass products and currentPage */}
        {/* <Filters products={products} currentPage={page} /> */}
        <TempleteProductsContainer
          products={products}
          currentPage={page}
          basePath="/winter-collections/shacket"
        />
      </div>
    </div>
  );
};

export default Page;
