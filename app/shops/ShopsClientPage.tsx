"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { shops } from "@/lib/shops";
import BrandMarquee from "@/components/BrandMarquee";

type Props = {
    initialQuery: string;
};

type Shop = (typeof shops)[number];

export default function ShopsClientPage({ initialQuery }: Props) {
    const router = useRouter();

    const [search, setSearch] = useState(initialQuery);
    const [onlyLounge, setOnlyLounge] = useState(false);
    const [onlyHumidor, setOnlyHumidor] = useState(false);
    const [onlyPadrons, setOnlyPadrons] = useState(false);
    const [onlyDavidoffs, setOnlyDavidoffs] = useState(false);
    const [onlyOpusX, setOnlyOpusX] = useState(false);
    const [onlyAcids, setOnlyAcids] = useState(false);
    const [onlyPipetobacco, setOnlyPipetobacco] = useState(false);
    const [onlyMemberAccess, setOnlyMemberAccess] = useState(false);
    const [onlyLiquorLicense, setOnlyLiquorLicense] = useState(false);
    const [onlyBringLiquor, setOnlyBringLiquor] = useState(false);
    const [onlyInternetAccess, setOnlyInternetAccess] = useState(false);
    const [onlyCoffeeMaker, setOnlyCoffeeMaker] = useState(false);
    const [onlyIceMaker, setOnlyIceMaker] = useState(false);
    const [onlyBigTV, setOnlyBigTV] = useState(false);
    const [onlyAccessories, setOnlyAccessories] = useState(false);
    const [selectedState, setSelectedState] = useState("ALL");
    const [sortBy, setSortBy] = useState("featured");

    const filteredShops = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = shops.filter((shop) => {
            const matchesSearch =
                !query ||
                shop.name.toLowerCase().includes(query) ||
                shop.city.toLowerCase().includes(query) ||
                shop.state.toLowerCase().includes(query) ||
                shop.stateabb.toLowerCase().includes(query) ||
                shop.zip.toLowerCase().includes(query) ||
                shop.address.toLowerCase().includes(query) ||
                shop.description.toLowerCase().includes(query);

            const matchesState =
                selectedState === "ALL" || shop.stateabb === selectedState;

            const matchesLounge = !onlyLounge || shop.hasLounge;
            const matchesHumidor = !onlyHumidor || shop.hasHumidor;
            const matchesPadrons = !onlyPadrons || shop.hasPadrons;
            const matchesDavidoffs = !onlyDavidoffs || shop.hasDavidoffs;
            const matchesOpusX = !onlyOpusX || shop.hasOpusX;
            const matchesAcids = !onlyAcids || shop.hasAcid;
            const matchesPipeTobacco = !onlyPipetobacco || shop.hasPipeTobacco;
            const matchesMemberAccess = !onlyMemberAccess || shop.hasMemberAccess;
            const matchesLiquorLicense =
                !onlyLiquorLicense || shop.hasliquorlicense;
            const matchesBringLiquor =
                !onlyBringLiquor || shop.canbringinliquor;
            const matchesInternetAccess =
                !onlyInternetAccess || shop.hasinternetaccess;
            const matchesCoffeeMaker =
                !onlyCoffeeMaker || shop.hascoffeemaker;
            const matchesIceMaker = !onlyIceMaker || shop.hasicemaker;
            const matchesBigTV = !onlyBigTV || shop.hasBigTV;
            const matchesAccessories =
                !onlyAccessories || shop.sellsAccessories;

            return (
                matchesSearch &&
                matchesState &&
                matchesLounge &&
                matchesHumidor &&
                matchesPadrons &&
                matchesDavidoffs &&
                matchesOpusX &&
                matchesAcids &&
                matchesPipeTobacco &&
                matchesMemberAccess &&
                matchesLiquorLicense &&
                matchesBringLiquor &&
                matchesInternetAccess &&
                matchesCoffeeMaker &&
                matchesIceMaker &&
                matchesBigTV &&
                matchesAccessories
            );
        });

        const getShopScore = (shop: Shop) => {
            let score = 0;

            if (shop.isSponsored) score += 1000;
            if (shop.isFeatured) score += 500;

            if (shop.hasLounge) score += 40;
            if (shop.hasHumidor) score += 35;
            if (shop.hasDavidoffs) score += 20;
            if (shop.hasPadrons) score += 20;
            if (shop.hasOpusX) score += 25;
            if (shop.hasMemberAccess) score += 10;
            if (shop.hasinternetaccess) score += 5;
            if (shop.hascoffeemaker) score += 5;
            if (shop.hasicemaker) score += 5;
            if (shop.hasBigTV) score += 5;
            if (shop.sellsAccessories) score += 10;

            score += (shop.rating ?? 0) * 25;
            score += Math.min(shop.reviewCount ?? 0, 100);

            return score;
        };

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "featured":
                    return getShopScore(b) - getShopScore(a);
                case "rating-desc":
                    return (b.rating ?? 0) - (a.rating ?? 0);
                case "reviews-desc":
                    return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                case "city-asc":
                    return a.city.localeCompare(b.city);
                case "city-desc":
                    return b.city.localeCompare(a.city);
                case "state-asc":
                    return a.state.localeCompare(b.state);
                case "state-desc":
                    return b.state.localeCompare(a.state);
                default:
                    return getShopScore(b) - getShopScore(a);
            }
        });

        return filtered;
    }, [
        search,
        selectedState,
        sortBy,
        onlyLounge,
        onlyHumidor,
        onlyPadrons,
        onlyDavidoffs,
        onlyOpusX,
        onlyAcids,
        onlyPipetobacco,
        onlyMemberAccess,
        onlyLiquorLicense,
        onlyBringLiquor,
        onlyInternetAccess,
        onlyCoffeeMaker,
        onlyIceMaker,
        onlyBigTV,
        onlyAccessories,
    ]);

    const featuredShops = useMemo(() => {
        return filteredShops
            .filter((shop) => shop.isSponsored || shop.isFeatured)
            .slice(0, 3);
    }, [filteredShops]);

    const nonFeaturedShops = useMemo(() => {
        return filteredShops.filter(
            (shop) => !featuredShops.some((featuredShop) => featuredShop.id === shop.id)
        );
    }, [filteredShops, featuredShops]);

    const states = Array.from(
        new Set(shops.map((shop) => shop.stateabb))
    ).sort();

    const clearFilters = () => {
        setSearch("");
        setOnlyLounge(false);
        setOnlyHumidor(false);
        setOnlyPadrons(false);
        setOnlyDavidoffs(false);
        setOnlyOpusX(false);
        setOnlyAcids(false);
        setOnlyPipetobacco(false);
        setOnlyMemberAccess(false);
        setOnlyLiquorLicense(false);
        setOnlyBringLiquor(false);
        setOnlyInternetAccess(false);
        setOnlyCoffeeMaker(false);
        setOnlyIceMaker(false);
        setOnlyBigTV(false);
        setOnlyAccessories(false);
        setSelectedState("ALL");
        setSortBy("featured");
        router.push("/shops");
    };

    const filterButtons = [
        { label: "Lounge", active: onlyLounge, onClick: () => setOnlyLounge((prev) => !prev) },
        { label: "Humidor", active: onlyHumidor, onClick: () => setOnlyHumidor((prev) => !prev) },
        { label: "Padrons", active: onlyPadrons, onClick: () => setOnlyPadrons((prev) => !prev) },
        { label: "Davidoffs", active: onlyDavidoffs, onClick: () => setOnlyDavidoffs((prev) => !prev) },
        { label: "OpusX", active: onlyOpusX, onClick: () => setOnlyOpusX((prev) => !prev) },
        { label: "Acids", active: onlyAcids, onClick: () => setOnlyAcids((prev) => !prev) },
        { label: "Pipe Tobacco", active: onlyPipetobacco, onClick: () => setOnlyPipetobacco((prev) => !prev) },
        { label: "Member Access", active: onlyMemberAccess, onClick: () => setOnlyMemberAccess((prev) => !prev) },
        { label: "Liquor License", active: onlyLiquorLicense, onClick: () => setOnlyLiquorLicense((prev) => !prev) },
        { label: "Can Bring Liquor", active: onlyBringLiquor, onClick: () => setOnlyBringLiquor((prev) => !prev) },
        { label: "Internet Access", active: onlyInternetAccess, onClick: () => setOnlyInternetAccess((prev) => !prev) },
        { label: "Coffee Maker", active: onlyCoffeeMaker, onClick: () => setOnlyCoffeeMaker((prev) => !prev) },
        { label: "Ice Maker", active: onlyIceMaker, onClick: () => setOnlyIceMaker((prev) => !prev) },
        { label: "Big TV(s)", active: onlyBigTV, onClick: () => setOnlyBigTV((prev) => !prev) },
        { label: "Accessories", active: onlyAccessories, onClick: () => setOnlyAccessories((prev) => !prev) },
    ];

    return (
        <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-12">
                <div className="w-full">
                    <BrandMarquee />
                </div>

                <section className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                        Cigar Shops
                    </p>
                    <h1 className="mt-4 text-5xl font-bold tracking-tight">
                        Find local cigar shops, lounges, and premium humidors.
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-neutral-300">
                        Discover nearby cigar destinations with lounge information, humidor
                        details, featured retailers, and premium shop highlights.
                    </p>
                </section>

                <section className="sticky top-4 z-30 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-5">
                    <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-400/10 via-transparent to-white/5 pointer-events-none" />
                    <div className="relative">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/90">
                                    Refine Results
                                </p>
                                <p className="mt-1 text-sm text-neutral-400">
                                    Search, sort, and narrow shops by amenities and cigar selection.
                                </p>
                            </div>

                            <div className="hidden rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-300 md:flex">
                                {filteredShops.length} result{filteredShops.length === 1 ? "" : "s"}
                            </div>
                        </div>

                        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_180px]">
                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="m20 20-3.5-3.5" />
                                    </svg>
                                </span>

                                <input
                                    type="text"
                                    placeholder="Search by shop name, city, state, ZIP, or address..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-black/30 py-3 pl-12 pr-4 text-white placeholder:text-neutral-500 outline-none transition focus:border-amber-400/70 focus:bg-black/40"
                                />
                            </div>

                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M7 12h10" />
                                        <path d="M10 18h4" />
                                    </svg>
                                </span>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 py-3 pl-12 pr-10 text-white outline-none transition focus:border-amber-400/70 focus:bg-black/40"
                                >
                                    <option value="featured">Best Matches</option>
                                    <option value="rating-desc">Highest Rated</option>
                                    <option value="reviews-desc">Most Reviewed</option>
                                    <option value="name-asc">Name (A–Z)</option>
                                    <option value="name-desc">Name (Z–A)</option>
                                    <option value="city-asc">City (A–Z)</option>
                                    <option value="city-desc">City (Z–A)</option>
                                    <option value="state-asc">State (A–Z)</option>
                                    <option value="state-desc">State (Z–A)</option>
                                </select>

                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-medium text-white transition hover:border-amber-400/40 hover:bg-white/15"
                            >
                                Clear Filters
                            </button>
                        </div>

                        <div className="mt-5">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-neutral-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M4 12h16" />
                                        <path d="M4 6h16" />
                                        <path d="M4 18h16" />
                                    </svg>
                                </span>
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                                    Amenities & Selection
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {filterButtons.map((filter) => (
                                    <button
                                        key={filter.label}
                                        type="button"
                                        onClick={filter.onClick}
                                        className={`group rounded-full border px-4 py-2 text-sm font-medium transition ${filter.active
                                                ? "border-amber-300/60 bg-amber-400 text-black shadow-lg shadow-amber-500/20"
                                                : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                                            }`}
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <span
                                                className={`h-2 w-2 rounded-full ${filter.active ? "bg-black" : "bg-amber-300/70"
                                                    }`}
                                            />
                                            {filter.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-neutral-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" />
                                        <circle cx="12" cy="11" r="2.5" />
                                    </svg>
                                </span>
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                                    State
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {["ALL", ...states].map((state) => (
                                    <button
                                        key={state}
                                        type="button"
                                        onClick={() => setSelectedState(state)}
                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedState === state
                                                ? "border-amber-300/60 bg-amber-400 text-black shadow-lg shadow-amber-500/20"
                                                : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                                            }`}
                                    >
                                        {state}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-neutral-300 md:hidden">
                            {filteredShops.length} result{filteredShops.length === 1 ? "" : "s"}
                        </div>
                    </div>
                </section>

                <section>
                    {featuredShops.length > 0 && (
                        <div className="mb-10">
                            <div className="mb-4 flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                                        Featured Shops
                                    </p>
                                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                                        Top lounge picks
                                    </h2>
                                </div>

                                <div className="hidden text-sm text-neutral-400 md:block">
                                    Premium cigar lounges, featured retailers, and standout humidors.
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3">
                                {featuredShops.map((shop) => (
                                    <Link
                                        key={`featured-${shop.id}`}
                                        href={`/shops/${shop.slug}`}
                                        className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-white/5 opacity-0 transition duration-300 group-hover:opacity-100" />

                                        <div className="relative">
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {shop.isSponsored && (
                                                    <span className="rounded-full border border-amber-300/40 bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                                        Sponsored
                                                    </span>
                                                )}

                                                {shop.isFeatured && !shop.isSponsored && (
                                                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                                                        Featured
                                                    </span>
                                                )}

                                                {typeof shop.rating === "number" && (
                                                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200">
                                                        ★ {shop.rating.toFixed(1)}
                                                        {typeof shop.reviewCount === "number"
                                                            ? ` (${shop.reviewCount})`
                                                            : ""}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-2xl font-semibold text-white transition group-hover:text-amber-200">
                                                {shop.name}
                                            </h3>

                                            <p className="mt-2 text-sm text-neutral-400">
                                                {shop.city}, {shop.stateabb}
                                            </p>

                                            <p className="mt-4 line-clamp-4 text-sm leading-7 text-neutral-300">
                                                {shop.description}
                                            </p>

                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {shop.hasLounge && (
                                                    <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-white">
                                                        Lounge
                                                    </span>
                                                )}
                                                {shop.hasHumidor && (
                                                    <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-white">
                                                        Humidor
                                                    </span>
                                                )}
                                                {shop.hasDavidoffs && (
                                                    <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-white">
                                                        Davidoffs
                                                    </span>
                                                )}
                                                {shop.hasPadrons && (
                                                    <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-white">
                                                        Padrons
                                                    </span>
                                                )}
                                                {shop.hasOpusX && (
                                                    <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-white">
                                                        OpusX
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-300">
                                                View shop
                                                <span className="transition group-hover:translate-x-1">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="mb-6 text-neutral-400">
                        Showing {filteredShops.length}{" "}
                        {filteredShops.length === 1 ? "shop" : "shops"}
                    </p>

                    {filteredShops.length === 0 ? (
                        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-neutral-300">
                            No shops matched your search or filters.
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {nonFeaturedShops.map((shop) => (
                                <Link
                                    key={shop.id}
                                    href={`/shops/${shop.slug}`}
                                    className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-amber-400 hover:shadow-xl"
                                >
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {shop.isSponsored && (
                                            <span className="rounded-full border border-amber-300/40 bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                                Sponsored
                                            </span>
                                        )}

                                        {shop.isFeatured && !shop.isSponsored && (
                                            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                                                Featured
                                            </span>
                                        )}

                                        {typeof shop.rating === "number" && (
                                            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200">
                                                ★ {shop.rating.toFixed(1)}
                                                {typeof shop.reviewCount === "number"
                                                    ? ` (${shop.reviewCount})`
                                                    : ""}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-2xl font-semibold">{shop.name}</h2>

                                    <p className="mt-2 text-neutral-400">
                                        {shop.city}, {shop.stateabb}
                                    </p>

                                    <p className="mt-4 line-clamp-4 text-sm leading-7 text-neutral-300">
                                        {shop.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {shop.hasLounge && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Lounge
                                            </span>
                                        )}
                                        {shop.hasHumidor && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Humidor
                                            </span>
                                        )}
                                        {shop.hasPadrons && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Padrons
                                            </span>
                                        )}
                                        {shop.hasDavidoffs && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Davidoffs
                                            </span>
                                        )}
                                        {shop.hasOpusX && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                OpusX
                                            </span>
                                        )}
                                        {shop.hasAcid && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Acid
                                            </span>
                                        )}
                                        {shop.hasPipeTobacco && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Pipe Tobacco
                                            </span>
                                        )}
                                        {shop.hasMemberAccess && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Member Access
                                            </span>
                                        )}
                                        {shop.hasliquorlicense && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Liquor License
                                            </span>
                                        )}
                                        {shop.canbringinliquor && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Can bring liquor
                                            </span>
                                        )}
                                        {shop.hasinternetaccess && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Internet Access
                                            </span>
                                        )}
                                        {shop.hascoffeemaker && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Coffee Maker
                                            </span>
                                        )}
                                        {shop.hasicemaker && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Ice Maker
                                            </span>
                                        )}
                                        {shop.hasBigTV && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Big TV(s)
                                            </span>
                                        )}
                                        {shop.sellsAccessories && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Accessories
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}