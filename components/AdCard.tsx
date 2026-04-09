import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
  label?: string;
};

export default function AdCard({
  title,
  description,
  href,
  label = "Featured",
}: Props) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-neutral-900 to-black p-5 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
        {label}
      </p>

      <h3 className="mt-3 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-neutral-300">
        {description}
      </p>

      <Link
        href={href}
        className="mt-5 inline-flex items-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-300"
      >
        Learn More
      </Link>
    </div>
  );
}