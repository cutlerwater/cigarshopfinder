import fs from "fs";
import path from "path";

export function getShopImages(slug: string) {
    const dir = path.join(process.cwd(), "public", "images", "shops", slug);

    if (!fs.existsSync(dir)) {
        return [];
    }

    return fs
        .readdirSync(dir)
        .filter((file) =>
            /\.(jpg|jpeg|png|webp)$/i.test(file)
        )
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((file) => `/images/shops/${slug}/${file}`);
}