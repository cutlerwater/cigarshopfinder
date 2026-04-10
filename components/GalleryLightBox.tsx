"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    images: string[];
    shopName: string;
};

export default function GalleryLightbox({ images, shopName }: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const closeLightbox = () => setSelectedIndex(null);

    const showPrev = () => {
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    };

    const showNext = () => {
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex + 1) % images.length);
    };

    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") showPrev();
            if (event.key === "ArrowRight") showNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedIndex]);

    return (
        <>
            <div className="relative">
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-neutral-950 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-neutral-950 to-transparent" />

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={`${shopName}-gallery-${index}`}
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            className="group relative h-40 w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-lg shadow-black/20 transition hover:border-amber-400/40"
                        >
                            <Image
                                src={image}
                                alt={`${shopName} gallery image ${index + 1}`}
                                fill
                                className="object-cover transition duration-300 group-hover:scale-105"
                                sizes="280px"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </button>
                    ))}
                </div>
            </div>

            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
                    onClick={closeLightbox}
                >
                    <button
                        type="button"
                        onClick={closeLightbox}
                        className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
                        aria-label="Close gallery"
                    >
                        Close
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showPrev();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-white transition hover:bg-white/20"
                                aria-label="Previous image"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showNext();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-white transition hover:bg-white/20"
                                aria-label="Next image"
                            >
                                →
                            </button>
                        </>
                    )}

                    <div
                        className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900 shadow-2xl shadow-black/40"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[selectedIndex]}
                            alt={`${shopName} full gallery image ${selectedIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-md">
                        {selectedIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}