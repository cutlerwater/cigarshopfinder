
import Image from "next/image";
import GalleryLightbox from "@/components/GalleryLightBox";
import Link from "next/link";
import ShopMapPanel from "@/components/ShopMapPanel";
import { prisma } from "@lib/prisma";
import ReviewForm from "@/components/ReviewForm";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import ReviewActions from "@/components/ReviewActions";
import { shopMedia } from "@/lib/shops/shopMedia";
import CigarComparePromo from "@/components/CigarComparePromo";
import CivicsMapPromo from "@/components/CivicsMapPromo";


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
    const mediaItems = [
        ...(shop.image
            ? [{ type: "image" as const, src: shop.image, alt: shop.name }]
            : []),
        ...(shopMedia[shop.slug] ?? []),
    ].filter((item, index, arr) => {
        return arr.findIndex(
            (x) => x.type === item.type && x.src === item.src
        ) === index;
    });

    // 👇 THIS feeds your existing GalleryLightbox
    const galleryImages = mediaItems
        .filter(
            (item): item is Extract<typeof item, { type: "image" }> =>
                item.type === "image"
        )
        .map((item) => item.src);

    return (
        <main className="min-h-screen text-white">
            {/* hero */}
            <section className="relative overflow-hidden border-b border-white/10">
                
                

                <div className="absolute inset-x-0 bottom-0">
                    <div className="mx-auto max-w-6xl px-6 pb-8 md:pb-12">
                        <div className="mb-4 flex flex-wrap gap-2">
                            {shop.isSponsored && (
                                <span className="rounded-full border border-amber-300/40 bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                    Sponsored
                                </span>
                            )}

                            {shop.isFeatured && !shop.isSponsored && (
                                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                                    Featured
                                </span>
                            )}

                            {shop.reviews.length > 0 && (
                                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-md">
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
                                Cigar Shop
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
                            {shop.hasLounge && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Lounge
                                </span>
                            )}
                            {shop.hasHumidor && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Humidor
                                </span>
                            )}
                            {shop.hasPadron && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Padrons
                                </span>
                            )}
                            {shop.hasFuente && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Fuentes
                                </span>
                            )}
                            {shop.hasOpusX && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    OpusX
                                </span>
                            )}
                            {shop.hasRareOpusX && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Rare OpusX
                                </span>
                            )}
                            {shop.hasAshton && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Ashton
                                </span>
                            )}
                            {shop.hasDiamond && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Diamond Crown
                                </span>
                            )}
                            {shop.hasAroma && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Aroma de Cuba
                                </span>
                            )}
                            {shop.hasDavidoff && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Davidoffs
                                </span>
                            )}
                            {shop.hasAvo && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Avo
                                </span>
                            )}
                            {shop.hasLiga && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Liga Privada
                                </span>
                            )}
                            {shop.hasAcid && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Acid cigars
                                </span>
                            )}
                            {shop.hasTatuaje && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Tatuaju
                                </span>
                            )}
                            {shop.hasPerdomo && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Perdomos
                                </span>
                            )}
                            {shop.hasAlec && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Alec Bradley
                                </span>
                            )}
                            {shop.hasHoya && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Hoya De Monterrey
                                </span>
                            )}
                            {shop.hasLFD && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    LFDs
                                </span>
                            )}
                            {shop.hasOliva && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Olivas
                                </span>
                            )}
                            {shop.hasNub && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Nub
                                </span>
                            )}
                            {shop.hasCain && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Cain
                                </span>
                            )}
                            {shop.hasMyFather && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    My Father
                                </span>
                            )}
                            {shop.hasCamacho && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Camacho
                                </span>
                            )}
                            {shop.hasAJ && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    AJ Fernandez
                                </span>
                            )}
                            {shop.hasSanCristobal && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    San Cristobal
                                </span>
                            )}
                            {shop.hasAtabey && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Atabeys
                                </span>
                            )}
                            {shop.hasLordByron && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Lord Byron
                                </span>
                            )}
                            {shop.hasGreyCliff && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Greycliff
                                </span>
                            )}
                            {shop.hasDunhill && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Dunhill
                                </span>
                            )}
                            {shop.hasHouseCigar && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    House Cigars
                                </span>
                            )}
                            {shop.hasMontecristo && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Montecristo
                                </span>
                            )}
                            {shop.hasRomeo && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Romeo Y Julietta
                                </span>
                            )}
                            {shop.hasHuppman && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    H. Uppman
                                </span>
                            )} 
                            {shop.hasCAO && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    CAO
                                </span>
                            )}
                            {shop.hasRP && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Rocky Patel
                                </span>
                            )}
                            {shop.hasCohiba && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Cohiba (not cuban)
                                </span>
                            )}
                            {shop.hasPunch && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Punch
                                </span>
                            )}
                            {shop.hasAging && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Aging Room
                                </span>
                            )}
                            {shop.hasMacanudo && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Macanudo
                                </span>
                            )}
                            {shop.hasGurkha && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Gurkha
                                </span>
                            )}
                            {shop.hasMemberLocker && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Member Lockers
                                </span>
                            )}
                            {shop.sellsFood && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Sells Food
                                </span>
                            )}
                            {shop.hasPipeTobacco && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Pipe Tobacco
                                </span>
                            )}
                            {shop.hasMemberAccess && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Member Access 
                                </span>
                            )}
                            {shop.hasEvents && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Has Special Events
                                </span>
                            )}
                            {shop.hasHooka && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Hooka
                                </span>
                            )}
                            {shop.hasLiquorLicense && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Liquor License
                                </span>
                            )}
                            {shop.canBringInLiquor && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Bring Your Own Liquor
                                </span>
                            )}
                            {shop.hasInternetAccess && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Internet Access
                                </span>
                            )}
                            {shop.hasCoffeeMaker && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Coffee Maker
                                </span>
                            )}
                            {shop.hasIceMaker && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Ice Maker
                                </span>
                            )}
                            {shop.hasBigTV && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Big TV(s)
                                </span>
                            )}
                            {shop.sellsAccessory && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Accessories
                                </span>
                            )}
                        </div>
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