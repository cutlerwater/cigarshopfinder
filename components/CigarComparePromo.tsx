import Link from "next/link";
import Image from "next/image";

export default function CigarComparePromo() {
    return (
        <div className="sticky top-24 w-[220px] ml-auto">
            <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-neutral-900 to-black p-4 shadow-xl shadow-black/40">

                {/* Logo */}
                <div className="mb-4 flex justify-center">
                    <Image
                        src="/images/CutlerwaterCigarCompare.png"
                        alt="Cigar Compare"
                        width={140}
                        height={60}
                        className="h-auto w-auto"
                    />
                </div>

                {/* Headline */}
                <h3 className="text-lg font-semibold text-white">
                    Find the best price before you buy
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                    Compare singles, 5-packs, and boxes across retailers and see true value per stick.
                </p>

                {/* CTA */}
                <Link
                    href="https://cigar-compare.vercel.app"
                    target="_blank"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-300"
                >
                    Compare Prices →
                </Link>

                {/* subtle glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-amber-400/10" />
            </div>
        </div>
    );
}