import ShopsClientPage from "./ShopsClientPage";
import { prisma } from "@/lib/prisma";

type Props = {
    searchParams?: Promise<{
        q?: string;
    }>;
};

export default async function ShopsPage({ searchParams }: Props) {
    const params = await searchParams;
    const initialQuery = params?.q ?? "";

    const dbShops = await prisma.shop.findMany({
        orderBy: [
            { isSponsored: "desc" },
            { name: "asc" },
        ],
    });

    const initialShops = dbShops.map((shop) => ({
        ...shop,
        website: shop.website ?? undefined,
        image: shop.image ?? undefined,
    }));

    return (
        <ShopsClientPage
            initialQuery={initialQuery}
            initialShops={initialShops}
        />
    );
}