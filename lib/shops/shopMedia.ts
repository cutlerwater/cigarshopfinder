export type ShopMediaItem =
    | {
        type: "image";
        src: string;
        alt?: string;
    }
    | {
        type: "video";
        src: string;
        poster?: string;
    };

export const shopMedia: Record<string, ShopMediaItem[]> = {
    "davidus-cigars-annapolis": [
        {

            type: "image",
            src: "/images/DavidusAnnapolis/JohnS.jpg",
            alt: "Davidus Cigars storefront",
        },
        
       
    ],

    "federal-hill-cigars": [
        {
            type: "image",
            src: "/images/fedhill/baltimore_light_st._6.jpg",
            alt: "Federal Hill Cigars interior",
        },
        {
            type: "image",
            src: "/images/fedhill/wedsite-managerBAL-LS.jpeg",
            alt: "Federal Hill Cigars humidor",
        },
        {
            type: "image",
            src: "/images/fedhill/baltimore_light_st._7.jpg",
            alt: "Federal Hill Cigars interior",
        },
        {
            type: "image",
            src: "/images/fedhill/baltimore_light_st._8.jpg",
            alt: "Federal Hill Cigars interior",
        },
    ],
};