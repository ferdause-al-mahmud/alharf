import TsProducts from "./TsProducts";

// Use NEXT_PUBLIC_API_URL for client-side environment variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getProducts = async () => {
    try {
        // Fetch data from the API
        const res = await fetch(`${apiUrl}/api/TopSelling`);

        // Check if the response is okay
        if (!res.ok) {
            throw new Error("Failed to fetch top-selling products");
        }

        // Parse the JSON response
        const products = await res.json();
        return products;
    } catch (error) {
        console.error("Error fetching top-selling products:", error);
        return []; // Return an empty array if there's an error
    }
};

const TopSelling = async () => {
    const products = await getProducts();
    if (!products || products.length === 0) {
        return <div>No products available</div>;
    }
    // Ensure that `products` is an array before rendering
    return (
        <div className="max-w-7xl mx-auto my-10">
            <div>
                <h2 className="text-center text-3xl font-bold mb-8">Top Selling Products</h2>
                {products.length > 0 ? (
                    <TsProducts products={products} />
                ) : (
                    <p className="text-5xl text-center py-20 text-red-500">No products available at the moment.</p>
                )}
            </div>
            <div className="flex justify-center items-center mt-4">
                <button className="p-5 btn-primary bg-[#242833] text-white border-transparent hover:bg-white hover:text-black hover:border-black border transition-all duration-300">
                    Show All
                </button>
            </div>
        </div>
    );
};

export default TopSelling;
