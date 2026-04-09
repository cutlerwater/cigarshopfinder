"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();



    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const trimmed = query.trim();

        if (!trimmed) {
            router.push("/shops");
            return;
        }

        router.push(`/shops?q=${encodeURIComponent(trimmed)}`);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
                type="text"
                placeholder="Search by shop name, city, state, ZIP..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-400 focus:border-amber-400 focus:outline-none"
            />

            <button
                type="submit"
                className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400"
            >
                Search
            </button>
        </form>
    );
}