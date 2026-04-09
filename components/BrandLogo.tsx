import Link from "next/link";

type Props = {
    compact?: boolean;
};

export default function BrandLogo({ compact = false }: Props) {
    return (
        <Link
            href="/"
            className="group inline-flex items-center gap-3 transition hover:opacity-95"
            aria-label="Cigar Shop Finder home"
        >
            <div className="relative">
                {/* soft glow */}
                <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-xl transition duration-500 group-hover:bg-amber-300/25" />

                {/* logo tile */}
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/30 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                    {/* cigar icon */}
                    <div className="relative h-5 w-8 rotate-[-18deg] rounded-full bg-gradient-to-r from-amber-200 via-amber-500 to-orange-700 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                        <div className="absolute right-0 top-0 h-full w-2 rounded-r-full bg-red-700/80" />
                        <div className="absolute left-1 top-1/2 h-[2px] w-5 -translate-y-1/2 rounded-full bg-black/20" />
                    </div>
                </div>
            </div>

            <div className={compact ? "hidden sm:block" : "block"}>
                <div className="text-[11px] uppercase tracking-[0.35em] text-amber-400/80">
                    Cutlerwater apps
                </div>
                <div className="text-lg font-semibold tracking-tight text-white">
                    Cigar Shop Finder
                </div>
            </div>
        </Link>
    );
}