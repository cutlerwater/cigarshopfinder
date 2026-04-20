"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ShopMediaItem } from "@/lib/shops/shopMedia";

type Props = {
    shopName: string;
    items: ShopMediaItem[];
};

export default function ShopHeroMedia({ shopName, items }: Props) {
    const media = useMemo(() => items.filter(Boolean), [items]);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const currentItem = media[currentIndex];

    return (
        <div className="relative h-[420px] w-full overflow-hidden rounded-3xl md:h-[520px]">
            {currentItem?.type === "image" ? (
                <Image
                    key={currentItem.src}
                    src={currentItem.src}
                    alt={currentItem.alt}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                />
            ) : currentItem?.type === "video" ? (
                <video
                    key={currentItem.src}
                    src={currentItem.src}
                    poster={currentItem.poster}
                    controls
                    className="h-full w-full object-cover"
                />
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/60 to-black/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_28%)]" />

            {media.length > 1 && (
                <div className="absolute bottom-4 right-4 z-10 flex gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur">
                    {media.map((item, index) => (
                        <button
                            key={`${item.type}-${item.src}`}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2.5 w-2.5 rounded-full transition ${index === currentIndex
                                    ? "bg-amber-300"
                                    : "bg-white/40 hover:bg-white/70"
                                }`}
                            aria-label={`Go to media item ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}