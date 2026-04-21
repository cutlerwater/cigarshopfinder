"use client";

import Image from "next/image";
import Link from "next/link";
import { getFeaturedCigar } from "@/lib/cigars";

export default function CigarOfTheDayPromo() {
    const cigar = getFeaturedCigar();

    if (!cigar) return null;

    return (
        <Link
            href="/cigar-of-the-day"
            className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 transition hover:border-amber-300/40"
        >
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src={cigar.image}
                    alt={cigar.name}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-85 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                    Cigar of the Day
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-amber-300 transition">
                    {cigar.name}
                </h3>

                <p className="mt-2 text-sm text-neutral-300 line-clamp-2">
                    {cigar.description.slice(0, 100)}...
                </p>

                {cigar.rating && (
                    <div className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white">
                        ★ {cigar.rating}
                    </div>
                )}
            </div>
        </Link>
    );
}