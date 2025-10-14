// /app/api/accessories/route.js
export const dynamic = 'force-dynamic';

import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    try {

        const db = await connectDB();
        const shoesCollection = db.collection('products');

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '8');
        const sortBy = searchParams.get('sortBy') || 'newest';
        const minPrice = parseFloat(searchParams.get('minPrice') || '0');
        const maxPrice = parseFloat(searchParams.get('maxPrice') || 'Infinity');

        const query = {
            category: { $regex: /^shoes$/i },
            price: { $gte: minPrice, $lte: maxPrice },
        };

        let sortOption = {};
        if (sortBy === 'lowToHigh') {
            sortOption = { price: 1 };
        } else if (sortBy === 'highToLow') {
            sortOption = { price: -1 };
        } else if (sortBy === 'newest') {
            sortOption = { createdAt: -1 };
        } else if (sortBy === 'oldest') {
            sortOption = { createdAt: 1 };
        }

        const totalProducts = await shoesCollection.countDocuments(query);
        const skip = (page - 1) * limit;

        const featuredProducts = await shoesCollection.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .toArray();

        return NextResponse.json({
            products: featuredProducts,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
        });

    } catch (error) {
        console.error('Error fetching accessories:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
};
