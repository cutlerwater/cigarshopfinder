"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type HeroBannerProps = {
    eyebrow?: string;
    title: string;
    subtitle: string;
    showSearch?: boolean;
    initialQuery?: string;
};

export default function HeroBanner({
    eyebrow = "Cigar Shops",
    title,
    subtitle,
    showSearch = true,
    initialQuery = "",
}: HeroBannerProps) {
    const router = useRouter();
    const [query, setQuery] = useState(initialQuery);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!query.trim()) {
            router.push("/shops");
            return;
        }

        router.push(`/shops?q=${encodeURIComponent(query.trim())}`);
    }

    return (
        <section className="relative overflow-hidden border-b border-white/10 bg-[#0a0a0a]">
            <div className="absolute inset-0">
                {/* base lighting */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.22),transparent_40%)]" />
                {/* texture (strong but controlled) */}
                <div className="absolute inset-0 bg-[url('/images/texture.png')] bg-cover bg-center opacity-[0.65]" />
            </div>

            <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-12 lg:py-12">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-8 lg:p-10">
                    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                        <div className="relative mb-8 h-40 w-full max-w-[800px] md:h-72 lg:h-80">
                            <Image
                                src="/images/cutlerwater-logo.png"
                                alt="Cutlerwater Cigar Shop Finder"
                                fill
                                className="object-contain drop-shadow-[0_14px_34px_rgba(0,0,0,0.75)]"
                                sizes="(max-width: 640px) 100vw, 800px"
                                priority
                            />
                        </div>

                        {false && (
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">
                                {eyebrow}
                            </p>
                        )}

                        <h1 className="max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-[#b86b14] sm:text-4xl lg:text-5xl">
                            {title}
                        </h1>

                        <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-400 sm:text-lg">
                            {subtitle}
                        </p>

                        {showSearch && (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 w-full max-w-4xl rounded-[24px] border border-white/10 bg-black/35 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                            >
                                <div className="flex flex-col gap-3 md:flex-row">
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search by shop name, city, state, ZIP, or address..."
                                        className="h-14 flex-1 rounded-2xl border border-white/10 bg-[#111111] px-5 text-base text-white placeholder:text-neutral-500 focus:border-amber-400/60 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="h-14 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-500 px-6 text-base font-semibold text-black transition hover:brightness-110"
                                    >
                                        Search Shops
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}