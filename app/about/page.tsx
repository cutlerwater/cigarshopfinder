import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen text-white">
            <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_30%)]">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                        About
                    </p>

                    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                        About Cutlerwater Cigar Shop Finder
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300">
                        Cutlerwater Cigar Shop Finder helps cigar enthusiasts discover premium
                        cigar shops, lounges, and humidors across the country. Whether you are
                        searching for a relaxing lounge, hard-to-find brands, or a great local
                        shop while traveling, this directory is built to make that search easier.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl lg:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                            Our Mission
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                            Helping people find the right cigar destination
                        </h2>
                        <p className="mt-4 leading-8 text-neutral-300">
                            This project was created to make it easier to find quality cigar shops
                            and lounges with the features that matter most. From premium brands
                            and large humidors to lounge seating, events, food, drinks, and more,
                            the goal is to help users quickly find a place that matches their
                            preferences.
                        </p>
                        <p className="mt-4 leading-8 text-neutral-300">
                            As the directory grows, it will continue to expand with more shops,
                            richer details, user reviews, and premium listings that help highlight
                            standout destinations.
                        </p>
                    </div>

                    <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                            What You’ll Find
                        </p>

                        <ul className="mt-5 space-y-3 text-sm leading-7 text-neutral-300">
                            <li>• Premium cigar shops and lounges</li>
                            <li>• Brand and amenity filters</li>
                            <li>• Shop details, maps, and contact info</li>
                            <li>• User reviews and ratings</li>
                            <li>• Featured and sponsored destinations</li>
                        </ul>

                        <Link
                            href="/shops"
                            className="mt-6 inline-flex rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-black transition hover:opacity-90"
                        >
                            Explore Shops
                        </Link>
                    </aside>
                </div>
            </section>
        </main>
    );
}