import { type MetadataRoute } from "next";
import { db } from "@/server/db"; // Измените на @/ или ~/ в зависимости от вашего tsconfig.json

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://verbenkin-clinic.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        // 1. СТАТИЧЕСКИЕ И СЛУЖЕБНЫЕ СТРАНИЦЫ (Чистый английский, верхний уровень)
        const staticPages = [
            "",
            "/about",
            "/contacts",
            "/services",
            "/doctors",
            "/mediacentre",
            "/careers",
            "/legal-info",
            "/privacy-policy"
        ].map((route) => ({
            url: `${BASE_URL}${route}`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: route === "" ? 1.0 : 0.8,
        }));

        // 2. МЕДИЦИНСКИЕ НАПРАВЛЕНИЯ УСЛУГ (Транслит из БД)
        const directions = await db.direction.findMany({
            select: { slug: true, updatedAt: true }
        });

        const directionPages = directions.map((dir) => ({
            url: `${BASE_URL}/services/${dir.slug}`,
            lastModified: dir.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.9,
        }));

        // 3. КАРТОЧКИ ВРАЧЕЙ (Вложенная структура /doctors/[direction-slug]/[doctor-slug])
        const doctors = await db.doctor.findMany({
            where: { is_active: true },
            include: {
                directions: { select: { slug: true }, take: 1 }
            }
        });

        const doctorPages = doctors.map((doc) => {
            const directionSlug = doc.directions[0]?.slug ?? "general";
            return {
                url: `${BASE_URL}/doctors/${directionSlug}/${doc.slug}`,
                lastModified: doc.updatedAt,
                changeFrequency: "weekly" as const,
                priority: 0.8,
            };
        });

        // 4. МЕДИЦЕНТР: ЭКСПЕРТНЫЕ СТАТЬИ (/mediacentre/articles/[slug])
        const posts = await db.post.findMany({
            select: { slug: true, updatedAt: true }
        });

        const postPages = posts.map((post) => ({
            url: `${BASE_URL}/mediacentre/articles/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));

        // 5. МЕДИЦЕНТР: НОВОСТИ КЛИНИКИ (/mediacentre/news/[slug])
        const news = await db.news.findMany({
            select: { slug: true, updatedAt: true }
        });

        const newsPages = news.map((item) => ({
            url: `${BASE_URL}/mediacentre/news/${item.slug}`,
            lastModified: item.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.6,
        }));

        // 6. МЕДИЦЕНТР: АКЦИИ И СПЕЦПРЕДЛОЖЕНИЯ (/mediacentre/promo/[slug])
        const promos = await db.promo.findMany({
            where: { isActive: true },
            select: { slug: true, updatedAt: true }
        });

        const promoPages = promos.map((promo) => ({
            url: `${BASE_URL}/mediacentre/promo/${promo.slug}`,
            lastModified: promo.updatedAt,
            changeFrequency: "daily" as const,
            priority: 0.8,
        }));

        // Объединяем все сгенерированные фиды для поисковых роботов
        return [
            ...staticPages,
            ...directionPages,
            ...doctorPages,
            ...postPages,
            ...newsPages,
            ...promoPages
        ];

    } catch (error) {
        console.error("Ошибка при генерации sitemap.ts:", error);
        return [
            { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 }
        ];
    }
}
