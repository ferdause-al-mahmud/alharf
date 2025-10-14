import TempleteProductsContainer from "@/app/Components/TempleteProductsContainer/TempleteProductsContainer";

import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    const apiUrlWithParams = `${apiUrl}/api/collections/drop-shoulders?${queryParams.toString()}`;

    // Use axios to send a GET request
    const response = await axios.get(apiUrlWithParams);

    // Axios automatically handles non-OK responses, so just return the data
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};

export const metadata = {
  title: "Drop-Shoulders",
  description:
    "Embrace effortless style with our collection of drop shoulder garments, designed for a relaxed and modern look. This trendy silhouette features a laid-back fit that enhances comfort while providing a chic aesthetic. Perfect for layering or wearing on its own, our drop shoulder pieces come in a variety of fabrics, colors, and patterns to suit any occasion. Whether you{`'`}re dressing up for a casual outing or lounging at home, these versatile styles will elevate your wardrobe with ease and sophistication.",
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
        <h1 className="text-3xl sm:text-5xl">Drop Shoulder</h1>
        <p className="text-[14px] my-6 text-gray-600 sm:text-[18px]">
          Embrace effortless style with our collection of drop shoulder
          garments, designed for a relaxed and modern look. This trendy
          silhouette features a laid-back fit that enhances comfort while
          providing a chic aesthetic. Perfect for layering or wearing on its
          own, our drop shoulder pieces come in a variety of fabrics, colors,
          and patterns to suit any occasion. Whether you&apos;re dressing up for
          a casual outing or lounging at home, these versatile styles will
          elevate your wardrobe with ease and sophistication.
        </p>
      </div>

      <div>
        {/* Render Filters (Client Component) and pass products and currentPage */}
        {/* <Filters products={products} currentPage={page} /> */}
        <TempleteProductsContainer
          products={products}
          currentPage={page}
          basePath="/collections/drop-shoulders"
        />
      </div>
    </div>
  );
};

export default Page;
