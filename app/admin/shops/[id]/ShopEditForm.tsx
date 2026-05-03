"use client";

import { useState } from "react";

export default function ShopEditForm({ shop }: any) {
    const [form, setForm] = useState(shop);
    const [saving, setSaving] = useState(false);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <main className="mx-auto max-w-3xl px-6 py-12 text-white">
            <h1 className="mb-6 text-2xl font-bold">Edit Shop</h1>

            <div className="space-y-4">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/30 p-3"
                />

                <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/30 p-3"
                />

                <input
                    name="stateabb"
                    value={form.stateabb}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/30 p-3"
                />

                <textarea
                    name="description"
                    value={form.description || ""}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/30 p-3"
                />

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={form.isFeatured}
                        onChange={handleChange}
                    />
                    Featured
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isSponsored"
                        checked={form.isSponsored}
                        onChange={handleChange}
                    />
                    Sponsored
                </label>

                <button
                    onClick={async () => {
                        setSaving(true);

                        const res = await fetch("/api/shops/update", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(form),
                        });

                        setSaving(false);

                        if (!res.ok) {
                            const errorText = await res.text();
                            alert(`Save failed: ${errorText}`);
                        } else {
                            alert("Saved!");
                        }
                    }}
                    className="rounded-xl bg-amber-400 px-4 py-2 font-semibold text-black"
                >
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>
        </main>
    );
}