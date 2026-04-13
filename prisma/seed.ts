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
                hasDavidoffs: shop.hasDavidoffs ?? false,
                hasPadrons: shop.hasPadrons ?? false,
                hasOpusX: shop.hasOpusX ?? false,
                hasAcid: shop.hasAcid ?? false,
                hasPipeTobacco: shop.hasPipeTobacco ?? false,
                hasMemberAccess: shop.hasMemberAccess ?? false,
                hasHooka: shop.hasHooka ?? false,
                hasEvents: shop.hasEvents ?? false,
                hasLiquorLicense: shop.hasLiquorLicense ?? false,
                canBringInLiquor: shop.canBringInLiquor ?? false,
                hasInternetAccess: shop.hasInternetAccess ?? false,
                hasCoffeeMaker: shop.hasCoffeeMaker ?? false,
                hasIceMaker: shop.hasIceMaker ?? false,
                hasBigTV: shop.hasBigTV ?? false,
                sellsAccessories: shop.sellsAccessories,
                latitude: "latitude" in shop ? shop.latitude ?? null : null,
                longitude: "longitude" in shop ? shop.longitude ?? null : null,
                isFeatured: "isFeatured" in shop ? shop.isFeatured ?? false : false,
                isSponsored: "isSponsored" in shop ? shop.isSponsored ?? false : false,
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
                hasDavidoffs: shop.hasDavidoffs ?? false,
                hasPadrons: shop.hasPadrons ?? false,
                hasOpusX: shop.hasOpusX ?? false,
                hasAcid: shop.hasAcid ?? false,
                hasPipeTobacco: shop.hasPipeTobacco ?? false,
                hasMemberAccess: shop.hasMemberAccess ?? false,
                hasHooka: shop.hasHooka ?? false,
                hasEvents: shop.hasEvents ?? false,
                hasLiquorLicense: shop.hasLiquorLicense ?? false,
                canBringInLiquor: shop.canBringInLiquor ?? false,
                hasInternetAccess: shop.hasInternetAccess ?? false,
                hasCoffeeMaker: shop.hasCoffeeMaker ?? false,
                hasIceMaker: shop.hasIceMaker ?? false,
                hasBigTV: shop.hasBigTV ?? false,
                sellsAccessories: shop.sellsAccessories,
                latitude: "latitude" in shop ? shop.latitude ?? null : null,
                longitude: "longitude" in shop ? shop.longitude ?? null : null,
                isFeatured: "isFeatured" in shop ? shop.isFeatured ?? false : false,
                isSponsored: "isSponsored" in shop ? shop.isSponsored ?? false : false,
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