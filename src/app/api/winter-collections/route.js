import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from 'next/server'; // Correct import for Next.js 13+ API routes

export const GET = async (req) => {
    const db = await connectDB();
    const winterCollection = db.collection('products');

    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1'); // Default to page 1
    const limit = parseInt(searchParams.get('limit') || '8'); // Default to 8 products per page
    const sortBy = searchParams.get('sortBy') || 'newest'; // Default to no sorting
    const minPrice = parseFloat(searchParams.get('minPrice') || '0'); // Default to 0
    const maxPrice = parseFloat(searchParams.get('maxPrice') || 'Infinity'); // Default to Infinity

    try {
        // MongoDB query to filter products for winter collection using regex
        const query = {
            category: {
                $regex: /(hoodie|sweatshirt|jacket|shacket)/i // Case-insensitive regex for matching categories
            },
            price: { $gte: minPrice, $lte: maxPrice } // Apply price filter
        };

        // Handle sorting based on 'sortBy' query parameter
        let sortOption = {};
        if (sortBy === 'lowToHigh') {
            sortOption = { price: 1 }; // Ascending order (lowest price first)
        } else if (sortBy === 'highToLow') {
            sortOption = { price: -1 }; // Descending order (highest price first)
        } else if (sortBy === 'newest') {
            sortOption = { createdAt: -1 }; // Sort by newest first
        } else if (sortBy === 'oldest') {
            sortOption = { createdAt: 1 }; // Sort by oldest first
        } else {
            // Default case: sort by newest if no valid sortBy option is provided
            sortOption = { createdAt: -1 };
        }

        // Count total products that match the query
        const totalProducts = await winterCollection.countDocuments(query);

        // Calculate the number of products to skip for pagination
        const skip = (page - 1) * limit;

        // Fetch the paginated and sorted products
        const featuredProducts = await winterCollection.find(query)
            .sort(sortOption) // Apply sorting
            .skip(skip) // Skip products for pagination
            .limit(limit) // Limit the number of products per page
            .toArray();

        // Return the paginated products along with metadata (total count, current page, etc.)
        return NextResponse.json({
            products: featuredProducts,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });

    } catch (error) {
        console.error(error);
        // Return error response using NextResponse
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
