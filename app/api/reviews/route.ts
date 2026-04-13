import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const shopId = searchParams.get("shopId");

        if (!shopId) {
            return NextResponse.json(
                { error: "shopId is required" },
                { status: 400 }
            );
        }

        const reviews = await prisma.review.findMany({
            where: { shopId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("GET /api/reviews error:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            shopId,
            rating,
            title,
            body: reviewBody,
            authorName,
        } = body;

        if (!shopId) {
            return NextResponse.json(
                { error: "shopId is required" },
                { status: 400 }
            );
        }

        if (
            typeof rating !== "number" ||
            Number.isNaN(rating) ||
            rating < 1 ||
            rating > 5
        ) {
            return NextResponse.json(
                { error: "rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        const shop = await prisma.shop.findUnique({
            where: { id: shopId },
            select: { id: true },
        });

        if (!shop) {
            return NextResponse.json(
                { error: "Shop not found" },
                { status: 404 }
            );
        }

        const review = await prisma.review.create({
            data: {
                shopId,
                rating,
                title: title?.trim() || null,
                body: reviewBody?.trim() || null,
                authorName: authorName?.trim() || "Anonymous",
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.error("POST /api/reviews error:", error);
        return NextResponse.json(
            { error: "Failed to create review" },
            { status: 500 }
        );
    }
}