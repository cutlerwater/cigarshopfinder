import { PrismaClient } from "@prisma/client";
import { shops } from "../lib/shops";

const prisma = new PrismaClient();

async function main() {
    for (const shop of shops) {
        await prisma.shop.upsert({
            where: { slug: shop.slug },
            update: {
                name: shop.name,
                city: shop.city,
                state: shop.state,
                stateabb: shop.stateabb,
                zip: shop.zip,
                address: shop.address,
                phone: shop.phone,
                website: shop.website ?? null,
                description: shop.description,
                image: "image" in shop ? (shop as { image?: string }).image ?? null : null,
                hasLounge: shop.hasLounge,
                hasHumidor: shop.hasHumidor,
                sellsAccessories: shop.sellsAccessories,
                latitude: "latitude" in shop ? (shop as { latitude?: number | null }).latitude ?? null : null,
                longitude: "longitude" in shop ? (shop as { longitude?: number | null }).longitude ?? null : null,
                isFeatured: "isFeatured" in shop ? (shop as { isFeatured?: boolean }).isFeatured ?? false : false,
                isSponsored: "isSponsored" in shop ? (shop as { isSponsored?: boolean }).isSponsored ?? false : false,

                hasPadrons: "hasPadrons" in shop ? (shop as { hasPadrons?: boolean }).hasPadrons ?? false : false,
                hasDavidoffs: "hasDavidoffs" in shop ? (shop as { hasDavidoffs?: boolean }).hasDavidoffs ?? false : false,
                hasOpusX: "hasOpusX" in shop ? (shop as { hasOpusX?: boolean }).hasOpusX ?? false : false,
                hasAcid: "hasAcid" in shop ? (shop as { hasAcid?: boolean }).hasAcid ?? false : false,
                hasPipeTobacco: "hasPipeTobacco" in shop ? (shop as { hasPipeTobacco?: boolean }).hasPipeTobacco ?? false : false,
                hasMemberAccess: "hasMemberAccess" in shop ? (shop as { hasMemberAccess?: boolean }).hasMemberAccess ?? false : false,
                hasEvents: "hasEvents" in shop ? (shop as { hasEvents?: boolean }).hasEvents ?? false : false,
                hasHooka: "hasHooka" in shop ? (shop as { hasHooka?: boolean }).hasHooka ?? false : false,
                hasliquorlicense: "hasliquorlicense" in shop ? (shop as { hasliquorlicense?: boolean }).hasliquorlicense ?? false : false,
                canbringinliquor: "canbringinliquor" in shop ? (shop as { canbringinliquor?: boolean }).canbringinliquor ?? false : false,
                hasinternetaccess: "hasinternetaccess" in shop ? (shop as { hasinternetaccess?: boolean }).hasinternetaccess ?? false : false,
                hascoffeemaker: "hascoffeemaker" in shop ? (shop as { hascoffeemaker?: boolean }).hascoffeemaker ?? false : false,
                hasicemaker: "hasicemaker" in shop ? (shop as { hasicemaker?: boolean }).hasicemaker ?? false : false,
                hasBigTV: "hasBigTV" in shop ? (shop as { hasBigTV?: boolean }).hasBigTV ?? false : false,

                rating: "rating" in shop ? (shop as { rating?: number | null }).rating ?? null : null,
                reviewCount: "reviewCount" in shop ? (shop as { reviewCount?: number | null }).reviewCount ?? 0 : 0,
            },
            create: {
                name: shop.name,
                slug: shop.slug,
                city: shop.city,
                state: shop.state,
                stateabb: shop.stateabb,
                zip: shop.zip,
                address: shop.address,
                phone: shop.phone,
                website: shop.website ?? null,
                description: shop.description,
                image: "image" in shop ? (shop as { image?: string }).image ?? null : null,
                hasLounge: shop.hasLounge,
                hasHumidor: shop.hasHumidor,
                sellsAccessories: shop.sellsAccessories,
                latitude: "latitude" in shop ? (shop as { latitude?: number | null }).latitude ?? null : null,
                longitude: "longitude" in shop ? (shop as { longitude?: number | null }).longitude ?? null : null,
                isFeatured: "isFeatured" in shop ? (shop as { isFeatured?: boolean }).isFeatured ?? false : false,
                isSponsored: "isSponsored" in shop ? (shop as { isSponsored?: boolean }).isSponsored ?? false : false,

                hasPadrons: "hasPadrons" in shop ? (shop as { hasPadrons?: boolean }).hasPadrons ?? false : false,
                hasDavidoffs: "hasDavidoffs" in shop ? (shop as { hasDavidoffs?: boolean }).hasDavidoffs ?? false : false,
                hasOpusX: "hasOpusX" in shop ? (shop as { hasOpusX?: boolean }).hasOpusX ?? false : false,
                hasAcid: "hasAcid" in shop ? (shop as { hasAcid?: boolean }).hasAcid ?? false : false,
                hasPipeTobacco: "hasPipeTobacco" in shop ? (shop as { hasPipeTobacco?: boolean }).hasPipeTobacco ?? false : false,
                hasMemberAccess: "hasMemberAccess" in shop ? (shop as { hasMemberAccess?: boolean }).hasMemberAccess ?? false : false,
                hasEvents: "hasEvents" in shop ? (shop as { hasEvents?: boolean }).hasEvents ?? false : false,
                hasHooka: "hasHooka" in shop ? (shop as { hasHooka?: boolean }).hasHooka ?? false : false,
                hasliquorlicense: "hasliquorlicense" in shop ? (shop as { hasliquorlicense?: boolean }).hasliquorlicense ?? false : false,
                canbringinliquor: "canbringinliquor" in shop ? (shop as { canbringinliquor?: boolean }).canbringinliquor ?? false : false,
                hasinternetaccess: "hasinternetaccess" in shop ? (shop as { hasinternetaccess?: boolean }).hasinternetaccess ?? false : false,
                hascoffeemaker: "hascoffeemaker" in shop ? (shop as { hascoffeemaker?: boolean }).hascoffeemaker ?? false : false,
                hasicemaker: "hasicemaker" in shop ? (shop as { hasicemaker?: boolean }).hasicemaker ?? false : false,
                hasBigTV: "hasBigTV" in shop ? (shop as { hasBigTV?: boolean }).hasBigTV ?? false : false,

                rating: "rating" in shop ? (shop as { rating?: number | null }).rating ?? null : null,
                reviewCount: "reviewCount" in shop ? (shop as { reviewCount?: number | null }).reviewCount ?? 0 : 0,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });