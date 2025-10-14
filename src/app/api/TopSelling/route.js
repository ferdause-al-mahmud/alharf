import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from 'next/server';

export const GET = async () => {
    const db = await connectDB();
    const topSellingCollection = db.collection('products');

    try {
        const sortOption = { createdAt: -1 };
        const featuredProducts = await topSellingCollection.find({
            type: { $in: [/^featured$/i] }, // case-insensitive "featured"
        }).sort(sortOption).toArray();

        // Set 'Cache-Control' header to prevent caching
        const headers = { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' };

        return NextResponse.json(featuredProducts, { headers });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
