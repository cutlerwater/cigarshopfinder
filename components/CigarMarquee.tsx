"use client";

import Image from "next/image";

const cigars = [
    { name: "Padron 1926", logo: "/cigars/1926.jpg" },
    { name: "Opus X BBMF", logo: "/cigars/bbmf.jpg" },
    { name: "Arturo Fuente Anejo Shark", logo: "/cigars/AnejoShark.jpg" },
    { name: "Fuente and Padron Collaboration cigar", logo: "/cigars/collaboration.jpg" },
    { name: "LFD Chisel", logo: "/cigars/chisel.jpg" },
    { name: "Davidoff", logo: "/cigars/davidoff.jpeg" },
    { name: "Perdomo 30th anniversary", logo: "/cigars/perdomo30.jpg" },
    { name: "Ashton VSG", logo: "/cigars/vsgenchantment.jpg" },
    { name: "Montecristo", logo: "/cigars/monte.jpg" },
    { name: "Lord Baltimore", logo: "/cigars/lordbalt.jpg" },
    
];

export default function BrandMarquee() {
    const loopedcigars = [...cigars, ...cigars];

    return (
        
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 py-5 shadow-xl shadow-black/20 backdrop-blur-xl">

            {/* Left fade */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-neutral-950 to-transparent" />

            {/* Right fade */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-neutral-950 to-transparent" />

            <div className="brand-marquee flex min-w-max items-center gap-6 px-6">
                {loopedcigars.map((cigar, index) => (
                    <div
                        key={`${cigar.name}-${index}`}
                        className="flex h-20 min-w-[220px] shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950 px-6 transition hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                        title={cigar.name}
                    >
                        <div className="relative h-14 w-[180px]">
                            <Image
                                src={cigar.logo}
                                alt={cigar.name}
                                fill
                                className="object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
                                sizes="160px"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}