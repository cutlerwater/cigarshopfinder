"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AccountPage() {
    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    if (!session) return <div className="text-white">Loading...</div>;
    if (!session.user) return null;

    return (
        <div>
            <h1>My Account</h1>

            <div className="space-y-4">
                <div>
                    <p className="text-sm text-neutral-400">Email</p>
                    <p className="text-white">{session.user.email}</p>
                </div>

                <div>
                    <p className="text-sm text-neutral-400">Name</p>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="mt-1 w-full rounded-xl border border-white/20 bg-black/30 px-4 py-2 text-white"
                    />
                </div>

                <button
                    onClick={async () => {
                        setSaving(true);
                        await fetch("/api/user/update", {
                            method: "PATCH",
                            body: JSON.stringify({ name }),
                        });
                        setSaving(false);
                    }}
                    className="rounded-xl bg-amber-400 px-4 py-2 font-semibold text-black"
                >
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}