"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

type Props = {
    shopId: string;
};

export default function ReviewForm({ shopId }: Props) {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!session?.user) {
            setError("Please sign in to leave a review.");
            return;
        }

        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    shopId,
                    title,
                    body,
                    rating,
                }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(data?.error || "Failed to submit review");
            }

            setTitle("");
            setBody("");
            setRating(5);
            setSuccess("Review submitted.");

            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Leave a Review
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
                Share your experience
            </h2>

            {status === "loading" ? (
                <div className="mt-6">
                    <p className="text-sm text-neutral-400">Loading...</p>
                </div>
            ) : !session?.user ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm text-neutral-300">
                        Sign in with Google to leave a review for this shop.
                    </p>
                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: window.location.href })}
                        className="mt-4 rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-black transition hover:opacity-90"
                    >
                        Sign in to leave a review
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-neutral-300">
                            Rating
                        </label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-400/70 focus:bg-black/40"
                        >
                            <option value={5}>5 - Excellent</option>
                            <option value={4}>4 - Very Good</option>
                            <option value={3}>3 - Good</option>
                            <option value={2}>2 - Fair</option>
                            <option value={1}>1 - Poor</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-neutral-300">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Optional review title"
                            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-amber-400/70 focus:bg-black/40"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-neutral-300">
                            Review
                        </label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={5}
                            placeholder="Tell others what the lounge, humidor, service, and atmosphere were like..."
                            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-amber-400/70 focus:bg-black/40"
                        />
                    </div>

                    {error ? <p className="text-sm text-red-400">{error}</p> : null}
                    {success ? <p className="text-sm text-emerald-400">{success}</p> : null}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            )}
        </section>
    );
}