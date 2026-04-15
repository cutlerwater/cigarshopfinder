"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();

    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            const tag = (e.target as HTMLElement).tagName;

            if (tag === "INPUT" || tag === "TEXTAREA") return;

            if (e.key === "/") {
                e.preventDefault();
                setMenuOpen(true);
                inputRef.current?.focus();
                inputRef.current?.select();
            }

            if (e.key === "Escape") {
                setQuery("");
                setMenuOpen(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const nav = [
        { name: "Home", href: "/" },
        { name: "Shops", href: "/shops" },
    ];

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        if (!query.trim()) return;

        router.push(`/shops?q=${encodeURIComponent(query.trim())}`);
        setMenuOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 border-b border-amber-500/10 bg-black/60 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

            <div className="mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6">
                <div className="flex shrink-0 items-center"></div>

                <div className="ml-4 h-10 w-px bg-white/10" />

                <div className="ml-6 flex flex-1 items-center gap-4">
                    <Link href="/" className="flex items-center">
                        <div className="relative h-22 w-[300px] md:w-[300px]">
                            <Image
                                src="/images/cutlerwater-logo.png"
                                alt="Cutlerwater Cigar Shop Finder"
                                fill
                                sizes="180px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="hidden 2xl:block">
                            <p className="text-xs uppercase tracking-[0.28em] text-amber-300/80">
                                Premium Directory
                            </p>
                            <p className="text-sm text-neutral-400">
                                Lounges and premium cigar destinations
                            </p>
                        </div>

                        <nav className="hidden items-center gap-4 lg:flex">
                            {nav.map((item) => {
                                const active = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`text-sm font-semibold tracking-wide ${active
                                                ? "text-amber-300"
                                                : "text-neutral-400 hover:text-white"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        
                    </div>

                    <div className="ml-6 flex items-center gap-3">
                        {/* AUTH */}
                        {status === "loading" ? null : session?.user ? (
                            <>
                                <Link
                                    href="/account"
                                    className="text-sm font-semibold text-neutral-300 hover:text-white whitespace-nowrap"
                                >
                                    Account
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="text-sm font-semibold text-amber-300 hover:text-white whitespace-nowrap"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => signIn("google", { callbackUrl: "/account" })}
                                className="rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 px-4 py-2 text-sm font-semibold text-black whitespace-nowrap"
                            >
                                Sign in
                            </button>
                        )}

                        {/* SEARCH */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden flex-1 max-w-md items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:flex"
                        >
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search shops, cities, states, ZIP..."
                                className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-b from-amber-400 to-amber-500 px-4 py-3 text-sm font-semibold text-black"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="ml-4 inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200 transition hover:bg-white/10 md:hidden"
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="border-t border-white/10 bg-neutral-950/95 md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
                        <nav className="flex flex-col gap-3">
                            {nav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`text-sm ${pathname === item.href
                                            ? "text-amber-300"
                                            : "text-neutral-300 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex flex-col gap-3">
                            {status === "loading" ? null : session?.user ? (
                                <>
                                    <Link
                                        href="/account"
                                        onClick={() => setMenuOpen(false)}
                                        className="text-sm font-semibold text-neutral-300 hover:text-white"
                                    >
                                        Account
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            signOut({ callbackUrl: "/" });
                                        }}
                                        className="text-left text-sm font-semibold text-amber-300 hover:text-white"
                                    >
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        signIn("google", { callbackUrl: "/account" });
                                    }}
                                    className="rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 px-4 py-3 text-sm font-semibold text-black"
                                >
                                    Sign in
                                </button>
                            )}
                        </div>

                        <form
                            onSubmit={handleSearch}
                            className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5"
                        >
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search shops, cities, states..."
                                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-b from-amber-400 to-amber-500 px-4 text-sm font-semibold text-black"
                            >
                                Go
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}