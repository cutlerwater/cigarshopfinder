import Link from "next/link";

type FeaturedShop = {
    name: string;
    slug: string;
    city: string;
    stateabb: string;
    description: string;
};

type Props = {
    shop: FeaturedShop;
};

export default function FeaturedShopCard({ shop }: Props) {
    return (
        <div className="relative">
            <Link
                href={`/shops/${shop.slug}`}
                className="group block animate-fadeIn rounded-2xl border border-amber-400/40 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-2xl"
            >
            <div className="mb-3 inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black shadow-sm">
                Sponsored
            </div>

            <h2 className="text-2xl font-semibold text-white transition group-hover:text-amber-300">
                {shop.name}
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
                {shop.city}, {shop.stateabb}
            </p>

            <p className="mt-4 line-clamp-3 text-sm leading-7 text-neutral-300">
                {shop.description}
            </p>

            <div className="mt-6 text-sm font-semibold text-amber-300">
                Visit featured shop →
            </div>
        </Link>
        </div>
    );
}