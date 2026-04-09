"use client";

import Image from "next/image";

const brands = [
    { name: "Padrón", logo: "/brands/padron.jpg" },
    { name: "Davidoff", logo: "/brands/Davidoff.jpg" },
    { name: "Arturo Fuente", logo: "/brands/fuente.jpg" },
    { name: "Oliva", logo: "/brands/oliva.jpg" },
    { name: "Ashton", logo: "/brands/ashton.jpg" },
    { name: "AJ Fernandez", logo: "/brands/fernandez.png" },
    { name: "La Flor Dominicana", logo: "/brands/lfd.jpg" },
    { name: "Rocky Patel", logo: "/brands/rp.jpg" },
    { name: "Montecristo", logo: "/brands/monte.jpg" },
    { name: "Perdomo", logo: "/brands/perdomo.jpg" },
    
];

export default function BrandMarquee() {
    const loopedBrands = [...brands, ...brands];

    return (
        
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 py-5 shadow-xl shadow-black/20 backdrop-blur-xl">

            {/* Left fade */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-neutral-950 to-transparent" />

            {/* Right fade */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-neutral-950 to-transparent" />

            <div className="brand-marquee flex min-w-max items-center gap-6 px-6">
                {loopedBrands.map((brand, index) => (
                    <div
                        key={`${brand.name}-${index}`}
                        className="flex h-20 min-w-[220px] shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950 px-6 transition hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                        title={brand.name}
                    >
                        <div className="relative h-14 w-[180px]">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
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