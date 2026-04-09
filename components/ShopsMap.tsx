"use client";

import Link from "next/link";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  type Longitude,
  type Latitude,
} from "@vnedyalk0v/react19-simple-maps";
import type { Shop } from "@/lib/shops";
import usStates from "us-atlas/states-10m.json";

type Props = {
  shops: Shop[];
  selectedShopSlug?: string | null;
  onSelectShop?: (slug: string) => void;
};



export default function ShopsMap({
  shops,
  selectedShopSlug,
  onSelectShop,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950">
      <div className="border-b border-neutral-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-white">Shop Map</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Click a marker to highlight a shop.
        </p>
      </div>
      

      <div className="bg-slate-700 p-4">
        <ComposableMap
          projection="geoAlbersUsa"
          style={{ width: "100%", height: "auto" }}
        >
 <Geographies geography={usStates}>
  {({ geographies }) =>
    geographies.map((geo) => (
      <Geography
        key={geo.id ?? geo.rsmKey}
        geography={geo}
        fill="#2563eb"
        stroke="#ffffff"
        strokeWidth={1.5}
        style={{
          default: {
            fill: "#2563eb",
            outline: "none",
            stroke: "#ffffff",
            strokeWidth: 1.5,
          },
          hover: {
            fill: "#60a5fa",
            outline: "none",
            stroke: "#ffffff",
            strokeWidth: 1.8,
          },
          pressed: {
            fill: "#60a5fa",
            outline: "none",
            stroke: "#ffffff",
            strokeWidth: 1.8,
          },
        }}
      />
    ))
  }
</Geographies>

          {shops.map((shop) => {
            const isSelected = selectedShopSlug === shop.slug;

            return (
              <Marker
                key={shop.id}
                coordinates={[
                shop.coordinates.lng as Longitude,
                shop.coordinates.lat as Latitude,
                ]}
                onClick={() => onSelectShop?.(shop.slug)}
                >
                <circle
                    r={isSelected ? 7 : 5}
                    fill={isSelected ? "#f59e0b" : "#ffffff"}
                    stroke="#111111"
                    strokeWidth={2}
                    className="cursor-pointer transition-all duration-200 drop-shadow-[0_0_6px_rgba(245,158,11,0.7)]"
                />
                <title>{shop.name}</title>
                </Marker>
            );
          })}
        </ComposableMap>
      </div>

      {selectedShopSlug && (
        <div className="border-t border-neutral-800 px-5 py-4">
          {shops
            .filter((shop) => shop.slug === selectedShopSlug)
            .map((shop) => (
              <div
                key={shop.id}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-white">
                    {shop.name}
                  </p>
                  <p className="text-sm text-neutral-400">
                    {shop.city}, {shop.stateabb}
                  </p>
                </div>

                <Link
                  href={`/shops/${shop.slug}`}
                  className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-300"
                >
                  View Shop
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}