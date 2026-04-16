export default function ContactPage() {
    return (
        <main className="min-h-screen text-white">
            {/* HERO */}
            <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_30%)]">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                        Contact
                    </p>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                        Get in Touch
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-neutral-300">
                        Have a question, suggestion, or want to feature your shop? We’d love to hear from you.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid gap-8 lg:grid-cols-2">

                    {/* CONTACT FORM */}
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
                        <h2 className="text-2xl font-semibold">Send a Message</h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Form submission coming soon 🚀");
                            }}
                            className="mt-6 space-y-4"
                        >
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-amber-400"
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                required
                                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-amber-400"
                            />

                            <textarea
                                placeholder="Your Message"
                                rows={5}
                                required
                                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-amber-400"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-black transition hover:opacity-90"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* INFO PANEL */}
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
                        <h2 className="text-2xl font-semibold">Contact Information</h2>

                        <p className="mt-4 text-neutral-300">
                            This project is actively growing. Whether you’re a cigar shop owner, enthusiast,
                            or just have feedback — your input helps improve the experience.
                        </p>

                        <div className="mt-6 space-y-3 text-sm text-neutral-300">
                            <p>
                                <strong>Email:</strong> cutlerwater2@live.com
                            </p>
                            <p>
                                <strong>Location:</strong> United States
                            </p>
                        </div>

                        <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
                            Interested in featuring your shop or advertising? Reach out and we’ll get you set up.
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}