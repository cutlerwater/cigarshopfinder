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
            src: "/images/shops/DavidusAnnapolis/loun.mp4",
            poster: "/images/shops/davidus-annapolis/lounge.jpg",
        },
        {
            type: "image",
            src: "/images/shops/davidus-annapolis/JohnS.jpg",
            alt: "John",
        },
        {
            type: "image",
            src: "/images/shops/davidus-annapolis/front.jpg",
            alt: "Front of the store",
        },
        {
            type: "image",
            src: "/images/shops/davidus-annapolis/cl-annapolis-3.jpg",
            alt: "Lounge",
        },
        {
            type: "image",
            src: "/images/shops/davidus-annapolis/cl-annapolis-11.jpg",
            alt: "Lounge",
        },
        {
            type: "image",
            src: "/images/shops/davidus-annapolis/Davidus_Logo.png",
            alt: "Logo",
        },
        
        
],

    "davidus-cigars-baltimore-federal-hill": [
        {
            type: "image",
            src: "/images/shops/fedhill/baltimore_light_st._6.jpg",
            alt: "Federal Hill Cigars interior",
        },
        {
            type: "image",
            src: "/images/shops/fedhill/wedsite-managerBAL-LS.jpeg",
            alt: "Federal Hill Cigars humidor",
        },
        {
            type: "image",
            src: "/images/shops/fedhill/baltimore_light_st._7.jpg",
            alt: "Federal Hill Cigars interior",
        },
        {
            type: "image",
            src: "/images/shops/fedhill/baltimore_light_st._8.jpg",
            alt: "Federal Hill Cigars interior",
        },
    ],
    "easton-cigar-and-smoke-shop": [
        {
            type: "image",
            src: "/images/shops/eastonMD/1.jpg",
            alt: "Easton outside",
        },
        {
            type: "image",
            src: "/images/shops/eastonMD/2.jpg",
            alt: "Easton inside",
        },
        {
            type: "image",
            src: "/images/shops/eastonMD/3.jpg",
            alt: "Easton inside",
        },
        
    ],
    "the-world-famous-cigar-bar-fort-myers": [
        {
            type: "image",
            src: "/images/shops/worldFL/1.jpg",
            alt: "Bar",
        },
        {
            type: "image",
            src: "/images/shops/worldFL/2.jpg",
            alt: "2nd image",
        },
        {
            type: "image",
            src: "/images/shops/worldFL/3.jpg",
            alt: "3rd",
        },
    ],
    "burn-by-rocky-patel-naples": [
        {
            type: "image",
            src: "/images/shops/burnNaples/1.jpg",
            alt: "Front of lounge",
        },
        {
            type: "image",
            src: "/images/shops/burnNaples/3.jpg",
            alt: "2nd image",
        },
        {
            type: "image",
            src: "/images/shops/burnNaples/2.jpg",
            alt: "3rd image",
        },

    ],
    "corona-cigar-company-and-diamond-crown-lounge": [
        {
            type: "image",
            src: "/images/shops/coronaFL/1.jpg",
            alt: "1st image",
        },
        {
            type: "image",
            src: "/images/shops/coronaFL/2.jpg",
            alt: "2nd image",
        },
        {
            type: "image",
            src: "/images/shops/coronaFL/3.jpg",
            alt: "3rd image",
        },
    ],
    "cigars-cigars-sarasota-florida": [
        {
            type: "image",
            src: "/images/shops/cigarcigarFL/1.jpg",
            alt: "1st image",
        },
        {
            type: "image",
            src: "/images/shops/cigarcigarFL/2.jpg",
            alt: "2nd image",
        },
        {
            type: "image",
            src: "/images/shops/cigarcigarFL/3.jpg",
            alt: "3rd image",
        },
    ],
    "cigars-cigars-sarasota-clark": [
        {
            type: "image",
            src: "/images/shops/cigarcigarFL/ClarkRd.jpg",
            alt: "1st image",
        },
        {
            type: "image",
            src: "/images/shops/cigarcigarFL/ClarkRd2.jpg",
            alt: "2nd image",
        },
    ],
    "corona-cigar-company-sarasota": [
        {
            type: "image",
            src: "/images/shops/coronaSarasota/1.jpg",
            alt: "1st image",
        },
        {
            type: "image",
            src: "/images/shops/coronaSarasota/2.jpg",
            alt: "2nd image",
        },
        {
            type: "image",
            src: "/images/shops/coronaSarasota/3.jpg",
            alt: "3rd image",
        },
    ],
    "cigars-international-superstore-hamburg": [
        {
            type: "image",
            src: "/images/shops/CIPA/1.jpg",
            alt: "1st image",
        },
        {
            type: "image",
            src: "/images/shops/CIPA/2.jpg",
            alt: "2nd image",
        },
        {
            type: "image",
            src: "/images/shops/CIPA/3.jpg",
            alt: "3rd image",
        },
        {
            type: "image",
            src: "/images/shops/CIPA/logo.Png",
            alt: "4th image",
        },
    ],
};