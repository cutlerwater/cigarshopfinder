export type CigarPairings = {
    bourbon?: string;
    whiskey?: string;
    rum?: string;
    coffee?: string;
    beer?: string;
    dessert?: string;
};

export type CigarDetails = {
    id: string;
    slug: string;
    name: string;
    brand: string;

    image: string;
    gallery?: string[];

    description: string;
    strength?: "Mild" | "Medium" | "Medium-Full" | "Full";

    wrapper: string;
    binder: string;
    filler: string;

    size: string;
    gauge: string;
    shape: string;
    country: string;

    price?: string;
    availability?: string;

    highlights?: string[];
    pairings?: CigarPairings;

    rating?: number;
    isFeaturedToday?: boolean;
};

export const cigars: CigarDetails[] = [
    {
        id: "padron-1964-anniversary-toro-natural",
        slug: "padron-1964-anniversary-toro-natural",
        name: "1964 Anniversary Series Toro Natural",
        brand: "Padrón",
        image: "/cigars/1964ToroNat.jpg",
        gallery: [
            "/cigars/1964ToroNat.jpg",
        ],
        description:
            "A rich, box-pressed Nicaraguan cigar with excellent construction, dense smoke output, and a refined profile of cocoa, cedar, earth, and roasted coffee. Smooth enough for a special occasion, but flavorful enough to remember.",
        strength: "Medium-Full",
        wrapper: "Nicaraguan",
        binder: "Nicaraguan",
        filler: "Nicaraguan",
        size: "6 x 52",
        gauge: "52",
        shape: "Toro",
        country: "Nicaragua",
        price: "$18–$22",
        availability: "Limited to select premium cigar shops",
        highlights: [
            "Box-pressed",
            "Anniversary line",
            "Known for rich cocoa and espresso notes",
            "Premium Nicaraguan puro",
        ],
        pairings: {
            bourbon: "Elijah Craig Small Batch",
            coffee: "Dark roast espresso",
            beer: "Imperial stout",
            dessert: "Dark chocolate",
        },
        rating: 94,
        isFeaturedToday: true,
    },
];

export function getFeaturedCigar() {
    return cigars.find((cigar) => cigar.isFeaturedToday) ?? cigars[0];
}

export function getCigarBySlug(slug: string) {
    return cigars.find((cigar) => cigar.slug === slug);
}