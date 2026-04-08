type BadgeProps = {
    children: React.ReactNode;
};

export default function Badge({ children }: BadgeProps) {
    return (
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-amber-200">
            {children}
        </span>
    );
}