import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Cigar Shops
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Find local cigar shops, lounges, and premium humidors.
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-300">
            Discover nearby cigar destinations with lounge information, humidor
            details, and shop highlights.
          </p>

          <div className="mt-8">
            <SearchBar />
          </div>

          <div className="mt-8">
            <Link
              href="/shops"
              className="inline-flex rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400"
            >
              Browse Shops
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}