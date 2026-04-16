import Link from "next/link";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Contact | Cutlerwater Cigar Finder",
    description: "Get in touch with Cutlerwater about listings, sponsorships, corrections, and partnerships.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-transparent text-white">
            <section className="border-b border-white/10 bg-neutral-950/70">
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                            Contact
                        </p>

                        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                            Get in touch
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300 md:text-lg">
                            Have a cigar lounge to add, business details to update, or interest in a
                            featured listing? Reach out and we’ll get back to you.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-8 shadow-2xl backdrop-blur">
                        <h2 className="text-2xl font-semibold text-white">Send a message</h2>
                        <p className="mt-3 text-sm leading-6 text-neutral-400">
                            This starter form is presentational for now. Once you’re ready, we can wire
                            it to Resend, Formspree, EmailJS, or a Next.js route handler.
                        </p>

                        <form className="mt-8 grid gap-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-neutral-200"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Garrett Cutler"
                                        className="w-full rounded-2xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-amber-400"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-neutral-200"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="cutlerwater2@live.com"
                                        className="w-full rounded-2xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-amber-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium text-neutral-200"
                                >
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    placeholder="What can we help with?"
                                    className="w-full rounded-2xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-amber-400"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium text-neutral-200"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={7}
                                    placeholder="Tell us about your shop, correction, sponsorship interest, or question..."
                                    className="w-full rounded-2xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-amber-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-400 to-amber-300 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:scale-[1.01]"
                            >
                                Send message
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-8 backdrop-blur">
                            <h2 className="text-xl font-semibold text-white">Contact details</h2>

                            <div className="mt-6 space-y-5 text-sm text-neutral-300">
                                <div className="flex items-start gap-3">
                                    <Mail className="mt-0.5 h-5 w-5 text-amber-300" />
                                    <div>
                                        <p className="font-medium text-white">Email</p>
                                        <a
                                            href="mailto:cutlerwater2@live.com"
                                            className="text-neutral-300 transition hover:text-amber-300"
                                        >
                                            cutlerwater2@live.com
                                        </a>
                                    </div>
                                </div>

                                

                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 text-amber-300" />
                                    <div>
                                        <p className="font-medium text-white">Region</p>
                                        <p className="text-neutral-300">DMV and beyond</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="mt-0.5 h-5 w-5 text-amber-300" />
                                    <div>
                                        <p className="font-medium text-white">Response time</p>
                                        <p className="text-neutral-300">Usually within 1–2 business days</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-neutral-900 p-8">
                            <h3 className="text-lg font-semibold text-white">Need a shop listing update?</h3>
                            <p className="mt-3 text-sm leading-6 text-neutral-300">
                                Send the shop name, city, state, and the details that need to be corrected or
                                added.
                            </p>

                            <div className="mt-5">
                                <Link
                                    href="/shops"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-amber-300 transition hover:text-amber-200"
                                >
                                    Browse shops
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}