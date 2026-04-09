"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const states = ["ALL", "FL", "GA", "NY", "NC", "TX"];

export default function FilterBar() {
    const [sortBy, setSortBy] = useState("name-asc");
    const [selectedState, setSelectedState] = useState("ALL");

    return (
        <div className="border border-[#4a4038] bg-[rgba(25,25,25,0.75)] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 border-b border-[#4a4038] p-4 md:flex-row">
                <input
                    placeholder="Search by shop name, city, state, ZIP, or address..."
                    className="h-14 flex-1 border border-[#4a4038] bg-[#181818] px-5 text-lg text-[#f0e4d6] placeholder:text-[#9c8f83] outline-none focus:border-[#b97832]"
                />

                <button className="h-14 min-w-[210px] border border-[#8c5a26] bg-[linear-gradient(to_bottom,#7a4418,#5c2f10)] px-6 text-lg font-semibold text-[#f7e6d0] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:brightness-110">
                    Clear Filters
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-b border-[#4a4038] p-4">
                <span className="text-2xl font-semibold text-[#f2e3cf]">Sort</span>

                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-12 appearance-none border border-[#4a4038] bg-[#181818] pl-5 pr-12 text-xl text-[#f0e4d6] outline-none focus:border-[#b97832]"
                    >
                        <option value="name-asc">Name (A–Z)</option>
                        <option value="name-desc">Name (Z–A)</option>
                        <option value="state-asc">State</option>
                        <option value="city-asc">City</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#d0c0b0]" />
                </div>

                {["Lounge", "Has Padrons", "Has Davidoffs", "Humidor", "Accessories"].map(
                    (item) => (
                        <button
                            key={item}
                            className="h-11 border border-[#7a4418] bg-[linear-gradient(to_bottom,#7a4418,#5d2f12)] px-4 text-lg font-semibold text-[#f2dfc7] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:brightness-110"
                        >
                            {item}
                        </button>
                    )
                )}
            </div>

            <div className="flex flex-wrap gap-4 p-4">
                {states.map((state) => {
                    const active = selectedState === state;

                    return (
                        <button
                            key={state}
                            onClick={() => setSelectedState(state)}
                            className={`h-12 min-w-[72px] border px-5 text-2xl font-semibold transition ${active
                                    ? "border-[#b97832] bg-[linear-gradient(to_bottom,#b97832,#8a551e)] text-[#fff3e2]"
                                    : "border-[#4a4038] bg-[linear-gradient(to_bottom,#2a211d,#1c1714)] text-[#f2dfc7] hover:border-[#8c5a26]"
                                }`}
                        >
                            {state}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}