import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from 'next/server';

export const GET = async () => {
    const db = await connectDB();
    const newArrivalsCollection = db.collection('products');
    try {
        const query = {
            type: { $in: [/^featured$/i] }, // case-insensitive "featured"
        };

        let sortOption = { createdAt: -1 };
        const featuredProducts = await newArrivalsCollection.find(query)
            .sort(sortOption)
            .toArray();

        const response = NextResponse.json(featuredProducts);

        // Ensure the 'no-store' directive is clear
        response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');

        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
