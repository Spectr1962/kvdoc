import { type MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://verbenkin-clinic.ru";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/api/",
                "/admin/",
                "/_next/",
                "/static/"
            ],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
