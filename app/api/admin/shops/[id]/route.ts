import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    if (!session?.user?.email || session.user.email !== "cutlerwater2@live.com") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const shop = await prisma.shop.findUnique({
        where: { id },
    });

    if (!shop) {
        return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    return NextResponse.json(shop);
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    if (!session?.user?.email || session.user.email !== "cutlerwater2@live.com") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const updatedShop = await prisma.shop.update({
        where: { id },
        data: {
            name: body.name,
            description: body.description,
            phone: body.phone,
            website: body.website || null,
            address: body.address,
            city: body.city,
            state: body.state,
            stateabb: body.stateabb,
            zip: body.zip,
            image: body.image || null,
            heroVideo: body.heroVideo || null,
            heroPoster: body.heroPoster || null,

            isFeatured: body.isFeatured,
            isSponsored: body.isSponsored,

            hasLounge: body.hasLounge,
            hasHumidor: body.hasHumidor,
            sellsAccessory: body.sellsAccessory,
            hasLiquorLicense: body.hasLiquorLicense,
            canBringInLiquor: body.canBringInLiquor,
            hasEvents: body.hasEvents,
            sellsFood: body.sellsFood,
            sellsDrink: body.sellsDrink,
            hasMemberAccess: body.hasMemberAccess,
            hasMemberLocker: body.hasMemberLocker,
            hasPadron: body.hasPadron,
            hasFuente: body.hasFuente,
            hasOpusX: body.hasOpusX,
            hasRareOpusX: body.hasRareOpusX,
            hasAshton: body.hasAshton,
            hasDiamond: body.hasDiamond,
            hasAroma: body.hasAroma,
            hasDavidoff: body.hasDavidoff,
            hasAvo: body.hasAvo,
            hasAlec: body.hasAlec,
            hasOliva: body.hasOliva,
            hasAcid: body.hasAcid,
            hasAJ: body.hasAJ,
            hasCain: body.hasCain,
            hasAganorsa: body.hasAganorsa,
            hasGurkha: body.hasGurkha,
            hasCohiba: body.hasCohiba,
            hasCAO: body.hasCAO,
            hasCamacho: body.hasCamacho,
            hasLFD: body.hasLFD,
            hasMontecristo: body.hasMontecristo,
            hasRomeo: body.hasRomeo,
            hasHoya: body.hasHoya,
            hasAtabey: body.hasAtabey,
            hasLordByron: body.hasLordByron,
            hasGreyCliff: body.hasGreyCliff,
            hasLaAurora: body.hasLaAurora,
            hasPartagas: body.hasPartagas,
            hasPerdomo: body.hasPerdomo,
            hasDunhill: body.hasDunhill,
            hasMyFather: body.hasMyFather,
            hasMacanudo: body.hasMacanudo,
            hasHuppman: body.hasHuppman,
            hasPlasencia: body.hasPlasencia,
            hasNub: body.hasNub,
            hasPunch: body.hasPunch,
            hasHouseCigar: body.hasHouseCigar,
            hasTatuaje: body.hasTatuaje,
            hasRP: body.hasRP,
            hasLiga: body.hasLiga,
            hasSanCristobal: body.hasSanCristobal,
            hasCoffeeMaker: body.hasCoffeeMaker,
            hasIceMaker: body.hasIceMaker,
            hasBigTV: body.hasBigTV,
            hasLiveMusic: body.hasLiveMusic,
            hasHooka: body.hasHooka,
            hasPipeTobacco: body.hasPipeTobacco,
            hasAging: body.hasAging,
            hasInternetAccess: body.hasInternetAccess,

        },
    });

    return NextResponse.json(updatedShop);
}