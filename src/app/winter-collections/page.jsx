import TempleteProductsContainer from "@/app/Components/TempleteProductsContainer/TempleteProductsContainer";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getProducts = async (
  page = 1,
  limit = 8,
  sortBy = "",
  minPrice = "",
  maxPrice = ""
) => {
  try {
    const queryParams = new URLSearchParams();

    queryParams.append("page", page);
    queryParams.append("limit", limit);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);

    const apiUrlWithParams = `${apiUrl}/api/winter-collections?${queryParams.toString()}`;

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
  title: "Winter Collections",
  description: `Stay warm and stylish this season with our Winter Collections, featuring an array of cozy and versatile pieces:

- **Hoodies**: Experience ultimate comfort with classic designs crafted for both lounging and layering.
- **Sweatshirts**: Keep it simple and snug with timeless sweatshirts made from soft, durable fabric.
- **Jackets**: Brave the cold in style with our insulated jackets designed for warmth and functionality.
- **Shackets**: A perfect hybrid of shirt and jacket, these trendy layers offer lightweight warmth with a stylish twist.
    
Discover the perfect addition to your winter wardrobe today!`,
};

const Page = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page || "1"); // Default to page 1
  const sortBy = searchParams?.sortBy || ""; // Default to no sorting
  const minPrice = searchParams?.minPrice || ""; // Default to no minimum price
  const maxPrice = searchParams?.maxPrice || ""; // Default to no maximum price

  const products = await getProducts(page, 16, sortBy, minPrice, maxPrice);
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-6">
        <h1 className="text-3xl sm:text-5xl">Winter Collections</h1>
        <p className="text-[14px] my-6 text-gray-600 sm:text-[18px]">
          Stay warm and stylish this season with our Winter Collections,
          featuring an array of cozy and versatile pieces:
        </p>
        <ul className="list-disc ml-6 text-[14px] sm:text-[18px] text-gray-600">
          <li>
            <strong>Hoodies</strong>: Experience ultimate comfort with classic
            designs crafted for both lounging and layering.
          </li>
          <li>
            <strong>Sweatshirts</strong>: Keep it simple and snug with timeless
            sweatshirts made from soft, durable fabric.
          </li>
          <li>
            <strong>Jackets</strong>: Brave the cold in style with our insulated
            jackets designed for warmth and functionality.
          </li>
          <li>
            <strong>Shackets</strong>: A perfect hybrid of shirt and jacket,
            these trendy layers offer lightweight warmth with a stylish twist.
          </li>
        </ul>
      </div>

      <div>
        <TempleteProductsContainer
          products={products}
          currentPage={page}
          basePath="/winter-collections"
        />
      </div>
    </div>
  );
};

export default Page;
