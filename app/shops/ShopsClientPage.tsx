"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo,  useState } from "react";
import { useRouter } from "next/navigation";
import BrandMarquee from "@/components/BrandMarquee";
import CigarMarquee from "@/components/CigarMarquee";
import CigarComparePromo from "@/components/CigarComparePromo";
import CivicsMapPromo from "@/components/CivicsMapPromo";
import CigarOfTheDayPromo from "@/components/CigarOfTheDayPromo";

type Props = {
    initialQuery: string;
    initialShops: Shop[];
    featuredShops?: any[];
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
    website?: string | null;
    description: string;
    image?: string | null;
    hasLounge: boolean;
    hasHumidor: boolean;
    latitude?: number | null;
    longitude?: number | null;
    isFeatured?: boolean;
    isSponsored?: boolean;
    sellsFood?: boolean;
    sellsDrink?: boolean;
    hasLiveMusic?: boolean;
    hasMemberAccess?: boolean;
    hasMemberLocker?: boolean;
    hasEvents?: boolean;
    hasLiquorLicense?: boolean;
    canBringInLiquor?: boolean;
    hasInternetAccess?: boolean;
    hasCoffeeMaker?: boolean;
    hasIceMaker?: boolean;
    hasBigTV?: boolean;
    sellsAccessory: boolean;
    hasPadron?: boolean;
    hasFuente?: boolean;
    hasOpusX?: boolean;
    hasRareOpusX?: boolean;
    hasAshton?: boolean;
    hasDiamond?: boolean;
    hasAroma?: boolean;
    hasDavidoff?: boolean;
    hasAvo?: boolean;
    hasLiga?: boolean;
    hasAcid?: boolean;
    hasTatuaje?: boolean;
    hasPerdomo?: boolean;
    hasAlec?: boolean;
    hasHoya?: boolean;
    hasLFD?: boolean;
    hasOliva?: boolean;
    hasNub?: boolean;
    hasCain?: boolean;
    hasMyFather?: boolean;
    hasCamacho?: boolean;
    hasAJ?: boolean;
    hasSanCristobol?: boolean;
    hasAtabey?: boolean;
    hasLordByron?: boolean;
    hasGreyCliff?: boolean;
    hasDunhill?: boolean;
    hasHouseCigar?: boolean;
    hasMontecristo?: boolean;
    hasRomeo?: boolean;
    hasHuppman?: boolean;
    hasCAO?: boolean;
    hasRP?: boolean;
    hasCohiba?: boolean;
    hasPunch?: boolean;
    hasAging?: boolean;
    hasMacanudo?: boolean;
    hasGurkha?: boolean;
    hasPartagas?: boolean;
    hasLaAurora?: boolean;
    hasAganorsa?: boolean;
    hasPlasencia?: boolean; 
    hasPipeTobacco?: boolean;
    hasHooka?: boolean;    
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

const STATES = [
    { name: "All States", value: "ALL" },
    { name: "Alabama", value: "AL" },
    { name: "Alaska", value: "AK" },
    { name: "Arizona", value: "AZ" },
    { name: "Arkansas", value: "AR" },
    { name: "California", value: "CA" },
    { name: "Colorado", value: "CO" },
    { name: "Connecticut", value: "CT" },
    { name: "Delaware", value: "DE" },
    { name: "Florida", value: "FL" },
    { name: "Georgia", value: "GA" },
    { name: "Hawaii", value: "HI" }, 
    { name: "Idaho", value: "ID" },
    { name: "Illinois", value: "IL" },
    { name: "Indiana", value: "IN" },
    { name: "Iowa", value: "IA" },
    { name: "Kansas", value: "KS" },
    { name: "Kentucky", value: "KY" },
    { name: "Louisiana", value: "LA" },
    { name: "Maine", value: "ME" },
    { name: "Maryland", value: "MD" },
    { name: "Massachusetts", value: "MA" }, 
    { name: "Michigan", value: "MI" },
    { name: "Minnesota", value: "MN" },
    { name: "Mississippi", value: "MS" },
    { name: "Missouri", value: "MO" },
    { name: "Montana", value: "MT" },
    { name: "Nebraska", value: "NE" },
    { name: "Nevada", value: "NV" },
    { name: "New Hampshire", value: "NH" },
    { name: "New Jersey", value: "NJ" },
    { name: "New Mexico", value: "NM" },
    { name: "New York", value: "NY" },
    { name: "North Carolina", value: "NC" },
    { name: "North Dakota", value: "ND" },
    { name: "Ohio", value: "OH" },
    { name: "Oklahoma", value: "OK" },
    { name: "Oregon", value: "OR" },
    { name: "Pennsylvania", value: "PA" },
    { name: "Rhode Island", value: "RI" },
    { name: "South Carolina", value: "SC" },
    { name: "South Dakota", value: "SD" }, 
    { name: "Texas", value: "TX" },
    { name: "Utah", value: "UT" },
    { name: "Virginia", value: "VA" },
    { name: "Vermont", value: "VT" },
    { name: "Washington", value: "WA" },
    { name: "West Virginia", value: "WV" },
    { name: "Wisconsin", value: "WI" },
    { name: "Wyoming", value: "WY" },
    { name: "Washington, D.C.", value: "DC"}
];

export default function ShopsClientPage({
    initialQuery,
    initialShops,
    featuredShops = [],
}: Props) {
    const router = useRouter();

    const [search, setSearch] = useState(initialQuery);
    const [onlyLounge, setOnlyLounge] = useState(false);
    const [onlyHumidor, setOnlyHumidor] = useState(false);
    const [onlyAccessory, setOnlyAccessory] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("ALL");
    const [selectedFeature, setSelectedFeature] = useState("ALL");
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
            const matchesAccessory = !onlyAccessory || shop.sellsAccessory;
            const matchesBrand =
                selectedBrand === "ALL" ||
                
                (selectedBrand === "PADRON" && shop.hasPadron) ||
                (selectedBrand === "FUENTE" && shop.hasFuente) ||
                (selectedBrand === "OPUSX" && shop.hasOpusX) ||
                (selectedBrand === "RARE_OPUS_X" && shop.hasRareOpusX) ||
                (selectedBrand === "ASHTON" && shop.hasAshton) ||
                (selectedBrand === "DIAMOND" && shop.hasDiamond) ||
                (selectedBrand === "AROMA" && shop.hasAroma) ||
                (selectedBrand === "DAVIDOFF" && shop.hasDavidoff) ||
                (selectedBrand === "AVO" && shop.hasAvo) ||
                (selectedBrand === "LIGA" && shop.hasLiga) ||
                (selectedBrand === "ACID" && shop.hasAcid) ||
                (selectedBrand === "TATUAJE" && shop.hasTatuaje) ||
                (selectedBrand === "PERDOMO" && shop.hasPerdomo) ||
                (selectedBrand === "ALEC" && shop.hasAlec) ||
                (selectedBrand === "HOYA" && shop.hasHoya) ||
                (selectedBrand === "LFD" && shop.hasLFD) ||
                (selectedBrand === "OLIVA" && shop.hasOliva) ||
                (selectedBrand === "NUB" && shop.hasNub) ||
                (selectedBrand === "CAIN" && shop.hasCain) ||
                (selectedBrand === "MYFATHER" && shop.hasMyFather) ||
                (selectedBrand === "CAMACHO" && shop.hasCamacho) ||
                (selectedBrand === "AJ" && shop.hasAJ) ||
                (selectedBrand === "SANCRISTOBOL" && shop.hasSanCristobol) ||
                (selectedBrand === "ATABEY" && shop.hasAtabey) ||
                (selectedBrand === "LORDBYRON" && shop.hasLordByron) ||
                (selectedBrand === "GREYCLIFF" && shop.hasGreyCliff) ||
                (selectedBrand === "DUNHILL" && shop.hasDunhill) ||
                (selectedBrand === "HOUSE_CIGARS" && shop.hasHouseCigar) ||
                (selectedBrand === "MONTECRISTO" && shop.hasMontecristo) ||
                (selectedBrand === "ROMEO" && shop.hasRomeo) ||
                (selectedBrand === "HUPPMAN" && shop.hasHuppman) ||
                (selectedBrand === "CAO" && shop.hasCAO) ||
                (selectedBrand === "RP" && shop.hasRP) ||
                (selectedBrand === "COHIBA" && shop.hasCohiba) ||
                (selectedBrand === "PUNCH" && shop.hasPunch) ||
                (selectedBrand === "AGING" && shop.hasAging) ||
                (selectedBrand === "MACANUDO" && shop.hasMacanudo) ||
                (selectedBrand === "GURKHA" && shop.hasGurkha) ||
                (selectedBrand === "PARTAGAS" && shop.hasPartagas) ||
                (selectedBrand === "LAAURORA" && shop.hasLaAurora) ||
                (selectedBrand === "PLASENCIA" && shop.hasPlasencia) ||
                (selectedBrand === "AGANORSA" && shop.hasAganorsa) ||
                (selectedBrand === "PIPE_TOBACCO" && shop.hasPipeTobacco) ||
                (selectedBrand === "HOOKA" && shop.hasHooka);
            const matchesFeature =
                selectedFeature === "ALL" ||
                (selectedFeature === "MEMBER_LOCKER" && shop.hasMemberLocker) ||    
                (selectedFeature === "MEMBER_ACCESS" && shop.hasMemberAccess) ||
                (selectedFeature === "SELLS_FOOD" && shop.sellsFood) ||
                (selectedFeature === "SELLS_DRINK" && shop.sellsFood) ||
                (selectedFeature === "LIVE_MUSIC" && shop.hasLiveMusic) ||
                (selectedFeature === "LIQUOR_LICENSE" && shop.hasLiquorLicense) ||
                (selectedFeature === "BRING_LIQUOR" && shop.canBringInLiquor) ||
                (selectedFeature === "INTERNET_ACCESS" && shop.hasInternetAccess) ||
                (selectedFeature === "EVENTS" && shop.hasEvents) ||
                (selectedFeature === "COFFEE_MAKER" && shop.hasCoffeeMaker) ||
                (selectedFeature === "ICE_MAKER" && shop.hasIceMaker) ||
                (selectedFeature === "BIG_TVS" && shop.hasBigTV); 
            

            return (
                matchesSearch &&
                matchesState &&
                matchesLounge &&
                matchesHumidor &&
                matchesBrand &&
                matchesFeature &&                   
                matchesAccessory
            );
        });

        const getShopScore = (shop: Shop) => {
            let score = 0;

            if (shop.isSponsored) score += 1000;
            if (shop.isFeatured) score += 500;
            if (shop.hasLounge) score += 40;
            if (shop.hasHumidor) score += 20;
            if (shop.sellsAccessory) score += 5;

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
        initialShops,
        search,
        selectedState,
        selectedBrand,
        selectedFeature,
        sortBy,
        userCoords,
        onlyLounge,
        onlyHumidor,
        onlyAccessory,
    ]);

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
        setOnlyAccessory(false);
        setSelectedState("ALL");
        setSortBy("featured");
        router.push("/shops");
    };

    const filterButtons = [
        { label: "Lounge", active: onlyLounge, onClick: () => setOnlyLounge((prev) => !prev) },
        { label: "Humidor", active: onlyHumidor, onClick: () => setOnlyHumidor((prev) => !prev) },        
        { label: "Accessories", active: onlyAccessory, onClick: () => setOnlyAccessory((prev) => !prev) },
    ];

 
    return (
        <main className="min-h-screen text-white">
            <div className="relative mx-auto max-w-6xl px-6">
                <div className="hidden xl:block absolute top-24 right-full -translate-x-6 space-y-8">
                    <CigarComparePromo />
                    <CigarOfTheDayPromo />
                </div>

                <div className="hidden xl:block absolute top-24 left-full translate-x-6">
                    <CivicsMapPromo />
                </div>

                

                <div className="w-full">
                    <BrandMarquee />
                    
                </div>

                <section className="mt-8 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                        Discover
                    </p>

                    <h1 className="mt-4 text-5xl font-bold tracking-tight">
                        Find local cigar shops, lounges, and premium humidors.
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-blue-300">
                        Discover nearby cigar destinations with lounge information, humidor
                        details, featured retailers, and premium shop highlights.
                    </p>
                </section>

                {featuredShops.length > 0 && (
                    <section className="mt-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                            Featured and Sponsored Shops
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white">
                            Top lounge picks
                        </h2>

                        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                
                            {featuredShops.map((shop) => {
                                const highlights = [
                                    shop.hasLounge && "Lounge",
                                    shop.hasHumidor && "Humidor",
                                    shop.canBringInLiquor && "BYOB",
                                    shop.hasEvents && "Events",
                                ]
                                    .filter(Boolean)
                                    .slice(0, 3);

                                return (
                                    <Link key={shop.id} href={`/shops/${shop.slug}`}>
                                        <div className="group relative flex flex-col h-full overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-amber-300/40 hover:shadow-[0_0_60px_rgba(255,200,0,0.25)]">

                                            {/* Image */}
                                            <div className="relative mb-4 h-40 overflow-hidden rounded-xl">
                                                <Image
                                                    src={shop.image || "/images/shops/davidus-cigars-annapolis/front.jpg"}
                                                    alt={shop.name}
                                                    fill
                                                    className="object-cover transition duration-300 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                            
                                            <div className="mb-3 flex flex-wrap gap-2">
                                                {shop.isFeatured && !shop.isSponsored && (
                                                    <span className="rounded-full bg-amber-300/20 px-3 py-1 text-xs font-bold text-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.4)]">
                                                        Featured
                                                    </span>
                                                )}

                                                {shop.isSponsored && (
                                                    <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-black">
                                                        Sponsored
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-yellow-300">{shop.name}</h3>
                                            <p className="mt-1 text-md text-neutral-400">
                                                {shop.address}
                                            </p>
                                            <p className="mt-4 line-clamp-4 text-sm leading-7 text-neutral-300">
                                                {shop.description}
                                            </p>
                                                {shop.rating != null && (
                                                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200">
                                                        ★ {shop.rating} ({shop.reviewCount})
                                                    </span>
                                                )}
                                            </div>

                                            {/* ⭐ Highlights HERE */}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {highlights.map((label) => (
                                                    <span
                                                        key={label}
                                                        className="rounded-full bg-black/30 px-3 py-1 text-xs text-white"
                                                    >
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>

                                        </div>
                                    </Link>
                                    
                                );
                            })}
                        </div>
                        
                        
                    </section>
                )}

                <section className="sticky top-4 z-30 mt-8 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-5">
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-400/10 via-transparent to-white/5" />

                    <div className="relative">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/90">
                                    Refine Results
                                </p>
                                <p className="mt-1 text-sm text-neutral-400">
                                    Search, sort, and narrow shops by amenities and cigar brand selection.
                                </p>
                            </div>

                            <div className="hidden rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-300 md:flex">
                                {filteredShops.length} result{filteredShops.length === 1 ? "" : "s"}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:flex-row">
                            <div className="relative xl:flex-[1.05]">
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

                            <div className="relative w-full lg:w-[210px]">
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
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 py-3 pl-12 pr-10 text-white outline-none transition focus:border-amber-400/70 focus:bg-black/40"
                                >
                                    <option value="ALL">Any brand</option>
                                    <option value="PADRON">Padron</option>
                                    <option value="FUENTE">Fuente</option>
                                    <option value="OPUSX">Opus X</option>
                                    <option value="RARE_OPUS_X">Rare OpusX</option>
                                    <option value="ASHTON">Ashton</option>
                                    <option value="DIAMOND">Diamond Crown</option>
                                    <option value="AROMA">Aroma de Cuba</option>
                                    <option value="DAVIDOFF">Davidoff</option>
                                    <option value="AVO">Avo</option>
                                    <option value="LIGA">Liga Privada</option>
                                    <option value="ACID">Acid</option>
                                    <option value="TATUAJE">Tatuaje</option>
                                    <option value="PERDOMO">Perdomo</option>
                                    <option value="ALEC">Alec Bradley</option>
                                    <option value="HOYA">Hoya de Monterrey</option>
                                    <option value="LFD">LFD</option>
                                    <option value="OLIVA">Oliva</option>
                                    <option value="NUB">Nub</option>
                                    <option value="CAIN">Cain</option>
                                    <option value="MYFATHER">My Father</option>
                                    <option value="CAMACHO">Camacho</option>
                                    <option value="AJ">AJ Fernandez</option>
                                    <option value="SANCRISTOBOL">San Cristobol</option>
                                    <option value="ATABEY">Atabey</option>
                                    <option value="LORDBYRON">Lord Byron</option>
                                    <option value="GREYCLIFF">Greycliff</option>
                                    <option value="DUNHILL">Dunhill</option>
                                    <option value="HOUSE_CIGAR">House Cigars</option>
                                    <option value="MONTECRISTO">Montecristo</option>
                                    <option value="ROMEO">Romeo y Julietta</option>
                                    <option value="HUPPMAN">H. Uppman</option>
                                    <option value="CAO">CAO</option>
                                    <option value="RP">Rocky Patel</option>
                                    <option value="COHIBA">Cohiba</option>
                                    <option value="PUNCH">Punch</option>
                                    <option value="AGING">Aging Room</option>
                                    <option value="MACANUDO">Macanudo</option>
                                    <option value="GURKHA">Gurkha</option>
                                    <option value="PARTAGAS">Partagas</option>
                                    <option value="LAAURORA">La Aurora</option>
                                    <option value="PLASENCIA">Plasencia</option>
                                    <option value="AGANORSA">Aganorsa</option>
                                    
                                    
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

                            
                            <div className="relative w-full xl:w-[210px]">
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
                                    value={selectedFeature}
                                    onChange={(e) => setSelectedFeature(e.target.value)}
                                    className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 py-3 pl-12 pr-10 text-white outline-none transition focus:border-amber-400/70 focus:bg-black/40"
                                >
                                    <option value="ALL">Filter by feature</option>
                                    <option value="LOUNGE">Lounge</option>
                                    <option value="HUMIDOR">Humidor</option>
                                    <option value="ACCESSORY">Accessories</option>
                                    <option value="MEMBER_LOCKER">Member Lockers</option>
                                    <option value="SELLS_FOOD">Sells Food</option>
                                    <option value="SELLS_DRINK">Sells Drinks (Sodas, Water, etc...)</option>
                                    <option value="LIVE_MUSIC">Live music</option>
                                    <option value="PIPE_TOBACCO">Pipe Tobacco</option>
                                    <option value="MEMBER_ACCESS">Member Access</option>
                                    <option value="EVENTS">Special Events</option>
                                    <option value="HOOKA">Hooka</option>
                                    <option value="LIQUOR_LICENSE">Liquor License</option>
                                    <option value="BRING_LIQUOR">Bring Your Own Liquor</option>
                                    <option value="INTERNET_ACCESS">Internet Access</option>
                                    <option value="COFFEE_MAKER">Coffee Maker</option>
                                    <option value="ICE_MAKER">Ice Maker</option>
                                    <option value="BIG_TV">Big TV(s)</option>
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
                        </div>
                        

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={handleUseMyLocation}
                                disabled={locationLoading}
                                className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {locationLoading ? "Finding your location..." : "Use My Location"}
                            </button>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-amber-400/40 hover:bg-white/15"
                            >
                                Clear Filters
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
                                        <path d="M3 6h18" />
                                        <path d="M7 12h10" />
                                        <path d="M10 18h4" />
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
                        </div>
                        <div className="flex flex-col gap-3 lg:flex-row">
                            

                            <div className="relative w-full lg:w-[210px]">
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
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                    className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 py-3 pl-12 pr-10 text-white outline-none transition focus:border-amber-400/70 focus:bg-black/40"
                                >
                                    {STATES.map((state) => (
                                        <option key={state.value} value={state.value}>
                                            {state.name}
                                        </option>
                                    ))}
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
                            <div className="relative w-full lg:w-[210px]">
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

                                <div className="relative w-full xl:w-[210px]">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >

                                        </svg>
                                    </span>


                                </div>

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
                            
                        </div>
                        

                        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-neutral-300 md:hidden">
                            {filteredShops.length} result{filteredShops.length === 1 ? "" : "s"}
                        </div>
                    </div>
                </section>
                <CigarMarquee />
                <section className="mt-10">
                    <h2 className="mb-4 text-xl font-semibold text-white">
                        All shops
                    </h2>
                    <p className="text-sm text-green-400">
                        Brand: {selectedBrand} 
                    </p>
                    <p className="mb-6 text-neutral-400">
                        {filteredShops.length} results found
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
                                    className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-amber-400 hover:shadow-xl"
                                >
                                    <div className="relative mb-4 h-40 overflow-hidden rounded-xl">
                                        <Image
                                            src={shop.image || "/images/shops/davidus-cigars-annapolis/front.jpg"}  
                                            alt={shop.name}
                                            fill
                                            className="object-cover transition duration-300 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>

                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {shop.isFeatured && !shop.isSponsored && (
                                            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                                                Featured
                                            </span>
                                        )}
                                        
                                        {shop.isSponsored && (
                                            <span className="rounded-full border border-amber-300/40 bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                                Sponsored
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

                                    {shop.distance != null ? (
                                        <div className="mt-2 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                                            {shop.distance.toFixed(1)} miles away
                                        </div>
                                    ) : null}

                                    <p className="mt-4 line-clamp-4 text-sm leading-7 text-neutral-300">
                                        {shop.description}
                                    </p>

                                    
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
                <div className="mt-8 space-y-6 xl:hidden">
                    <CigarComparePromo />
                    <CigarOfTheDayPromo />
                    <CivicsMapPromo />
                </div>
            </div>
        </main>
    );
    };