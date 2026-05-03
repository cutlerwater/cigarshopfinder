import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const formData = await req.formData();
    const id = formData.get("id") as string;

    await prisma.shopSubmission.update({
        where: { id },
        data: { status: "rejected" },
    });

    return new Response(null, { status: 302, headers: { Location: "/admin/submissions" } });
}