import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
    const data = await req.json();

    const updated = await prisma.shop.update({
        where: { id: data.id },
        data: {
            name: data.name,
            city: data.city,
            stateabb: data.stateabb,
            description: data.description,
            isFeatured: data.isFeatured,
            isSponsored: data.isSponsored,
        },
    });

    return Response.json(updated);
}