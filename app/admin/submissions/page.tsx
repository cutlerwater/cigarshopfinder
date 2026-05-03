import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminSubmissionsPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/");
    }

    // temporary admin gate — use your own email
    if (session.user.email !== "cutlerwater2@live.com") {
        redirect("/");
    }

    const submissions = await prisma.shopSubmission.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="mx-auto max-w-6xl px-6 py-12 text-white">
            <h1 className="mb-8 text-3xl font-bold">Shop Submissions</h1>

            {submissions.length === 0 ? (
                <p className="text-neutral-400">No submissions yet.</p>
            ) : (
                <div className="space-y-6">
                    {submissions.map((shop) => (
                        <article
                            key={shop.id}
                            className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl"
                        >
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-amber-300">
                                        {shop.name}
                                    </h2>
                                    <p className="text-sm text-neutral-300">
                                        {shop.address}, {shop.city}, {shop.stateabb} {shop.zip}
                                    </p>
                                </div>

                                <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
                                    {shop.status}
                                </span>
                            </div>

                            <div className="grid gap-4 text-sm text-neutral-300 md:grid-cols-2">
                                <p>
                                    <span className="font-semibold text-white">State:</span>{" "}
                                    {shop.state}
                                </p>
                                <p>
                                    <span className="font-semibold text-white">Phone:</span>{" "}
                                    {shop.phone || "—"}
                                </p>
                                <p>
                                    <span className="font-semibold text-white">Website:</span>{" "}
                                    {shop.website ? (
                                        <a
                                            href={shop.website}
                                            target="_blank"
                                            className="text-amber-300 hover:underline"
                                        >
                                            {shop.website}
                                        </a>
                                    ) : (
                                        "—"
                                    )}
                                </p>
                                <p>
                                    <span className="font-semibold text-white">Contact:</span>{" "}
                                    {shop.contactName || "—"} / {shop.contactEmail}
                                </p>
                            </div>

                            {shop.description && (
                                <p className="mt-4 rounded-xl bg-white/5 p-4 text-sm text-neutral-200">
                                    {shop.description}
                                </p>
                            )}
                            <div className="mt-4 flex gap-3">
                                <form action={`/api/shops/approve`} method="POST" className="flex items-center gap-3">
                                    <input type="hidden" name="id" value={shop.id} />

                                    <label className="flex items-center gap-1 text-sm">
                                        <input type="checkbox" name="featured" />
                                        Featured
                                    </label>

                                    <label className="flex items-center gap-1 text-sm">
                                        <input type="checkbox" name="sponsored" />
                                        Sponsored
                                    </label>

                                    <button className="rounded-lg bg-emerald-500 px-4 py-2 text-black font-semibold">
                                        Approve
                                    </button>
                                </form>

                                <form action={`/api/shops/reject`} method="POST">
                                    <input type="hidden" name="id" value={shop.id} />
                                    <button className="rounded-lg bg-red-500 px-4 py-2 text-black font-semibold">
                                        Reject
                                    </button>
                                </form>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}