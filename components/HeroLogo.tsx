import Image from "next/image";

export default function HeroLogo() {
    return (
        <div className="flex justify-center pt-6 md:pt-10">
            <div className="relative w-full max-w-3xl">
                <div className="absolute inset-0 rounded-full bg-[#b97832]/10 blur-3xl" />
                
                <div className="relative flex justify-center">
                    <Image
                        src="/images/cutlerwater-logo.png"
                        alt="Cutlerwater Cigar Shop Finder"
                        width={900}
                        height={340}
                        priority
                        className="h-auto w-full max-w-[760px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]"
                    />
                </div>
            </div>
        </div>
    );
}