"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    review: {
        id: string;
        title: string | null;
        body: string | null;
        rating: number;
    };
};

export default function ReviewActions({ review }: Props) {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(review.title ?? "");
    const [body, setBody] = useState(review.body ?? "");
    const [rating, setRating] = useState(review.rating);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        const confirmed = window.confirm("Delete this review?");
        if (!confirmed) return;

        setSubmitting(true);
        setError("");

        try {
            const res = await fetch(`/api/reviews/${review.id}`, {
                method: "DELETE",
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(data?.error || "Failed to delete review");
            }

            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const res = await fetch(`/api/reviews/${review.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    body,
                    rating,
                }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(data?.error || "Failed to update review");
            }

            setIsEditing(false);
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    if (isEditing) {
        return (
            <form onSubmit={handleSave} className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div>
                    <label className="mb-2 block text-sm text-neutral-300">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
                    >
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={3}>3 - Good</option>
                        <option value={2}>2 - Fair</option>
                        <option value={1}>1 - Poor</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-neutral-300">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-neutral-300">Review</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
                    />
                </div>

                {error ? <p className="text-sm text-red-400">{error}</p> : null}

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-2xl bg-amber-400 px-4 py-2 font-semibold text-black disabled:opacity-60"
                    >
                        {submitting ? "Saving..." : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-2xl border border-white/10 px-4 py-2 text-white"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className="mt-4">
            {error ? <p className="mb-2 text-sm text-red-400">{error}</p> : null}

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
                >
                    Edit
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={submitting}
                    className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300 transition hover:bg-red-400/20 disabled:opacity-60"
                >
                    {submitting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}