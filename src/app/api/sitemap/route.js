import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure fresh data on each request

export async function GET() {
    const siteUrl = "https://alharfbd.com";

    try {
        // Fetch latest product data dynamically
        const response = await fetch(`${siteUrl}/api/products`, {
            cache: "no-store",  // Ensures a fresh request
            headers: {
                "Pragma": "no-cache",
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });

        if (!response.ok) throw new Error("Failed to fetch product data");

        const data = await response.json();

        if (!data.orders || !Array.isArray(data.orders)) {
            throw new Error("Invalid API response format");
        }

        // Generate XML for product URLs
        const productsXml = data.orders.map(
            (product) => `
            <url>
                <loc>${siteUrl}/product/${product.id}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>`
        ).join("");

        // Static pages to be included in the sitemap
        const staticPages = [
            "/", "/collections/shoes",
            "/about", "/privacy-policy"
        ].map(
            (path) => `
            <url>
                <loc>${siteUrl}${path}</loc>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
            </url>`
        ).join("");

        // Build the XML Sitemap
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${staticPages}
            ${productsXml}
        </urlset>`.trim();

        return new NextResponse(xml, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });

    } catch (error) {
        console.error("Failed to generate sitemap:", error);
        return new NextResponse("Error generating sitemap", { status: 500 });
    }
}
