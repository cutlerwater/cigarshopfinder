"use client";

import { useState } from "react";

export default function ShopEditForm({ shop }: any) {
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: shop.name ?? "",
        description: shop.description ?? "",
        phone: shop.phone ?? "",
        website: shop.website ?? "",
        address: shop.address ?? "",
        city: shop.city ?? "",
        state: shop.state ?? "",
        stateabb: shop.stateabb ?? "",
        zip: shop.zip ?? "",
        image: shop.image ?? "",

        isFeatured: shop.isFeatured ?? false,
        isSponsored: shop.isSponsored ?? false,

        hasLounge: shop.hasLounge ?? false,
        hasHumidor: shop.hasHumidor ?? false,
        sellsAccessory: shop.sellsAccessory ?? false,
        hasLiquorLicense: shop.hasLiquorLicense ?? false,
        canBringInLiquor: shop.canBringInLiquor ?? false,
        hasMemberAccess: shop.hasMemberAccess ?? false,
        hasMemberLocker: shop.hasMemberLocker ?? false,

        hasEvents: shop.hasEvents ?? false,
        hasLiveMusic: shop.hasLiveMusic ?? false,
        sellsFood: shop.sellsFood ?? false,
        sellsDrink: shop.sellsDrink ?? false,
        hasIceMaker: shop.hasIceMaker ?? false,
        hasCoffeeMaker: shop.hasCoffeeMaker ?? false,
        hasBigTV: shop.hasBigTV ?? false,
        hasInternetAccess: shop.hasInternetAccess ?? false,
        hasHooka: shop.hasHooka ?? false,


        hasPadron: shop.hasPadron ?? false,
        hasFuente: shop.hasFuente ?? false,
        hasOpusX: shop.hasOpusX ?? false,
        hasRareOpusX: shop.hasRareOpusX ?? false,
        hasAshton: shop.hasAshton ?? false,
        hasAroma: shop.hasAroma ?? false,
        hasDiamond: shop.hasDiamond ?? false,
        hasDavidoff: shop.hasDavidoff ?? false,
        hasAvo: shop.hasAvo ?? false,
        hasLiga: shop.hasLiga ?? false,
        hasAcid: shop.hasAcid ?? false,
        hasTatuaje: shop.hasTatuaje ?? false,
        hasLFD: shop.hasLFD ?? false,
        hasPerdomo: shop.hasPerdomo ?? false,
        hasOliva: shop.hasOliva ?? false,
        hasRP: shop.hasRP ?? false,
        hasCain: shop.hasCain ?? false,
        hasNub: shop.hasNub ?? false,
        hasAJ: shop.hasAJ ?? false,
        hasAlec: shop.hasAlec ?? false,
        hasMyFather: shop.hasMyFather ?? false,
        hasCamacho: shop.hasCamacho ?? false,
        hasCAO: shop.hasCAO ?? false,
        hasAtabey: shop.hasAtabey ?? false,
        hasLordByron: shop.hasLordByron ?? false,
        hasMontecristo: shop.hasMontecristo ?? false,
        hasHuppman: shop.hasHuppman ?? false,
        hasRomeo: shop.hasRomeo ?? false,
        hasCohiba: shop.hasCohiba ?? false,
        hasPunch: shop.hasPunch ?? false,
        hasPartagas: shop.hasPartagas ?? false,
        hasMacanudo: shop.hasMacanudo ?? false,
        hasGurkha: shop.hasGurka ?? false,
        hasGreycliff: shop.hasGreycliff ?? false,
        hasPlasencia: shop.hasPlasencia ?? false,
        hasAganorsa: shop.hasAganorse ?? false,
        hasAging: shop.hasAging ?? false,
        hasHoya: shop.hasHoya ?? false,
        hasLaAurora: shop.hasLaAurora ?? false,
        hasHouseCigar: shop.hasHouseCigar ?? false,
        hasPipeTobacco: shop.hasPipeTobacco ?? false,
        hasSanCristobal: shop.hasSanCristobal ?? false,
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;

        setForm((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const imagePath = `/images/shops/${shop.slug}/1.jpg`;

    return (
        <main className="mx-auto max-w-3xl px-6 py-12 text-white">
            <h1 className="mb-6 text-2xl font-bold">Edit Shop</h1>

            <div className="space-y-4">
                Name:
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/30 p-3"
                />
                Address:
                <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full rounded-xl bg-black/30 p-3"
                />
                City:
                <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/30 p-3"
                />
                State:
                <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/30 p-3"
                />
                State abbreviation
                <input
                    name="stateabb"
                    value={form.stateabb}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/30 p-3"
                />
                
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full rounded-xl bg-black/30 p-3"
                />

                <input
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="Website"
                    className="w-full rounded-xl bg-black/30 p-3"
                />

                

                <textarea
                    name="description"
                    value={form.description || ""}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/30 p-3"
                />
                <label className="text-sm text-neutral-400">Hero Image</label>
                <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="/images/shops/example.jpg"
                    className="w-full rounded-xl bg-black/30 p-3"
                />
                {form.image && (
                    <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                        <img
                            src={form.image}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                        />
                    </div>
                )}
                <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="hasLounge"
                    checked={form.hasLounge}
                    onChange={handleChange}
                />Has Lounge
                </label>

                <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="hasHumidor"
                    checked={form.hasHumidor}
                    onChange={handleChange}
                />Has Humidor
                </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="sellsAccessory"
                            checked={form.sellsAccessory}
                            onChange={handleChange}
                        />Sells Accessories
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasLiquorLicense"
                            checked={form.hasLiquorLicense}
                            onChange={handleChange}
                        />Has Liquor License
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="canBringInLiquor"
                            checked={form.canBringInLiquor}
                            onChange={handleChange}
                        />BYOB
                    </label>
                </div>
                <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="sellsFood"
                        checked={form.sellsFood}
                        onChange={handleChange}
                    />Sells/serves food
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="sellsDrink"
                        checked={form.sellsDrink}
                        onChange={handleChange}
                    />Sells drinks (sodas, water, etc...)
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="hasMemberAccess"
                        checked={form.hasMemberAccess}
                        onChange={handleChange}
                    />Has Member Access/Lounge
                </label>
                </div>

                <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="hasMemberLocker"
                        checked={form.hasMemberLocker}
                        onChange={handleChange}
                    />Has Member Lockers
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="hasEvents"
                        checked={form.hasEvents}
                        onChange={handleChange}
                    />Has Special Events
                </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasLiveMusic"
                            checked={form.hasLiveMusic}
                            onChange={handleChange}
                        />Has Live Music
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasInternetAccess"
                            checked={form.hasInternetAccess}
                            onChange={handleChange}
                        />Has Internet Access
                    </label>
                </div>

                <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasCoffeeMaker"
                            checked={form.hasCoffeeMaker}
                            onChange={handleChange}
                        />Has Coffee Maker
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasIceMaker"
                            checked={form.hasIceMaker}
                            onChange={handleChange}
                        />Has Ice Maker
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasBigTV"
                            checked={form.hasBigTV}
                            onChange={handleChange}
                        />Has Big TV(s)
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasInternetAccess"
                            checked={form.hasInternetAccess}
                            onChange={handleChange}
                        />Has Internet Access
                    </label>
                </div>
                

                
                <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={form.isFeatured}
                        onChange={handleChange}
                    />
                    Featured
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isSponsored"
                        checked={form.isSponsored}
                        onChange={handleChange}
                    />
                    Sponsored
                </label>
                </div>
                Has: 
                <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="hasPadron"
                        checked={form.hasPadron}
                        onChange={handleChange}
                    /> Padron
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="hasFuente"
                        checked={form.hasFuente}
                        onChange={handleChange}
                    /> Fuente
                </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasOpusX"
                            checked={form.hasOpusX}
                            onChange={handleChange}
                        /> Opus X
                    </label><label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasRareOpusX"
                            checked={form.hasRareOpusX}
                            onChange={handleChange}
                        /> Rare OpusX
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasDiamond"
                            checked={form.hasDiamond}
                            onChange={handleChange}
                        /> Diamond Crown
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasAshton"
                            checked={form.hasAshton}
                            onChange={handleChange}
                        /> Ashton
                    </label>
                </div>
                <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasAroma"
                            checked={form.hasAroma}
                            onChange={handleChange}
                        /> Aroma de Cuba
                    </label>                    
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasTatuaje"
                            checked={form.hasTatuaje}
                            onChange={handleChange}
                        /> Tatuaje
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasDavidoff"
                            checked={form.hasDavidoff}
                            onChange={handleChange}
                        /> Davidoff
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasAvo"
                            checked={form.hasAvo}
                            onChange={handleChange}
                        /> Avo
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasAtabey"
                            checked={form.hasAtabey}
                            onChange={handleChange}
                        /> Atabey
                    </label><label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasLordByron"
                            checked={form.hasLordByron}
                            onChange={handleChange}
                        /> Lord Byron
                    </label>
                </div>
                <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasPerdomo"
                            checked={form.hasPerdomo}
                            onChange={handleChange}
                        /> Perdomo
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasRP"
                            checked={form.hasRP}
                            onChange={handleChange}
                        /> Rocky Patel
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasLFD"
                            checked={form.hasLFD}
                            onChange={handleChange}
                        /> La Flor Dominicana
                    </label><label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasOliva"
                            checked={form.hasOliva}
                            onChange={handleChange}
                        /> Oliva
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasMyFather"
                            checked={form.hasMyFather}
                            onChange={handleChange}
                        /> My Father
                    </label>
                    
                </div>
                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasMontecristo"
                            checked={form.hasMontecristo}
                            onChange={handleChange}
                        /> Montecristo
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasRomeo"
                            checked={form.hasRomeo}
                            onChange={handleChange}
                        /> Romeo Y Julietta
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasHuppman"
                            checked={form.hasHuppman}
                            onChange={handleChange}
                        /> H. Uppman
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasAJ"
                            checked={form.hasAJ}
                            onChange={handleChange}
                        /> AJ Fernandez
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasNub"
                            checked={form.hasNub}
                            onChange={handleChange}
                        /> Nub
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasCain"
                            checked={form.hasCain}
                            onChange={handleChange}
                        /> Cain
                    </label>
                </div>
                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasAcid"
                            checked={form.hasAcid}
                            onChange={handleChange}
                        /> Acid/Drew Estate
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasLiga"
                            checked={form.hasLiga}
                            onChange={handleChange}
                        /> Liga Privada
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasCohiba"
                            checked={form.hasCohiba}
                            onChange={handleChange}
                        /> Cohiba (not Cuban)
                    </label><label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasCamacho"
                            checked={form.hasCamacho}
                            onChange={handleChange}
                        /> Camacho
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasPunch"
                            checked={form.hasPunch}
                            onChange={handleChange}
                        /> Punch
                    </label>
                    
                </div>
                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasHoya"
                            checked={form.hasHoya}
                            onChange={handleChange}
                        /> Hoya de Monterrey
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasPartagas"
                            checked={form.hasPartagas}
                            onChange={handleChange}
                        /> Partagas
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasMacanudo"
                            checked={form.hasMacanudo}
                            onChange={handleChange}
                        /> Macanudo
                    </label><label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasAging"
                            checked={form.hasAging}
                            onChange={handleChange}
                        /> Aging Room
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasGreyCliff"
                            checked={form.hasGreycliff}
                            onChange={handleChange}
                        /> Greycliff
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasGurka"
                            checked={form.hasFuente}
                            onChange={handleChange}
                        /> Gurkha
                    </label>
                </div>
                <div className="flex flex-wrap gap-4">
                   
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasAlec"
                            checked={form.hasAlec}
                            onChange={handleChange}
                        /> Alec Bradley
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasAganorsa"
                            checked={form.hasAganorsa}
                            onChange={handleChange}
                        /> Leaf by Aganorsa
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasLaAurora"
                            checked={form.hasLaAurora}
                            onChange={handleChange}
                        /> La Aurora
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasPlasencia"
                            checked={form.hasPlasencia}
                            onChange={handleChange}
                        /> Plasencia
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasSanCristobal"
                            checked={form.hasSanCristobal}
                            onChange={handleChange}
                        /> San Cristobal
                    </label>
                    </div>
                <div className="flex flex-wrap gap-4">

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasHouseCigar"
                            checked={form.hasHouseCigar}
                            onChange={handleChange}
                        /> House Cigars
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasPipeTobacco"
                            checked={form.hasPipeTobacco}
                            onChange={handleChange}
                        /> Pipe Tobacco
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="hasHooka"
                            checked={form.hasHooka}
                            onChange={handleChange}
                        />Has Hooka
                    </label> 
                </div>

                <button
                    onClick={async () => {
                        setSaving(true);

                        const res = await fetch(`/api/admin/shops/${shop.id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(form),
                        });

                        setSaving(false);

                        if (!res.ok) {
                            const errorText = await res.text();
                            alert(`Save failed: ${errorText}`);
                        } else {
                            alert("Saved!");
                        }
                    }}
                    className="rounded-xl bg-amber-400 px-4 py-2 font-semibold text-black"
                >
                    {saving ? "Saving..." : "Save"}
                </button>

                
            </div>
        </main>
    );
}