import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { name } = await req.json();

    const user = await prisma.user.update({
        where: { id: session.user.id },
        data: { name },
    });

    return Response.json(user);
}