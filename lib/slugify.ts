import { prisma } from "@/lib/prisma";

export function slugifyShopName(name: string, city?: string, stateabb?: string) {
    return [name, city, stateabb]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

export async function createUniqueShopSlug(
    name: string,
    city?: string,
    stateabb?: string
) {
    const baseSlug = slugifyShopName(name, city, stateabb);

    let slug = baseSlug;
    let counter = 2;

    while (await prisma.shop.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}