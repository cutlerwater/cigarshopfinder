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
        id: shop.id,
        slug: shop.slug,
        name: shop.name,
        city: shop.city,
        stateabb: shop.stateabb,
        state: shop.state,
        zip: shop.zip,
        address: shop.address,
        phone: shop.phone,
        website: shop.website ?? undefined,
        description: shop.description,
        image: shop.image ?? undefined,
        hasLounge: shop.hasLounge,
        hasHumidor: shop.hasHumidor,
        sellsAccessories: shop.sellsAccessories,
        latitude: shop.latitude,
        longitude: shop.longitude,
        isFeatured: shop.isFeatured,
        isSponsored: shop.isSponsored,

        hasPadrons: shop.hasPadrons,
        hasDavidoffs: shop.hasDavidoffs,
        hasOpusX: shop.hasOpusX,
        hasAcid: shop.hasAcid,
        hasPipeTobacco: shop.hasPipeTobacco,
        hasMemberAccess: shop.hasMemberAccess,
        hasEvents: shop.hasEvents,
        hasHooka: shop.hasHooka,
        hasliquorlicense: shop.hasliquorlicense,
        canbringinliquor: shop.canbringinliquor,
        hasinternetaccess: shop.hasinternetaccess,
        hascoffeemaker: shop.hascoffeemaker,
        hasicemaker: shop.hasicemaker,
        hasBigTV: shop.hasBigTV,

        rating: shop.rating,
        reviewCount: shop.reviewCount,
    }));

    return (
        <ShopsClientPage
            initialQuery={initialQuery}
            initialShops={initialShops}
        />
    );
}