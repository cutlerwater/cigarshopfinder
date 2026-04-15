
import Image from "next/image";
import GalleryLightbox from "@/components/GalleryLightBox";
import Link from "next/link";
import ShopMapPanel from "@/components/ShopMapPanel";
import { prisma } from "@/lib/prisma";
import ReviewForm from "@/components/ReviewForm";

import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ShopDetailPage({ params }: Props) {
    const { slug } = await params;

    const shop = await prisma.shop.findUnique({
        where: { slug },
        include: {
            reviews: {
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });

    if (!shop) {
        notFound();
    }

    return (
        <main>
            {/* now shop is non-null below here */}
        </main>
    );
}