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
    const apiUrlWithParams = `${apiUrl}/api/winter-collections/sweatshirt?${queryParams.toString()}`;

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
  title: "Sweatshirts",
  description:
    "Stay cozy and stylish with our collection of sweatshirts, perfect for any casual occasion. These versatile pieces offer warmth and comfort, making them ideal for lounging or heading out. Available in a variety of colors and styles, our sweatshirts are designed to complement any outfit while keeping you effortlessly chic. Layer them with your favorite jeans or joggers for a laid-back look that never goes out of style.",
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
  // console.log(products);
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-6">
        <h1 className="text-3xl sm:text-5xl">Sweatshirts</h1>
        <p className="text-[14px] my-6 text-gray-600 sm:text-[18px]">
          Stay cozy and stylish with our collection of sweatshirts, perfect for
          any casual occasion. These versatile pieces offer warmth and comfort,
          making them ideal for lounging or heading out. Available in a variety
          of colors and styles, our sweatshirts are designed to complement any
          outfit while keeping you effortlessly chic. Layer them with your
          favorite jeans or joggers for a laid-back look that never goes out of
          style.
        </p>
      </div>

      <div>
        {/* Render Filters (Client Component) and pass products and currentPage */}
        {/* <Filters products={products} currentPage={page} /> */}
        <TempleteProductsContainer
          products={products}
          currentPage={page}
          basePath="/winter-collections/sweatshirt"
        />
      </div>
    </div>
  );
};

export default Page;
