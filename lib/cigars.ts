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
        id: "padron-5000-natural",
        slug: "padron-5000-natural",
        name: "5000 Natural",
        brand: "Padrón",
        image: "/cigars/5000nat.jpg",
        gallery: [
            "/cigars/5000nat.jpg",
            "/cigars/5000nat2.jpg",
        ],
        description:
            "These medium-to full-bodied, long-filler robusto cigars are wrapped in sun-grown habano tobacco that is aged for a minimum of two-and-one-half years. Their exceptional aroma and taste is guaranteed by the traditional Cuban Cigar making process that Padron sets as its standard. Rated 89 by Cigar Aficionado.",
        strength: "Medium-Full",
        wrapper: "Nicaraguan",
        binder: "Nicaraguan",
        filler: "Nicaraguan",
        size: "5.5 x 52",
        gauge: "56",
        shape: "Robusto",
        country: "Nicaragua",
        price: "$11–$13",
        availability: "Somewhat available",
        highlights: [
            "Smooth",
            "Good Flavor",
            "Consistent"
        ],
        pairings: {
            bourbon: "Elijah Craig Small Batch",
            coffee: "Dark roast espresso",
            beer: "Imperial stout",
            dessert: "Dark chocolate",
        },
        rating: 89,
        isFeaturedToday: true,
    },
    {
        id: "padron-5000-maduro",
        slug: "padron-5000-maduro",
        name: "5000 Natural",
        brand: "Padrón",
        image: "/cigars/5000nat.jpg",
        gallery: [
            "/cigars/5000mad.jpg",
            "/cigars/5000mad2.jpg",
        ],
        description:
            "These medium-to full-bodied, long-filler robusto cigars are wrapped in sun-grown habano tobacco that is aged for a minimum of two-and-one-half years. Their exceptional aroma and taste is guaranteed by the traditional Cuban Cigar making process that Padron sets as its standard. Rated 89 by Cigar Aficionado.",
        strength: "Medium-Full",
        wrapper: "Nicaraguan",
        binder: "Nicaraguan Sun Grown" ,
        filler: "Nicaraguan",
        size: "5.5 x 52",
        gauge: "56",
        shape: "Robusto",
        country: "Nicaragua",
        price: "$11–$13",
        availability: "Somewhat available",
        highlights: [
            "Smooth",
            "Good Flavor",
            "Consistent"
        ],
        pairings: {
            bourbon: "Elijah Craig Small Batch",
            coffee: "Dark roast espresso",
            beer: "Imperial stout",
            dessert: "Dark chocolate",
        },
        rating: 89,
        isFeaturedToday: true,
    },
    {
        id: "padron-1964-anniversary-toro-natural",
        slug: "padron-1964-anniversary-toro-natural",
        name: "1964 Anniversary Series Toro Natural",
        brand: "Padrón",
        image: "/cigars/1964_T2.jpg",
        gallery: [
            "/cigars/1964_T2.jpg",
            "/cigars/1964_T3.jpg",
            "/cigars/1964_T4.jpg",
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