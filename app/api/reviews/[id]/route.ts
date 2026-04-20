import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.review.findUnique({
        where: { id },
        select: { userId: true },
    });

    if (!existing) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (existing.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.review.update({
        where: { id },
        data: {
            title: body.title?.trim() || null,
            body: body.body?.trim() || null,
            rating: body.rating,
        },
    });

    return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: RouteContext) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.review.findUnique({
        where: { id },
        select: { userId: true },
    });

    if (!existing) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (existing.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.review.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}