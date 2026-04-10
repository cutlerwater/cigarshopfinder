"use client";

import { useState } from "react";

type Props = {
    name: string;
    address: string;
    city: string;
    stateabb: string;
    zip: string;
};

export default function ShopMapPanel({
    name,
    address,
    city,
    stateabb,
    zip,
}: Props) {
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [locationError, setLocationError] = useState("");
    const [mapLoaded, setMapLoaded] = useState(false);

    const fullAddress = `${address}, ${city}, ${stateabb} ${zip}`;
    const encodedAddress = encodeURIComponent(fullAddress);

    const mapSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    function handleDirectionsFromMe() {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported on this device.");
            window.open(directionsUrl, "_blank", "noopener,noreferrer");
            return;
        }

        setIsGettingLocation(true);
        setLocationError("");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                const fromMeUrl =
                    `https://www.google.com/maps/dir/?api=1` +
                    `&origin=${latitude},${longitude}` +
                    `&destination=${encodedAddress}` +
                    `&travelmode=driving`;

                window.open(fromMeUrl, "_blank", "noopener,noreferrer");
                setIsGettingLocation(false);
            },
            () => {
                setLocationError("Could not get your location. Opening the shop in Google Maps instead.");
                window.open(directionsUrl, "_blank", "noopener,noreferrer");
                setIsGettingLocation(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        );
    }

    return (
        <section className="rounded-3xl border border-amber-500/20 bg-black/40 p-6 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur">
            <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/80">
                    Location
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-amber-50">
                    Visit {name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-amber-100/70">
                    {fullAddress}
                </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10">
                {!mapLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
                )}

                <iframe
                    title={`Map of ${name}`}
                    src={mapSrc}
                    width="100%"
                    height="380"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapLoaded(true)}
                    className={`block min-h-[380px] w-full transition-opacity duration-500 ${mapLoaded ? "opacity-100" : "opacity-0"
                        }`}
                />
            </div>
                        
            <div className="mt-4 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={handleDirectionsFromMe}
                    disabled={isGettingLocation}
                    className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isGettingLocation ? "Finding your location..." : "Get Directions from Me"}
                </button>

                <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                    Open in Google Maps
                </a>
            </div>

            {locationError ? (
                <p className="mt-3 text-sm text-amber-300/80">{locationError}</p>
            ) : null}
        </section>
    );
}