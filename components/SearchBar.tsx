"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [lounge, setLounge] = useState(false);
    const [humidor, setHumidor] = useState(false);
    const [padrons, setPadrons] = useState(false);
    const [davidoffs, setDavidoffs] = useState(false);
    const [opusx, setOpusX] = useState(false);
    const [acids, setAcids] = useState(false);
    const [pipetobacco, setPipetobacco] = useState(false);
    const [memberAccess, setMemberAccess] = useState(false);
    const [liquorlicense, setLiquorLicense] = useState(false);
    const [bringinliquor, setBringinLiquor] = useState(false);
    const [internetaccess, setInternetAccess] = useState(false);    
    const [coffeemaker, setCoffeeMaker] = useState(false);
    const [icemaker, setIceMaker] = useState(false);
    const [bigtv, setBigTv] = useState(false);
    const [accessories, setAccessories] = useState(false);

    const router = useRouter();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const params = new URLSearchParams();

        if (search.trim()) {
            params.set("search", search.trim());
        }

        if (lounge) {
            params.set("lounge", "true");
        }

        if (humidor) {
            params.set("humidor", "true");
        }
        if (padrons) {
            params.set("padrons", "true");
        }
        if (davidoffs) {
            params.set("davidoffs", "true");
        }
        if (opusx) {
            params.set("opusx", "true");
        }
        if (acids) {
            params.set("acids", "true");
        }
        if (pipetobacco) {
            params.set("pipetobacco", "true");
        }
        if (memberAccess) {
            params.set("memberaccess", "true");
        }     
        if (liquorlicense) {
            params.set("liquorlicense", "true");
        }   
        if (bringinliquor) {
            params.set("bringinliquor", "true");
        }
        if (internetaccess) {
            params.set("internetaccess", "true");
        }
        if (coffeemaker) {
            params.set("coffeemarker", "true");
        }
        if (icemaker) {
            params.set("icemaker", "true");
        }
        if (bigtv) {
            params.set("bigtv", "true");
        }
        if (accessories) {
            params.set("accessories", "true");
        }

        const queryString = params.toString();
        router.push(queryString ? `/shops?${queryString}` : "/shops");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
            <div className="flex flex-col gap-3 md:flex-row">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter ZIP code, city, state, or shop name"
                    className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-neutral-500"
                />
                <button
                    type="submit"
                    className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400"
                >
                    Search
                </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={lounge}
                        onChange={(e) => setLounge(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Lounge
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={humidor}
                        onChange={(e) => setHumidor(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Humidor
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={padrons}
                        onChange={(e) => setPadrons(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Padrons
                </label>    
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={davidoffs}
                        onChange={(e) => setDavidoffs(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Davidoffs
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={opusx}
                        onChange={(e) => setOpusX(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Opus X
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={acids}
                        onChange={(e) => setAcids(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Acids
                </label>  
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={pipetobacco}
                        onChange={(e) => setPipetobacco(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Pipe Tobacco
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={memberAccess}
                        onChange={(e) => setMemberAccess(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Member Access
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={liquorlicense}
                        onChange={(e) => setLiquorLicense(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Liquor License
                </label>      
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={bringinliquor}
                        onChange={(e) => setBringinLiquor(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Can Bring in Liquor
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={internetaccess}
                        onChange={(e) => setInternetAccess(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Internet Access
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={coffeemaker}
                        onChange={(e) => setCoffeeMaker(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Coffee Maker
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={icemaker}
                        onChange={(e) => setIceMaker(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Ice Maker
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={bigtv}
                        onChange={(e) => setBigTv(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Big TV(s)
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-neutral-200">
                    <input
                        type="checkbox"
                        checked={accessories}
                        onChange={(e) => setAccessories(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Accessories
                </label>
            </div>
        </form>
    );
}