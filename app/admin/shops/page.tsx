import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminShopsPage() {
    const session = await auth();

    if (!session?.user?.email || session.user.email !== "cutlerwater2@live.com") {
        redirect("/");
    }

    const shops = await prisma.shop.findMany({
        orderBy: [
            { isSponsored: "desc" },
            { isFeatured: "desc" },
            { name: "asc" },
        ],
    });

    return (
        <main className="mx-auto max-w-6xl px-6 py-12 text-white">
            <h1 className="mb-8 text-3xl font-bold">Manage Shops</h1>

            <div className="space-y-4">
                {shops.map((shop) => (
                    <div
                        key={shop.id}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-5"
                    >
                        <div>
                            <p className="text-lg font-bold">{shop.name}</p>
                            <p className="text-sm text-neutral-400">
                                {shop.city}, {shop.stateabb}
                            </p>

                            <div className="mt-2 flex gap-2">
                                {shop.isSponsored && (
                                    <span className="rounded-full bg-amber-400 px-2 py-1 text-xs font-bold text-black">
                                        Sponsored
                                    </span>
                                )}
                                {shop.isFeatured && (
                                    <span className="rounded-full border border-amber-300/40 px-2 py-1 text-xs font-bold text-amber-200">
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>

                        <Link
                            href={`/admin/shops/${shop.id}`}
                            className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-black"
                        >
                            Edit
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}