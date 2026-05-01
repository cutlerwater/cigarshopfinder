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
    "easton-cigar-and-smoke-shop": [
        {
            type: "image",
            src: "/images/eastonMD/1.jpg",
            alt: "Easton outside",
        },
        {
            type: "image",
            src: "/images/eastonMD/2.jpg",
            alt: "Easton inside",
        },
        {
            type: "image",
            src: "/images/eastonMD/3.jpg",
            alt: "Easton inside",
        },
        
    ],
    "the-world-famous-cigar-bar-fort-myers": [
        {
            type: "image",
            src: "/images/worldFL/1.jpg",
            alt: "Bar",
        },
        {
            type: "image",
            src: "/images/worldFL/2.jpg",
            alt: "2nd image",
        },
        {
            type: "image",
            src: "/images/worldFL/3.jpg",
            alt: "3rd",
        },
    ],
    "burn-by-rocky-patel-naples": [
        {
            type: "image",
            src: "/images/burnNaples/1.jpg",
            alt: "Front of lounge",
        },
        {
            type: "image",
            src: "/images/burnNaples/3.jpg",
            alt: "2nd image",
        },
        {
            type: "image",
            src: "/images/burnNaples/2.jpg",
            alt: "3rd image",
        },

    ],
    "corona-cigar-company-and-diamond-crown-lounge": [
        {
            type: "image",
            src: "/images/coronaFL/1.jpg",
            alt: "1st image",
        },
        {
            type: "image",
            src: "/images/coronaFL/2.jpg",
            alt: "2nd image",
        },
        {
            type: "image",
            src: "/images/coronaFL/3.jpg",
            alt: "3rd image",
        },

    ],
};