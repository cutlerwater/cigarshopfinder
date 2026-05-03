"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddYourShopPage() {
    const { data: session } = useSession();

    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        stateabb: "",
        zip: "",
        phone: "",
        website: "",
        description: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    if (!session?.user) {
        return (
            <div className="p-6 text-white">
                You must be signed in to submit a shop.
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-3xl px-6 py-12 text-white">
            <h1 className="text-2xl font-bold mb-6">Add Your Shop</h1>

            <div className="space-y-4">
                <input name="name" placeholder="Shop Name" onChange={handleChange} className="w-full rounded-xl p-3 bg-black/30 border border-white/20" />
                <input name="address" placeholder="Address" onChange={handleChange} className="w-full rounded-xl p-3 bg-black/30 border border-white/20" />
                <input name="city" placeholder="City" onChange={handleChange} className="w-full rounded-xl p-3 bg-black/30 border border-white/20" />
                <input name="state" placeholder="State" onChange={handleChange} className="w-full rounded-xl p-3 bg-black/30 border border-white/20" />
                <input name="stateabb" placeholder="State Abbreviation (e.g. MD)" onChange={handleChange} className="w-full rounded-xl p-3 bg-black/30 border border-white/20" />
                <input name="zip" placeholder="ZIP" onChange={handleChange} className="w-full rounded-xl p-3 bg-black/30 border border-white/20" />
                <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full rounded-xl p-3 bg-black/30 border border-white/20" />
                <input name="website" placeholder="Website" onChange={handleChange} className="w-full rounded-xl p-3 bg-black/30 border border-white/20" />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="w-full rounded-xl p-3 bg-black/30 border border-white/20"
                />
                {submitted && (
                    <div className="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-200">
                        Thanks — your shop submission was received and is pending review.
                    </div>
                )}
                <button
                    disabled={submitting}
                    onClick={async () => {
                        setSubmitting(true);

                        const res = await fetch("/api/shops/submit", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(form),
                        });

                        setSubmitting(false);

                        if (res.ok) {
                            setSubmitted(true);

                            setForm({
                                name: "",
                                address: "",
                                city: "",
                                state: "",
                                stateabb: "",
                                zip: "",
                                phone: "",
                                website: "",
                                description: "",
                            });
                        } else {
                            const errorText = await res.text();
                            alert(`Something went wrong: ${errorText}`);
                        }
                    }}
                    className="rounded-xl bg-amber-400 px-4 py-2 font-semibold text-black disabled:opacity-60"
                >
                    {submitting ? "Submitting..." : "Submit Shop"}
                </button>
            </div>
        </main>
    );
}