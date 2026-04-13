"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo,  useState } from "react";
import { useRouter } from "next/navigation";
import BrandMarquee from "@/components/BrandMarquee";
import CigarMarquee from "@/components/CigarMarquee";

type Props = {
    initialQuery: string;
    initialShops: Shop[];
};


type Shop = {
    id: string;
    slug: string;
    name: string;
    city: string;
    stateabb: string;
    state: string;
    zip: string;
    address: string;
    phone: string;
    website?: string;
    description: string;
    image?: string;
    hasLounge: boolean;
    hasHumidor: boolean;
    sellsAccessories: boolean;
    latitude?: number | null;
    longitude?: number | null;
    isFeatured?: boolean;
    isSponsored?: boolean;

    hasPadrons?: boolean;
    hasDavidoffs?: boolean;
    hasOpusX?: boolean;
    hasAcid?: boolean;
    hasPipeTobacco?: boolean;
    hasMemberAccess?: boolean;
    hasEvents?: boolean;
    hasHooka?: boolean;
    hasLiquorLicense?: boolean;
    canBringinLiquor?: boolean;
    hasInternetAccess?: boolean;
    hasCoffeeMaker?: boolean;
    hasIceMaker?: boolean;
    hasBigTV?: boolean;
    distance?: number | null;
    rating?: number | null;
    reviewCount?: number | null;
};

function toRadians(value: number) {
    return (value * Math.PI) / 180;
}

function getDistanceMiles(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
) {
    const earthRadiusMiles = 3958.8;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusMiles * c;
}

function getShopHighlight(shop: Shop) {
    if ((shop.rating ?? 0) >= 4.7 && (shop.reviewCount ?? 0) >= 5) {
        return {
            label: "Top Rated",
            className:
                "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
        };
    }

    if ((shop.reviewCount ?? 0) >= 10) {
        return {
            label: "Popular",
            className:
                "border-sky-300/30 bg-sky-400/10 text-sky-200",
        };
    }

    return null;
}

