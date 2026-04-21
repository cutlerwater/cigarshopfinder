
import Image from "next/image";
import GalleryLightbox from "@/components/GalleryLightBox";
import Link from "next/link";
import ShopMapPanel from "@/components/ShopMapPanel";
import { prisma } from "@/lib/prisma";
import ReviewForm from "@/components/ReviewForm";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import ReviewActions from "@/components/ReviewActions";
import { shopMedia } from "@/lib/shops/shopMedia";
import CigarComparePromo from "@/components/CigarComparePromo";
import CivicsMapPromo from "@/components/CivicsMapPromo";
import ShopHeroMedia from "@/components/ShopHeroMedia";


type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ShopDetailPage({ params }: Props) {
    const { slug } = await params;

    const session = await auth();
    const currentUserId = session?.user?.id ?? null;

    const shop = await prisma.shop.findUnique({
        where: { slug },
        include: {
            reviews: {
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });

    if (!shop) {
        notFound();
    }
    
    type MediaItem =
        | { type: "image"; src: string; alt: string }
        | { type: "video"; src: string; poster?: string };

    const mediaItems: MediaItem[] = [
        ...(shop.image
            ? [{ type: "image" as const, src: shop.image, alt: shop.name }]
            : []),
        ...((shopMedia[shop.slug] ?? []) as MediaItem[]),
    ].filter((item, index, arr) => {
        return (
            arr.findIndex((x) => x.type === item.type && x.src === item.src) === index
        );
    });

    const heroHighlights = [
        
        shop.hasLounge ? "Lounge" : null,
        shop.hasLiquorLicense ? "Liquor License" : null,
        shop.canBringInLiquor ? "Bring Your Own Liquor" : null,
        shop.hasMemberAccess ? "Member Access" : null,
        shop.hasEvents ? "Has Special Events" : null,
        shop.hasRareOpusX ? "Rare OpusX" : null,
    ].filter(Boolean) as string[];

    const allFeatures = [
        shop.hasHumidor ? "Humidor" : null,
        shop.hasLounge ? "Lounge" : null,
        shop.hasMemberLocker ? "Member Lockers" : null,
        shop.sellsFood ? "Sells Food" : null,
               
        shop.hasEvents ? "Has Special Events" : null,
        shop.hasLiquorLicense ? "Liquor License" : null,
        shop.canBringInLiquor ? "Bring Your Own Liquor" : null,
        shop.hasInternetAccess ? "Internet Access" : null,
        shop.hasCoffeeMaker ? "Coffee Maker" : null,
        shop.hasIceMaker ? "Ice Maker" : null,
        shop.hasBigTV ? "Big TV(s)" : null,
        shop.sellsAccessory ? "Accessories" : null,
        shop.hasPadron ? "Padron" : null,
        shop.hasFuente ? "Fuente" : null,
        shop.hasOpusX ? "OpusX" : null,
        shop.hasRareOpusX ? "Rare OpusX" : null,
        shop.hasAshton ? "Ashton" : null,
        shop.hasDiamond ? "Diamond Crown" : null,
        shop.hasAroma ? "Aroma de Cuba" : null,
        shop.hasDavidoff ? "Davidoff" : null,
        shop.hasAvo ? "Avo" : null,
        shop.hasLiga ? "Liga Privada" : null,
        shop.hasAcid ? "Acid" : null,
        shop.hasTatuaje ? "Tatuaje" : null,
        shop.hasPerdomo ? "Perdomo" : null,
        shop.hasAlec ? "Alec Bradley" : null,
        shop.hasHoya ? "Hoya De Monterrey" : null,
        shop.hasLFD ? "LFD" : null,
        shop.hasOliva ? "Oliva" : null,
        shop.hasNub ? "Nub" : null,
        shop.hasCain ? "Cain" : null,
        shop.hasMyFather ? "My Father" : null,
        shop.hasCamacho ? "Camacho" : null,
        shop.hasAJ ? "AJ Fernandez" : null,
        shop.hasSanCristobal ? "San Cristobal" : null,
        shop.hasAtabey ? "Atabey" : null,
        shop.hasLordByron ? "Lord Byron" : null,
        shop.hasGreyCliff ? "GreyCliff" : null,
        shop.hasDunhill ? "Dunhill" : null,
        shop.hasHouseCigar ? "House Cigars" : null,
        shop.hasMontecristo ? "Montecristo" : null,
        shop.hasRomeo ? "Romeo Y Julieta" : null,
        shop.hasHuppman ? "H. Upmann" : null,
        shop.hasCAO ? "CAO" : null,
        shop.hasRP ? "Rocky Patel" : null,
        shop.hasCohiba ? "Cohiba" : null,
        shop.hasPunch ? "Punch" : null,
        shop.hasAging ? "Aging Room" : null,
        shop.hasMacanudo ? "Macanudo" : null,
        shop.hasGurkha ? "Gurkha" : null,
        shop.hasPipeTobacco ? "Pipe Tobacco" : null, 
        shop.hasHooka ? "Hooka" : null,
        
    ].filter(Boolean) as string[];

    const galleryImages = mediaItems
        .filter((item): item is Extract<MediaItem, { type: "image" }> => item.type === "image")
        .map((item) => item.src);

    return (
        <main className="min-h-screen text-white">
            {/* hero */}
            <section className="group relative overflow-hidden border-b border-white/10">
                <ShopHeroMedia shopName={shop.name} items={mediaItems} />
                

                <div className="absolute inset-x-0 bottom-0 z-10 transition-opacity duration-700 opacity-100 group-hover:opacity-100">
                    <div className="mx-auto max-w-6xl px-6 pb-8 md:pb-12">
                        <div className="mb-4 flex flex-wrap gap-2">
                            {shop.isSponsored && (
                                <span className="rounded-full border border-blue-400-300/40 bg-blue-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                    Sponsored
                                </span>
                            )}

                            {shop.isFeatured && !shop.isSponsored && (
                                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black backdrop-blur-md">
                                    Featured
                                </span>
                            )}

                            {shop.reviews.length > 0 && (
                                <span className="rounded-full border border-blue-400-300/40 bg-blue-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                    ★{" "}
                                    {(
                                        shop.reviews.reduce((sum, r) => sum + r.rating, 0) /
                                        shop.reviews.length
                                    ).toFixed(1)}{" "}
                                    ({shop.reviews.length})
                                </span>
                            )}
                        </div>
                        <div className="fade-up">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                                Cigar 
                            </p>
                        </div>
                        <div className="fade-up-delay-1">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                                {shop.city}, {shop.stateabb}
                            </p>
                        </div>
                        
                        <div className="fade-up-delay-2">
                            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                                {shop.name}
                            </h1>
                        </div>

                        <div className="fade-up-delay-2">
                            <p className="mt-4 text-base text-neutral-300 md:text-lg">
                                {shop.address}
                            </p>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap gap-2">
                            {heroHighlights.map((label) => (
                                <span
                                    key={label}
                                    className="rounded-full border bg-blue-300/40 border-white/20 px-3 py-1 text-xs text-white backdrop-blur-md"
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="border-b border-white/10 bg-neutral-950/70 mt-6">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        Features & Brands
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                        What you’ll find here
                    </h2>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {allFeatures.map((label) => (
                            <span
                                key={label}
                                className="rounded-full border hover:text-white border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90 transition hover:bg-white/10 hover:border-white/20"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
            {/* gallery */}
            <section className="border-b border-white/10 bg-neutral-950/80">
                <div className="mx-auto max-w-6xl px-6 py-6">
                    
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                                Gallery
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">
                                Inside the lounge
                            </h2>
                        </div>

                        <p className="hidden text-sm text-neutral-400 md:block">
                            A quick look at the atmosphere, seating, and humidor space.
                        </p>
                    </div>

                    <GalleryLightbox images={galleryImages} shopName={shop.name} />
                </div>
            </section>
            {/* MAIN CONTENT */}
            <section className="mx-auto max-w-6xl px-6 py-10">
                
                <div className="mb-8">
                    <Link
                        href="/shops"
                        className="inline-flex items-center gap-2 text-sm text-amber-300 transition hover:text-amber-200"
                    >
                        ← Back to shops
                    </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_380px]">
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                            Overview
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                            About this shop
                        </h2>
                        <p className="mt-4 leading-8 text-neutral-300">
                            {shop.description}
                        </p>
                    </div>

                    <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                            Visit Info
                        </p>

                        <div className="mt-5 space-y-5 text-sm text-neutral-300">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-neutral-500">
                                    Address
                                </p>
                                <p className="mt-1">
                                    {shop.address}

                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-neutral-500">
                                    Phone
                                </p>
                                <p className="mt-1">{shop.phone}</p>
                            </div>

                            {shop.website && (
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-neutral-500">
                                        Website
                                    </p>
                                    <a
                                        href={shop.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-1 inline-block text-amber-300 transition hover:text-amber-200"
                                    >
                                        Visit website
                                    </a>
                                </div>
                            )}
                        </div>

                    </aside>
                </div>
            </section>
            <section className="mx-auto max-w-6xl px-6 pb-16">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        Reviews
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold text-white">
                        What people are saying
                    </h2>

                    <div className="mt-6 space-y-4">
                        {shop.reviews.map((review) => (
                            <article
                                key={review.id}
                                className="rounded-2xl border border-white/10 bg-black/20 p-5"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {review.title || "Untitled Review"}
                                        </h3>

                                        <div className="mt-1 flex items-center gap-2 text-sm text-neutral-400">
                                            {review.user?.image ? (
                                                <img
                                                    src={review.user.image}
                                                    alt={review.user.name ?? "User"}
                                                    className="h-6 w-6 rounded-full object-cover border border-white/10"
                                                />
                                            ) : (
                                                <div className="h-6 w-6 rounded-full bg-neutral-700 border border-white/10 flex items-center justify-center text-[10px] text-white">
                                                    {(review.user?.name ??
                                                        review.authorName ??
                                                        "A")[0]}
                                                </div>
                                            )}

                                            <span>
                                                {review.user?.name ??
                                                    review.authorName ??
                                                    "Anonymous"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-amber-300">
                                        {"★".repeat(review.rating)}
                                        <span className="text-neutral-600">
                                            {"☆".repeat(5 - review.rating)}
                                        </span>


                                        {review.userId === currentUserId ? (
                                            <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                                                You
                                            </span>
                                        ) : null}
                                    </div>
                                </div>

                                {review.body && (
                                    <p className="mt-4 leading-7 text-neutral-300">
                                        {review.body}
                                    </p>
                                )}

                                <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                                {review.userId === currentUserId ? (
                                    <ReviewActions
                                        review={{
                                            id: review.id,
                                            title: review.title,
                                            body: review.body,
                                            rating: review.rating,
                                        }}
                                    />
                                ) : null}
                            </article>
                        ))}
                    </div>

                    <div className="mt-8">
                        <ReviewForm shopId={shop.id} />
                    </div>
                </div>
            </section>
            <ShopMapPanel
                name={shop.name}
                address={shop.address}
                city={shop.city}
                stateabb={shop.stateabb}
                zip={shop.zip}
            />
        </main>
    );
}