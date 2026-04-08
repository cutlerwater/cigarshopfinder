export default function SearchBar() {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row">
            <input
                type="text"
                placeholder="Enter ZIP code, city, or state"
                className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-neutral-500"
            />
            <button className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400">
                Search
            </button>
        </div>
    );
}