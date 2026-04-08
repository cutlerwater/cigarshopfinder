import Badge from "@/components/Badge";
import { shops } from "@/lib/shops";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ShopDetailPage({ params }: Props) {
    const { slug } = await params;
    const shop = shops.find((item) => item.slug === slug);

    if (!shop) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-4xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                    Shop Profile
                </p>

                <h1 className="text-4xl font-bold">{shop.name}</h1>

                <p className="mt-3 text-lg text-neutral-300">
                    {shop.city}, {shop.state}
                </p>

                <p className="mt-6 max-w-3xl text-neutral-300 leading-7">
                    {shop.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                    {shop.hasLounge && <Badge>Lounge</Badge>}
                    {shop.hasHumidor && <Badge>Humidor</Badge>}
                    {shop.sellsAccessories && <Badge>Accessories</Badge>}
                </div>

                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="mb-4 text-xl font-semibold">Details</h2>
                    <div className="space-y-3 text-neutral-300">
                        <p>
                            <span className="font-semibold text-white">Address:</span>{" "}
                            {shop.address}
                        </p>
                        <p>
                            <span className="font-semibold text-white">Phone:</span>{" "}
                            {shop.phone}
                        </p>
                        <p>
                            <span className="font-semibold text-white">ZIP:</span> {shop.zip}
                        </p>
                        {shop.website && (
                            <p>
                                <span className="font-semibold text-white">Website:</span>{" "}
                                <a
                                    href={shop.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-amber-300 underline underline-offset-4"
                                >
                                    Visit website
                                </a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}