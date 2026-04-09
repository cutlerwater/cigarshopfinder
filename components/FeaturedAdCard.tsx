import Link from "next/link";

type Props = {
  title: string;
  location: string;
  description: string;
  href: string;
  badges?: string[];
  cta?: string;
};

export default function FeaturedAdCard({
  title,
  location,
  description,
  href,
  badges = ["Featured"],
  cta = "Learn more →",
}: Props) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-amber-500/40 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black p-6 transition hover:border-amber-400 hover:shadow-xl"
    >
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-black"
          >
            {badge}
          </span>
        ))}
      </div>

      <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>

      <p className="mt-2 text-neutral-400">{location}</p>

      <p className="mt-4 line-clamp-4 text-sm leading-7 text-neutral-300">
        {description}
      </p>

      <div className="mt-6 text-sm font-semibold text-amber-300">
        {cta}
      </div>
    </Link>
  );
}