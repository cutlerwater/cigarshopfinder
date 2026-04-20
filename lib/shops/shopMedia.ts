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
            type: "video",
            src: "/images/DavidusAnnapolis/loun.mp4",
            poster: "/images/DavidusAnnapolis/lounge.jpg",
        },
        {
            type: "image",
            src: "/images/DavidusAnnapolis/JohnS.jpg",
            alt: "John",
        },
        {
            type: "image",
            src: "/images/DavidusAnnapolis/front.jpg",
            alt: "Front of the store",
        },
        {
            type: "image",
            src: "/images/DavidusAnnapolis/cl-annapolis-3.jpg",
            alt: "Lounge",
        },
        {
            type: "image",
            src: "/images/DavidusAnnapolis/cl-annapolis-11.jpg",
            alt: "Lounge",
        },
        {
            type: "image",
            src: "/images/DavidusAnnapolis/Davidus_Logo.png",
            alt: "Logo",
        },
        
        
],

    "davidus-cigars-baltimore-federal-hill": [
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