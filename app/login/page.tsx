// app/login/page.tsx
import { signIn } from "@/auth";

export default function LoginPage() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/account" });
            }}
            className="mx-auto max-w-md p-8"
        >
            <button
                type="submit"
                className="rounded-xl bg-amber-500 px-4 py-2 font-medium text-black"
            >
                Sign in with Google
            </button>
        </form>
    );
}