// app/account/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <main className="mx-auto max-w-3xl px-6 py-12 text-white">
            <h1 className="text-3xl font-bold">My Account</h1>
            <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <p><strong>Name:</strong> {session.user.name ?? "—"}</p>
                <p><strong>Email:</strong> {session.user.email ?? "—"}</p>
            </div>
        </main>
    );
}