
import Image from "next/image";
import GalleryLightbox from "@/components/GalleryLightBox";
import Link from "next/link";
import ShopMapPanel from "@/components/ShopMapPanel";
import { prisma } from "@/lib/prisma";
import ReviewForm from "@/components/ReviewForm";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import ReviewActions from "@/components/ReviewActions";

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
    const galleryImages = [
        shop.image,
        "/images/DavidusAnnapolis/cl-annapolis-3.jpg",
        "/images/DavidusAnnapolis/cl-annapolis-11.jpg",
        "/images/DavidusAnnapolis/JohnS.jpg",
    ].filter((img): img is string => Boolean(img));

    return (
        <main className="min-h-screen text-white">
            {/* hero */}
            <section className="relative overflow-hidden border-b border-white/10">
                <div className="relative h-[420px] w-full md:h-[520px]">
                    <Image
                        src={shop.image || "/images/DavidusAnnapolis/front.jpg"}
                        alt={shop.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/60 to-black/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_28%)]" />
                </div>

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
                            {shop.hasDavidoffs && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Davidoffs
                                </span>
                            )}
                            {shop.hasPadrons && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Padrons
                                </span>
                            )}
                            {shop.hasFuentes && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Fuentes
                                </span>
                            )}
                            {shop.hasOpusX && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    OpusX
                                </span>
                            )}
                            {shop.hasAcid && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Acid cigars
                                </span>
                            )}
                            {shop.hasPerdomos && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Perdomos
                                </span>
                            )}
                            {shop.hasLFDs && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    LFDs
                                </span>
                            )}
                            {shop.hasOlivas && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Olivas
                                </span>
                            )}
                            {shop.hasAtabeys && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Atabeys
                                </span>
                            )}
                            {shop.hasHouseCigars && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    House Cigars
                                </span>
                            )}
                            {shop.hasAltadis && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Altadis
                                </span>
                            )}
                            {shop.hasGeneralCigar && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    General Cigars
                                </span>
                            )}
                            {shop.hasRareOpusX && (
                                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                                    Rare Opus X
                                </span>
                            )}
                            {shop.hasMemberLockers && (
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
                            {shop.sellsAccessories && (
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