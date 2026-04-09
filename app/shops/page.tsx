"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { shops } from "@/lib/shops";

export default function ShopsPage() {
    const [search, setSearch] = useState("");
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

    const filteredShops = useMemo(() => {
        const term = search.toLowerCase().trim();

        return shops.filter((shop) => {
            const matchesSearch =
                term === "" ||
                shop.name.toLowerCase().includes(term) ||
                shop.city.toLowerCase().includes(term) ||
                shop.state.toLowerCase().includes(term) ||
                shop.stateabb.toLowerCase().includes(term) ||
                shop.zip.toLowerCase().includes(term) ||
                shop.address.toLowerCase().includes(term) ||
                shop.description.toLowerCase().includes(term);

            const matchesLounge = !onlyLounge || shop.hasLounge;
            const matchesHumidor = !onlyHumidor || shop.hasHumidor;
            const matchesPadrons = !onlyPadrons || shop.hasPadrons;
            const matchesDavidoffs = !onlyDavidoffs || shop.hasDavidoffs;
            const matchesOpusx = !onlyOpusX || shop.hasOpusX;
            const matchesAcids = !onlyAcids || shop.hasAcid;
            const matchesPipetobacco = !onlyPipetobacco || shop.hasPipeTobacco;
            const matchesMemberAccess = !onlyMemberAccess || shop.hasMemberAccess;
            const matchesLiquorLicense = !onlyLiquorLicense || shop.hasliquorlicense;
            const matchesBringLiquor = !onlyBringLiquor || shop.canbringinliquor;
            const matchesInternetAccess = !onlyLiquorLicense || shop.hasinternetaccess;
            const matchesCoffeeMaker = !onlyCoffeeMaker || shop.hasPipeTobacco;
            const matchesIceMaker = !onlyIceMaker || shop.hasPipeTobacco;
            const matchesBigTV = !onlyBigTV || shop.hasPipeTobacco;
            const matchesAccessories = !onlyAccessories || shop.sellsAccessories;

            return (
                matchesSearch &&
                matchesLounge &&
                matchesHumidor &&
                matchesPadrons &&
                matchesDavidoffs &&
                matchesOpusx &&
                matchesAcids &&
                matchesPipetobacco &&
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
    }, [search, onlyLounge, onlyHumidor, onlyPadrons, onlyDavidoffs, onlyOpusX, onlyAcids, onlyPipetobacco, onlyMemberAccess, onlyLiquorLicense, onlyBringLiquor, onlyInternetAccess, onlyCoffeeMaker, onlyIceMaker, onlyBigTV, onlyAccessories]);
    
    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                    Cigar Shop Finder
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
                    Browse cigar shops
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-neutral-400">
                    Search by shop name, city, state, abbreviation, ZIP code, or address.
                    Then refine results with filters.
                </p>
            </div>

            <section className="mb-8 rounded-2xl border border-white/10 bg-neutral-900/70 p-5 shadow-lg">
                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                    <input
                        type="text"
                        placeholder="Search by name, city, state, ZIP..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-amber-500"
                    />

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
                        }}
                        className="rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
                    >
                        Clear Filters
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => setOnlyLounge((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyLounge
                                ? "bg-amber-600 text-white"
                                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Lounge
                    </button>

                    <button
                        type="button"
                        onClick={() => setOnlyHumidor((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyHumidor
                                ? "bg-amber-600 text-white"
                                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Humidor
                    </button>

                    <button
                        type="button"
                        onClick={() => setOnlyPadrons((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyPadrons
                                ? "bg-amber-600 text-white"
                                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Padrons
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyDavidoffs((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyDavidoffs
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Davidoffs
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyOpusX((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyOpusX
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        OpusX
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyAcids((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyAcids
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Acids
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyPipetobacco((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyPipetobacco
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Pipe Tobacco
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyMemberAccess((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyMemberAccess
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Member Access
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyLiquorLicense((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyLiquorLicense
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Liquor License
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyBringLiquor((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyBringLiquor
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Can Bring Liquor
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyInternetAccess((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyInternetAccess
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Internet Access
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyCoffeeMaker((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyCoffeeMaker
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Coffee Maker
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyIceMaker((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyIceMaker
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Ice Maker
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyBigTV((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyBigTV
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Big TV(s)
                    </button>
                    <button
                        type="button"
                        onClick={() => setOnlyAccessories((prev) => !prev)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${onlyAccessories
                            ? "bg-amber-600 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            }`}
                    >
                        Accessories
                    </button>
                </div>
            </section>

            <div className="mb-5 text-sm text-neutral-400">
                Showing {filteredShops.length} {filteredShops.length === 1 ? "shop" : "shops"}
            </div>

            {filteredShops.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-8 text-center text-neutral-400">
                    No shops matched your search or filters.
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredShops.map((shop) => (
                        <Link
                            key={shop.id}
                            href={`/shops/${shop.slug}`}
                            className="group rounded-2xl border border-white/10 bg-neutral-900/80 p-5 transition hover:-translate-y-1 hover:border-amber-500/50 hover:bg-neutral-900"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white group-hover:text-amber-400">
                                        {shop.name}
                                    </h2>
                                    <p className="mt-1 text-sm text-neutral-400">
                                        {shop.city}, {shop.stateabb}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-neutral-300">
                                {shop.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {shop.hasLounge && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Lounge
                                    </span>
                                )}
                                {shop.hasHumidor && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Humidor
                                    </span>
                                )}
                                {shop.hasPadrons && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Padrons
                                    </span>
                                )}
                                {shop.hasDavidoffs && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Davidoffs
                                    </span>
                                )}
                                {shop.hasOpusX && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        OpusX
                                    </span>
                                )}
                                {shop.hasAcid && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Acid
                                    </span>
                                )}
                                {shop.hasPipeTobacco && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Pipe Tobacco
                                    </span>
                                )}
                                {shop.hasMemberAccess && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Member Access
                                    </span>
                                )}
                                {shop.hasliquorlicense && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Liquor License
                                    </span>
                                )}
                                {shop.canbringinliquor && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Can bring liquor
                                    </span>
                                )}
                                {shop.hasinternetaccess && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Internet Access
                                    </span>
                                )}
                                {shop.hascoffeemaker && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Coffee Maker
                                    </span>
                                )}
                                {shop.hasicemaker && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Ice Maker
                                    </span>
                                )}
                                {shop.hasBigTV && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Big TV(s)
                                    </span>
                                )}
                                {shop.sellsAccessories && (
                                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
                                        Accessories
                                    </span>
                                )}
                            </div>

                            <div className="mt-5 text-sm font-medium text-amber-500">
                                View details →
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
   
