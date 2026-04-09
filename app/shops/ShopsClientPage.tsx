"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { shops } from "@/lib/shops";

type Props = {
    initialQuery: string;
};

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
    const [sortBy, setSortBy] = useState("name-asc");

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
            const matchesLiquorLicense = !onlyLiquorLicense || shop.hasliquorlicense;
            const matchesBringLiquor = !onlyBringLiquor || shop.canbringinliquor;
            const matchesInternetAccess = !onlyInternetAccess || shop.hasinternetaccess;
            const matchesCoffeeMaker = !onlyCoffeeMaker || shop.hascoffeemaker;
            const matchesIceMaker = !onlyIceMaker || shop.hasicemaker;
            const matchesBigTV = !onlyBigTV || shop.hasBigTV;
            const matchesAccessories = !onlyAccessories || shop.sellsAccessories;

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

        filtered.sort((a, b) => {
            switch (sortBy) {
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
                    return a.name.localeCompare(b.name);
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


    const states = Array.from(
        new Set(shops.map((shop) => shop.stateabb))
    ).sort();

    return (
        <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-12">
                <section className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                        Cigar Shops
                    </p>
                    <h1 className="mt-4 text-5xl font-bold tracking-tight">
                        Find local cigar shops, lounges, and premium humidors.
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-neutral-300">
                        Discover nearby cigar destinations with lounge information, humidor
                        details, and shop highlights.
                    </p>
                </section>

                <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-lg">
                    <div className="flex flex-col gap-4 md:flex-row">
                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search by shop name, city, state, ZIP, or address..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white placeholder:text-neutral-400 focus:border-amber-400 focus:outline-none"
                        />

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full md:w-[180px] rounded-xl bg-neutral-800 px-4 py-3 font-medium text-white transition hover:bg-neutral-700"
                        >
                            <option value="name-asc">Name (A–Z)</option>
                            <option value="name-desc">Name (Z–A)</option>
                            <option value="city-asc">City (A–Z)</option>
                            <option value="city-desc">City (Z–A)</option>
                            <option value="state-asc">State (A–Z)</option>
                            <option value="state-desc">State (Z–A)</option>
                        </select>

                        {/* Clear Filters */}
                        <button
                            type="button"
                            onClick={() => {
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
                                setSortBy("name-asc"); // 👈 ADD THIS
                                router.push("/shops");
                            }}
                            className="rounded-xl bg-neutral-800 px-4 py-3 font-medium text-white transition hover:bg-neutral-700"
                        >
                            Clear Filters
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row"></div>
                    <p className="mt-4 text-xs uppercase text-neutral-400">Filters</p>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => setOnlyLounge((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyLounge
                                    ? "bg-amber-500 text-black"
                                    : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Lounge
                        </button>

                        <button
                            type="button"
                            onClick={() => setOnlyHumidor((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyHumidor
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Humidor
                        </button>

                        <button
                            type="button"
                            onClick={() => setOnlyPadrons((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyPadrons
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Padrons
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyDavidoffs((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyDavidoffs
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Davidoffs
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyOpusX((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyOpusX
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            OpusX
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyAcids((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyAcids
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Acids
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyPipetobacco((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyPipetobacco
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Pipe Tobacco
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyMemberAccess((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyMemberAccess
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Member Access
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyLiquorLicense((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyLiquorLicense
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Liquor License
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyBringLiquor((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyBringLiquor
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Can Bring Liquor
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyInternetAccess((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyInternetAccess
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Internet Access
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyCoffeeMaker((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyCoffeeMaker
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Coffee Maker
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyIceMaker((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyIceMaker
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Ice Maker
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyBigTV((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyBigTV
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Big TV(s)
                        </button>
                        <button
                            type="button"
                            onClick={() => setOnlyAccessories((prev) => !prev)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyAccessories
                                ? "bg-amber-500 text-black"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                                }`}
                        >
                            Accessories
                        </button>
                    </div>

                    <p className="mt-4 text-xs uppercase text-neutral-400">State</p>
                    <div className="mt-2 flex flex-wrap gap-3">
                        {["ALL", ...states].map((state) => (
                            <button
                                key={state}
                                type="button"
                                onClick={() => setSelectedState(state)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedState === state
                                        ? "bg-amber-500 text-black"
                                        : "bg-neutral-800 text-white hover:bg-neutral-700"
                                    }`}
                            >
                                {state}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
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
                            {filteredShops.map((shop) => (
                                <Link
                                    key={shop.id}
                                    href={`/shops/${shop.slug}`}
                                    className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-amber-400 hover:shadow-xl"
                                >
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