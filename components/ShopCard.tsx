import Link from "next/link";
import Badge from "@/components/Badge";
import type { Shop } from "@/lib/shops";

type ShopCardProps = {
    shop: Shop;
};

export default function ShopCard({ shop }: ShopCardProps) {
    return (
        <Link
            href={`/shops/${shop.slug}`}
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/40 hover:bg-white/10"
        >
            <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">{shop.name}</h2>
                    <p className="text-sm text-neutral-300">
                        {shop.city}, {shop.state}
                    </p>
                </div>
            </div>

            <p className="mb-4 text-sm leading-6 text-neutral-300">
                {shop.description}
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
                {shop.hasLounge && <Badge>Lounge</Badge>}
                {shop.hasHumidor && <Badge>Humidor</Badge>}
                {shop.sellsAccessories && <Badge>Accessories</Badge>}
            </div>

            <div className="space-y-1 text-sm text-neutral-400">
                <p>{shop.address}</p>
                <p>{shop.phone}</p>
            </div>
        </Link>
    );
}