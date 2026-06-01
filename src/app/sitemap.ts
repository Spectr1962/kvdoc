import { type MetadataRoute } from "next";
import { db } from "~/server/db"; // ✅ Исправили алиас пути с @/ на ~/

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://verbenkin-clinic.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        // 1. СТАТИЧЕСКИЕ СТРАНИЦЫ
        const staticPages = [
            "",
            "/about",
            "/contacts",
            "/privacy",
            "/services"
        ].map((route) => ({
            url: `${BASE_URL}${route}`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: route === "" ? 1.0 : 0.8,
        }));

        // 2. НАПРАВЛЕНИЯ УСЛУГ (kebab-case роуты)
        const directions = await db.direction.findMany({
            select: { slug: true, updatedAt: true }
        });

        const directionPages = directions.map((dir) => ({
            url: `${BASE_URL}/services/${dir.slug}`,
            lastModified: dir.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.9,
        }));

        // 3. СТРАНИЦЫ ВРАЧЕЙ (Учитываем новую структуру вложенности /doctors/[direction-slug]/[doctor-slug])
        const doctors = await db.doctor.findMany({
            where: { is_active: true },
            include: {
                directions: { select: { slug: true }, take: 1 }
            }
        });

        const doctorPages = doctors.map((doc) => {
            // Берем первое направление врача для формирования корректного URL
            const directionSlug = doc.directions[0]?.slug ?? "general";
            return {
                url: `${BASE_URL}/doctors/${directionSlug}/${doc.slug}`,
                lastModified: doc.updatedAt,
                changeFrequency: "weekly" as const,
                priority: 0.8,
            };
        });

        // 4. СТАТЬИ БЛОГА
        const posts = await db.post.findMany({
            select: { slug: true, updatedAt: true }
        });

        const postPages = posts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }));

        // 5. АКТУАЛЬНЫЕ АКЦИИ
        const promos = await db.promo.findMany({
            where: { isActive: true },
            select: { slug: true, updatedAt: true }
        });

        const promoPages = promos.map((promo) => ({
            url: `${BASE_URL}/promotions/${promo.slug}`,
            lastModified: promo.updatedAt,
            changeFrequency: "daily" as const,
            priority: 0.7,
        }));

        return [
            ...staticPages,
            ...directionPages,
            ...doctorPages,
            ...postPages,
            ...promoPages
        ];

    } catch (error) {
        console.error("Ошибка при генерации sitemap.ts:", error);
        return [
            { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 }
        ];
    }
}
