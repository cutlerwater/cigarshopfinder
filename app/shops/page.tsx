import ShopCard from "@/components/ShopCard";
import { shops } from "@/lib/shops";

export default function ShopsPage() {
    return (
        <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                        Directory
                    </p>
                    <h1 className="mt-2 text-4xl font-bold">Local Cigar Shops</h1>
                    <p className="mt-3 max-w-2xl text-neutral-400">
                        Browse premium cigar shops, lounges, and humidors near you.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {shops.map((shop) => (
                        <ShopCard key={shop.id} shop={shop} />
                    ))}
                </div>
            </div>
        </main>
    );
}