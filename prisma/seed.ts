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