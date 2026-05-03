import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.email) {
        return new Response("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    if (!data.name || !data.address || !data.city || !data.state || !data.stateabb) {
        return new Response("Missing required fields", { status: 400 });
    }

    const existing = await prisma.shop.findFirst({
        where: {
            name: {
                equals: data.name,
                mode: "insensitive",
            },
            city: {
                equals: data.city,
                mode: "insensitive",
            },
            stateabb: data.stateabb,
        },
    });

    if (existing) {
        return new Response("This shop already exists.", { status: 400 });
    }

    // ✅ THEN CREATE
    const submission = await prisma.shopSubmission.create({
        data: {
            name: data.name,
            address: data.address,
            city: data.city,
            state: data.state,
            stateabb: data.stateabb,
            zip: data.zip || null,
            phone: data.phone || null,
            website: data.website || null,
            description: data.description || null,
            contactName: session.user.name || null,
            contactEmail: session.user.email,
            status: "pending",
        },
    });

    return Response.json(submission);
}

