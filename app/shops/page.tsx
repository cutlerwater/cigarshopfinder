import ShopsClientPage from "./ShopsClientPage";

type Props = {
    searchParams?: Promise<{
        q?: string;
    }>;
};

export default async function ShopsPage({ searchParams }: Props) {
    const params = await searchParams;
    const initialQuery = params?.q ?? "";

    return <ShopsClientPage initialQuery={initialQuery} />;
}