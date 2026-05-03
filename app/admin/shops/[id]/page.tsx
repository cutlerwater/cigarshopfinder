import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ShopEditForm from "./ShopEditForm";

export default async function EditShopPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.email || session.user.email !== "cutlerwater2@live.com") {
        redirect("/");
    }

    const shop = await prisma.shop.findUnique({
        where: { id },
    });

    if (!shop) {
        return <div className="text-white p-6">Shop not found</div>;
    }

    return <ShopEditForm shop={shop} />;
}