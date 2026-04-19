import { NextResponse } from "next/server";
import { prisma } from "@/lib/shops/prisma";

export async function GET() {
    try {
        const count = await prisma.shop.count();

        return NextResponse.json({
            ok: true,
            shopCount: count,
        });
    } catch (error) {
        console.error("Prisma test failed:", error);
        return NextResponse.json(
            { ok: false, error: "Database connection failed" },
            { status: 500 }
        );
    }
}