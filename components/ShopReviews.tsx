"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Review = {
    id: string;
    shopId: string;
    name: string;
    rating: number;
    title?: string | null;
    comment: string;
    visitDate?: string | null;
    createdAt: string;
};

type Props = {
    shopId: string;
    shopName: string;
};

function renderStars(rating: number) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export default function ShopReviews({ shopId, shopName }: Props) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        rating: 5,
        title: "",
        comment: "",
        visitDate: "",
    });

    async function fetchReviews() {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`/api/reviews?shopId=${shopId}`, {
                cache: "no-store",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to load reviews");
            }

            setReviews(data.reviews ?? []);
            setAverageRating(data.averageRating ?? 0);
            setReviewCount(data.reviewCount ?? 0);
        } catch (err) {
            console.error(err);
            setError("Could not load reviews.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [shopId]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            setSubmitting(true);
            setError("");

            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    shopId,
                    name: form.name,
                    rating: Number(form.rating),
                    title: form.title,
                    comment: form.comment,
                    visitDate: form.visitDate || null,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to submit review");
            }

            setForm({
                name: "",
                rating: 5,
                title: "",
                comment: "",
                visitDate: "",
            });

            await fetchReviews();
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error ? err.message : "Could not submit review."
            );
        } finally {
            setSubmitting(false);
        }
    }

    const roundedAverage = useMemo(() => {
        return averageRating ? averageRating.toFixed(1) : "0.0";
    }, [averageRating]);

    return (
        <section className="mt-12 space-y-8">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/70 p-6 shadow-2xl">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
                            Reviews
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">
                            What people are saying about {shopName}
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-4 text-white">
                        <div className="text-3xl font-bold">{roundedAverage}</div>
                        <div className="text-amber-400">
                            {renderStars(Math.round(averageRating || 0))}
                        </div>
                        <div className="text-sm text-neutral-400">
                            {reviewCount} review{reviewCount === 1 ? "" : "s"}
                        </div>
                    </div>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-neutral-800 bg-neutral-950/70 p-6 shadow-2xl"
            >
                <h3 className="text-xl font-semibold text-white">Leave a review</h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
                        required
                    />

                    <select
                        value={form.rating}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, rating: Number(e.target.value) }))
                        }
                        className="rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
                    >
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Very good</option>
                        <option value={3}>3 - Good</option>
                        <option value={2}>2 - Fair</option>
                        <option value={1}>1 - Poor</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Review title (optional)"
                        value={form.title}
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                        className="rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none md:col-span-2"
                    />

                    <input
                        type="date"
                        value={form.visitDate}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, visitDate: e.target.value }))
                        }
                        className="rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none md:col-span-2"
                    />

                    <textarea
                        placeholder="Write your review..."
                        value={form.comment}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, comment: e.target.value }))
                        }
                        rows={5}
                        className="rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none md:col-span-2"
                        required
                    />
                </div>

                {error ? (
                    <p className="mt-4 text-sm text-red-400">{error}</p>
                ) : null}

                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-neutral-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Submitting..." : "Submit review"}
                </button>
            </form>

            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/70 p-6 shadow-2xl">
                <h3 className="text-xl font-semibold text-white">Recent reviews</h3>

                {loading ? (
                    <p className="mt-4 text-neutral-400">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className="mt-4 text-neutral-400">
                        No reviews yet. Be the first to review this shop.
                    </p>
                ) : (
                    <div className="mt-6 space-y-4">
                        {reviews.map((review) => (
                            <article
                                key={review.id}
                                className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5"
                            >
                                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <div className="text-lg font-semibold text-white">
                                            {review.title || "Customer review"}
                                        </div>
                                        <div className="text-sm text-neutral-400">
                                            by {review.name}
                                        </div>
                                    </div>

                                    <div className="text-amber-400">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>

                                <p className="mt-4 whitespace-pre-line text-neutral-200">
                                    {review.comment}
                                </p>

                                <div className="mt-4 text-xs text-neutral-500">
                                    Posted {new Date(review.createdAt).toLocaleDateString()}
                                    {review.visitDate
                                        ? ` • Visit date ${new Date(review.visitDate).toLocaleDateString()}`
                                        : ""}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}