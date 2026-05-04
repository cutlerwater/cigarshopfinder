import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-neutral-800 bg-neutral-950">
            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Top Section */}
                <div className="grid gap-8 md:grid-cols-3">

                    {/* Brand */}
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            <span className="text-amber-400"> Cutlerwater Cigar Shop </span>Finder
                        </h2>
                        <p className="mt-3 text-sm text-neutral-400">
                            Discover premium cigar lounges, humidors, and shops near you.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="text-sm font-semibold text-white">Explore</p>
                        <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-400">
                            <Link href="/" className="hover:text-white">
                                Home
                            </Link>
                            <Link href="/shops" className="hover:text-white">
                                Shops
                            </Link>
                        </div>
                    </div>

                    {/* External / Branding */}
                    <div>
                        <p className="text-sm font-semibold text-white">Projects</p>
                        <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-400">
                            <a
                                href="https://www.cigarshopfinder.live/admin/shops"
                                target="_blank"
                                className="hover:text-white"
                            >
                                Admin Shops
                            </a>
                            <a
                                href="https://www.cigarshopfinder.live/add-your-shop"
                                target="_blank"
                                className="hover:text-white"
                            >
                                Add shops
                            </a>
                            <a
                                href="https://www.cigarshopfinder.live/admin/submissions"
                                target="_blank"
                                className="hover:text-white"
                            >
                                Approve or reject shops
                            </a>
                            <a
                                href="https://albums-catalog.vercel.app/"
                                target="_blank"
                                className="hover:text-white"
                            >
                                Albums Catalog
                            </a>
                            <a
                                href="https://civicsmap.com/"
                                target="_blank"
                                className="hover:text-white"
                            >Civics Map- Find your Congressional representation and much more</a>
                            <a
                                href="https://cutlerwater-profile.netlify.app/"
                                target="_blank"
                                className="hover:text-white"
                            >
                                Profile Site
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
                    © {new Date().getFullYear()}  Cutlerwater Cigar Shop Finder. All rights reserved.
                </div>
            </div>
        </footer>
    );
}