"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ShopMediaItem } from "@/lib/shops/shopMedia";

type Props = {
    shopName: string;
    items: ShopMediaItem[];
    onOverlayChange?: (visible: boolean) => void;
};

export default function ShopHeroMedia({ shopName, items }: Props) {
    const media = useMemo(() => items.filter(Boolean), [items]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showOverlay, setShowOverlay] = useState(true);
    const [dimOverlay, setDimOverlay] = useState(false);
    const [isFading, setIsFading] = useState(false);
    

    useEffect(() => {
        if (media.length <= 1) return;
        if (media[currentIndex]?.type === "video") return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % media.length);
        }, 4500);

        return () => clearInterval(interval);
    }, [media, currentIndex]);

    if (media.length === 0) {
        return (
            <div className="relative h-[420px] w-full bg-neutral-900 md:h-[520px]" />
        );
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setDimOverlay(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const currentItem = media[currentIndex];

    return (
        <div>
            <div
                className={`relative h-[420px] w-full overflow-hidden rounded-3xl md:h-[520px] transition-opacity duration-700 ${dimOverlay ? "opacity-85" : "opacity-100"
                    }`}
            >
                {currentItem?.type === "image" ? (
                    <Image
                        key={currentItem.src}
                        src={currentItem.src}
                        alt={currentItem.alt ?? shopName}
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className={`object-cover transition-opacity duration-200 ${isFading ? "opacity-0" : "opacity-100"
                            }`}
                    />
                ) : currentItem?.type === "video" ? (
                    <video
                        key={currentItem.src}
                        src={currentItem.src}
                        poster={currentItem.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="h-full w-full bg-black object-cover"
                    />
                ) : null}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-black/20 to-black/10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_28%)]" />

                {/* dots */}
                {media.length > 1 && (
                    <div className="absolute bottom-4 right-4 z-10 flex gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur">
                        {media.map((item, index) => (
                            <button
                                key={`${item.type}-${item.src}`}
                                type="button"
                                onClick={() => {
                                    if (index === currentIndex) return;

                                    setIsFading(true);
                                    setTimeout(() => {
                                        setCurrentIndex(index);
                                        setIsFading(false);
                                    }, 150);
                                }}
                                className={`h-2.5 w-2.5 rounded-full transition ${index === currentIndex
                                        ? "bg-blue-400"
                                        : "bg-white/40 hover:bg-white/70"
                                    }`}
                                aria-label={`Go to media item ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* thumbnails OUTSIDE hero div */}
            {media.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                    {media
                        .filter((item) => item.type === "image")
                        .map((item, index) => (
                            <button
                                key={item.src}
                                type="button"
                                onClick={() => {
                                    if (index === currentIndex) return;

                                    setIsFading(true);
                                    setTimeout(() => {
                                        setCurrentIndex(index);
                                        setIsFading(false);
                                    }, 150);
                                }}
                                className={`h-20 w-32 shrink-0 overflow-hidden rounded-lg border ${currentIndex === index
                                        ? "border-amber-300"
                                        : "border-white/10 hover:border-amber-300/60"
                                    }`}
                            >
                                <img
                                    src={item.src}
                                    alt={item.alt ?? shopName}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                </div>
            )}
        </div>

    );
}