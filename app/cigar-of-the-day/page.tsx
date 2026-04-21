import Image from "next/image";
import Link from "next/link";
import { getFeaturedCigar } from "@/lib/cigars";

export default function CigarOfTheDayPage() {
    const cigar = getFeaturedCigar();

    if (!cigar) {
        return (
            <main className="mx-auto max-w-6xl px-6 py-16 text-white">
                <h1 className="text-4xl font-bold">Cigar of the Day</h1>
                <p className="mt-4 text-neutral-400">No featured cigar yet.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen text-white">
            <section className="relative overflow-hidden border-b border-white/10">
                <div className="absolute inset-0">
                    <Image
                        src={cigar.image}
                        alt={cigar.name}
                        fill
                        priority
                        sizes="100vw"
                        className="object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/65 to-black/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_30%)]" />
                </div>

                <div className="relative mx-auto flex min-h-[520px] max-w-6xl items-end px-6 pb-12 pt-24">
                    <div className="max-w-lg">
                        <div className="mb-4 flex flex-wrap gap-2">
                            <span className="rounded-full border border-amber-300/40 bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                Cigar of the Day
                            </span>

                            {cigar.rating ? (
                                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-md">
                                    ★ {cigar.rating}
                                </span>
                            ) : null}

                            {cigar.strength ? (
                                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-md">
                                    {cigar.strength}
                                </span>
                            ) : null}
                        </div>

                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                            {cigar.brand}
                        </p>

                        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                            {cigar.name}
                        </h1>

                        <p className="mt-4 max-w-2xl text-base text-neutral-300 md:text-lg">
                            {cigar.description}
                        </p>

                        {cigar.highlights?.length ? (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {cigar.highlights.map((highlight) => (
                                    <span
                                        key={highlight}
                                        className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-md"
                                    >
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>

            <section className="border-b border-white/10 bg-neutral-950/70">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        Quick Specs
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                        Details at a glance
                    </h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <SpecCard label="Wrapper" value={cigar.wrapper} />
                        <SpecCard label="Binder" value={cigar.binder} />
                        <SpecCard label="Filler" value={cigar.filler} />
                        <SpecCard label="Country" value={cigar.country} />
                        <SpecCard label="Size" value={cigar.size} />
                        <SpecCard label="Gauge" value={cigar.gauge} />
                        <SpecCard label="Shape" value={cigar.shape} />
                        <SpecCard label="Price" value={cigar.price ?? "—"} />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-10">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_380px]">
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                            Tasting Notes
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                            What to expect
                        </h2>
                        <p className="mt-4 leading-8 text-neutral-300">
                            {cigar.description}
                        </p>

                        {cigar.availability ? (
                            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                                <p className="text-xs uppercase tracking-wide text-neutral-500">
                                    Availability
                                </p>
                                <p className="mt-2 text-sm text-neutral-300">
                                    {cigar.availability}
                                </p>
                            </div>
                        ) : null}
                    </div>

                    <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                            Pairings
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                            Pair it with
                        </h2>

                        <div className="mt-5 space-y-5 text-sm text-neutral-300">
                            <PairingRow label="Bourbon" value={cigar.pairings?.bourbon} />
                            <PairingRow label="Whiskey" value={cigar.pairings?.whiskey} />
                            <PairingRow label="Rum" value={cigar.pairings?.rum} />
                            <PairingRow label="Coffee" value={cigar.pairings?.coffee} />
                            <PairingRow label="Beer" value={cigar.pairings?.beer} />
                            <PairingRow label="Dessert" value={cigar.pairings?.dessert} />
                        </div>
                    </aside>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-16">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                                Explore More
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">
                                Back to the lounge finder
                            </h2>
                        </div>

                        <Link
                            href="/shops"
                            className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-300"
                        >
                            Browse shops
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function SpecCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
            <p className="mt-2 text-sm font-medium text-white">{value}</p>
        </div>
    );
}

function PairingRow({
    label,
    value,
}: {
    label: string;
    value?: string;
}) {
    if (!value) return null;

    return (
        <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">
                {label}
            </p>
            <p className="mt-1 text-sm text-neutral-300">{value}</p>
        </div>
    );
}