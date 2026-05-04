import { prisma } from "@/lib/prisma";
import ShopsClientPage from "./ShopsClientPage";

type Props = {
    searchParams?: Promise<{
        q?: string;
    }>;
};

export default async function ShopsPage({ searchParams }: Props) {
    const params = await searchParams;
    const initialQuery = params?.q ?? "";

    const dbShops = await prisma.shop.findMany({
        include: {
            reviews: {
                select: {
                    rating: true,
                },
            },
        },
        orderBy: [
            { isSponsored: "desc" },
            { isFeatured: "desc" },
            { name: "asc" },
        ],
    });
    
    const featuredShopsRaw = await prisma.shop.findMany({
        where: {
            OR: [{ isSponsored: true }, { isFeatured: true }],
        },
        include: {
            reviews: {
                select: {
                    rating: true,
                },
            },
        },
        orderBy: [
            { isFeatured: "desc" },
            { isSponsored: "desc" },
            { name: "asc" },
        ],
        take: 6,
    });
    
    const featuredShops = featuredShopsRaw.map((shop) => {
        const reviewCount = shop.reviews.length;

        const rawRating =
            reviewCount > 0
                ? shop.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
                : null;

        const rating =
            rawRating !== null ? Number(rawRating.toFixed(1)) : null;

        return {
            ...shop,
            rating,
            reviewCount,
        };
    });

    const shops = dbShops.map((shop) => {
        const reviewCount = shop.reviews.length;

        const rawRating =
            reviewCount > 0
                ? shop.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
                : null;

        const rating =
            rawRating !== null ? Number(rawRating.toFixed(1)) : null;

        return {
            ...shop,
            rating,
            reviewCount,
        };
    });

   

    return (
        <ShopsClientPage
            initialQuery={initialQuery}
            initialShops={shops}
            featuredShops={featuredShops}
        />
    );
}