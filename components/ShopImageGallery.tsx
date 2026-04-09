"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
    name: string;
    images: string[];
    logo?: string | null;
};

export default function ShopImageGallery({ name, images, logo }: Props) {
    const safeImages = images.filter(Boolean);
    const [selectedImage, setSelectedImage] = useState(
        safeImages[0] ?? logo ?? null
    );

    return (
        <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950">
            {/* MAIN IMAGE */}
            <div className="relative h-[320px] w-full">
                {selectedImage ? (
                    <Image
                        src={selectedImage}
                        alt={name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-sm text-neutral-500">
                        No image available
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {logo && (
                    <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-sm">
                        <Image
                            src={logo}
                            alt={`${name} logo`}
                            width={84}
                            height={42}
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                )}
            </div>

            {/* THUMBNAILS */}
            {safeImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto p-4">
                    {safeImages.map((img, index) => (
                        <button
                            key={`${img}-${index}`}
                            onClick={() => setSelectedImage(img)}
                            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border ${selectedImage === img
                                    ? "border-amber-400"
                                    : "border-neutral-700"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${name} ${index + 1}`}
                                fill
                                sizes="112px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}