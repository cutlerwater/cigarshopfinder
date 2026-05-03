import { prisma } from "@/lib/prisma";
import { slugifyShopName } from "@/lib/slugify";
import { createUniqueShopSlug } from "@/lib/slugify";

export async function POST(req: Request) {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const isFeatured = formData.get("featured") === "on";
    const isSponsored = formData.get("sponsored") === "on";

    const submission = await prisma.shopSubmission.findUnique({
        where: { id },
    });

    if (!submission) {
        return new Response("Not found", { status: 404 });
    }

    const slug = await createUniqueShopSlug(
        submission.name,
        submission.city,
        submission.stateabb
    );

    await prisma.shop.create({
        data: {
            name: submission.name,
            slug,
            city: submission.city,
            state: submission.state,
            stateabb: submission.stateabb,
            zip: submission.zip || "",
            address: submission.address,
            phone: submission.phone || "",
            website: submission.website || "",
            description: submission.description || "",

            isFeatured,
            isSponsored,
        },
    });

    await prisma.shopSubmission.update({
        where: { id },
        data: { status: "approved" },
    });

    return new Response(null, { status: 302, headers: { Location: "/admin/submissions" } });
}