export default function ShopsClientPage({
    initialQuery,
    initialShops,
}: Props) {
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
    const [onlyEvents, setOnlyEvents] = useState(false);
    const [onlyHooka, setOnlyHooka] = useState(false);
    const [onlyLiquorLicense, setOnlyLiquorLicense] = useState(false);
    const [onlyBringLiquor, setOnlyBringLiquor] = useState(false);
    const [onlyInternetAccess, setOnlyInternetAccess] = useState(false);
    const [onlyCoffeeMaker, setOnlyCoffeeMaker] = useState(false);
    const [onlyIceMaker, setOnlyIceMaker] = useState(false);
    const [onlyBigTV, setOnlyBigTV] = useState(false);
    const [onlyAccessories, setOnlyAccessories] = useState(false);
    const [selectedState, setSelectedState] = useState("ALL");
    const [sortBy, setSortBy] = useState("featured");
    const [userCoords, setUserCoords] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const [locationLoading, setLocationLoading] = useState(false);
    const [locationError, setLocationError] = useState("");

    function handleUseMyLocation() {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported in this browser.");
            return;
        }

        setLocationLoading(true);
        setLocationError("");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserCoords({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLocationLoading(false);
            },
            () => {
                setLocationError("Could not get your location.");
                setLocationLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        );
    } 

    const filteredShops = useMemo(() => {
        const query = search.trim().toLowerCase();

        const enriched = initialShops.map((shop) => {
            const distance =
                userCoords &&
                    typeof shop.latitude === "number" &&
                    typeof shop.longitude === "number"
                    ? getDistanceMiles(
                        userCoords.latitude,
                        userCoords.longitude,
                        shop.latitude,
                        shop.longitude
                    )
                    : null;

            return {
                ...shop,
                distance,
            };
        });

        const filtered = enriched.filter((shop) => {
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
            const matchesEvents = !onlyEvents || shop.hasEvents;
            const matchesHooka = !onlyHooka || shop.hasHooka;
            const matchesLiquorLicense =
                !onlyLiquorLicense || shop.hasLiquorLicense;
            const matchesBringLiquor =
                !onlyBringLiquor || shop.canBringinLiquor;
            const matchesInternetAccess =
                !onlyInternetAccess || shop.hasInternetAccess;
            const matchesCoffeeMaker =
                !onlyCoffeeMaker || shop.hasCoffeeMaker;
            const matchesIceMaker = !onlyIceMaker || shop.hasIceMaker;
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
                matchesEvents &&
                matchesHooka &&
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
            if (shop.hasEvents) score += 10;
            if (shop.hasHooka) score += 5;
            if (shop.hasCoffeeMaker) score += 5;
            if (shop.hasIceMaker) score += 5;
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
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                case "city-asc":
                    return a.city.localeCompare(b.city);
                case "city-desc":
                    return b.city.localeCompare(a.city);
                case "state-asc":
                case "rating-desc":
                    if (a.rating == null && b.rating == null) return 0;
                    if (a.rating == null) return 1;
                    if (b.rating == null) return -1;
                    return b.rating - a.rating;

                case "reviews-desc":
                    return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
                case "state-desc":
                    return b.state.localeCompare(a.state);
                case "distance-asc":
                    if (a.distance == null && b.distance == null) return 0;
                    if (a.distance == null) return 1;
                    if (b.distance == null) return -1;
                    return a.distance - b.distance;
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
        onlyEvents,
        onlyHooka,
        onlyLiquorLicense,
        onlyBringLiquor,
        onlyInternetAccess,
        onlyCoffeeMaker,
        onlyIceMaker,
        onlyBigTV,
        onlyAccessories,
        userCoords,
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
        new Set(initialShops.map((shop) => shop.stateabb))
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
        setOnlyEvents(false);
        setOnlyHooka(false);
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
        { label: "Has Special Events", active: onlyEvents, onClick: () => setOnlyEvents((prev) => !prev) },
        { label: "Hooka", active: onlyHooka, onClick: () => setOnlyHooka((prev) => !prev) },
        { label: "Liquor License", active: onlyLiquorLicense, onClick: () => setOnlyLiquorLicense((prev) => !prev) },
        { label: "Can Bring Liquor", active: onlyBringLiquor, onClick: () => setOnlyBringLiquor((prev) => !prev) },
        { label: "Internet Access", active: onlyInternetAccess, onClick: () => setOnlyInternetAccess((prev) => !prev) },
        { label: "Coffee Maker", active: onlyCoffeeMaker, onClick: () => setOnlyCoffeeMaker((prev) => !prev) },
        { label: "Ice Maker", active: onlyIceMaker, onClick: () => setOnlyIceMaker((prev) => !prev) },
        { label: "Big TV(s)", active: onlyBigTV, onClick: () => setOnlyBigTV((prev) => !prev) },
        { label: "Accessories", active: onlyAccessories, onClick: () => setOnlyAccessories((prev) => !prev) },
    ];

 
    return (
        <main className="min-h-screen text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-12">
                <div className="w-full">
                    <BrandMarquee />
                    <CigarMarquee />
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
                                    <option value="name-asc">Name (A–Z)</option>
                                    <option value="name-desc">Name (Z–A)</option>
                                    <option value="city-asc">City (A–Z)</option>
                                    <option value="city-desc">City (Z–A)</option>
                                    <option value="state-asc">State (A–Z)</option>
                                    <option value="state-desc">State (Z–A)</option>
                                    <option value="distance-asc">Nearest to me</option>
                                    <option value="rating-desc">Highest Rated</option>
                                    <option value="reviews-desc">Most Reviewed</option>
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
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={handleUseMyLocation}
                                disabled={locationLoading}
                                className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-200 transition hover:bg-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {locationLoading ? "Finding your location..." : "Use My Location"}
                            </button>

                            {locationError ? (
                                <p className="text-sm text-amber-300/80">{locationError}</p>
                            ) : null}
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
                                        className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        
                                        <div className="relative">
                                            <div className="relative h-56 overflow-hidden rounded-t-[28px]">
                                                {shop.image ? (
                                                    <Image
                                                        src={shop.image}
                                                        alt={shop.name}
                                                        fill
                                                        className="object-cover transition duration-500 group-hover:scale-105"
                                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
                                                        <div className="text-center">
                                                            <p className="text-sm uppercase tracking-[0.25em] text-amber-300/80">
                                                                Featured Lounge
                                                            </p>
                                                            <p className="mt-2 text-lg font-semibold text-white">
                                                                {shop.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                                    {shop.isSponsored && (
                                                        <span className="rounded-full border border-amber-300/40 bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                                            Sponsored
                                                        </span>
                                                    )}

                                                    {shop.isFeatured && !shop.isSponsored && (
                                                        <span className="rounded-full border border-white/10 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                                                            Featured
                                                        </span>
                                                    )}
                                                    {(() => {
                                                        const highlight = getShopHighlight(shop);
                                                        if (!highlight) return null;

                                                        return (
                                                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-md ${highlight.className}`}>
                                                                {highlight.label}
                                                            </span>
                                                        );
                                                    })()}
                                                </div>

                                                
                                            </div>

                                            <div className="p-6">
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
                                        {/* 👇 ADD THIS IMAGE BLOCK */}
                                        <div className="relative h-40 overflow-hidden rounded-xl mb-4">
                                            <Image
                                                src={shop.image || "/images/DavidusAnnapolis/front.jpg"}
                                                alt={shop.name}
                                                fill
                                                className="object-cover transition duration-300 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>

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

                                        {shop.rating != null && (
                                            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200">
                                                ★ {shop.rating} ({shop.reviewCount})
                                            </span>
                                            )}

                                        
                                    </div>

                                        <h2 className="text-2xl font-semibold">{shop.name}</h2>

                                        <p className="mt-2 text-sm text-neutral-400">
                                            {shop.city}, {shop.stateabb}
                                        </p>

                                        {/* 👇 ADD DISTANCE RIGHT UNDER THIS */}
                                        {shop.distance != null ? (
                                            <div className="mt-2 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                                                {shop.distance.toFixed(1)} miles away
                                            </div>
                                        ) : null}

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
                                            {shop.hasEvents && (
                                                <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                    Special Events
                                                </span>
                                            )}
                                            {shop.hasHooka && (
                                                <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                    Hooka
                                                </span>
                                            )}
                                        {shop.hasLiquorLicense && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Liquor License
                                            </span>
                                        )}
                                        {shop.canBringinLiquor && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Can bring liquor
                                            </span>
                                        )}
                                        {shop.hasInternetAccess && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Internet Access
                                            </span>
                                        )}
                                        {shop.hasCoffeeMaker && (
                                            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-white">
                                                Coffee Maker
                                            </span>
                                        )}
                                        {shop.hasIceMaker && (
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