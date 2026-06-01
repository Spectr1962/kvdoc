import { type MetadataRoute } from "next";
import { db } from "@/server/db";

// Базовый домен вашей клиники (подставьте ваш продакшн-домен)
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://verbenkin-clinic.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        // 1. СТАТИЧЕСКИЕ СТРАНИЦЫ (Максимальный приоритет)
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

        // 2. ДИНАМИЧЕСКИЕ НАПРАВЛЕНИЯ УСЛУГ (Например, /services/analizy)
        const directions = await db.direction.findMany({
            select: { slug: true, updatedAt: true }
        });

        const directionPages = directions.map((dir) => ({
            url: `${BASE_URL}/services/${dir.slug}`,
            lastModified: dir.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.9, // Очень важные страницы для локального SEO
        }));

        // 3. СТРАНИЦЫ ВРАЧЕЙ (Например, /doctors/stomatolog-ivanov)
        const doctors = await db.doctor.findMany({
            where: { is_active: true },
            select: { slug: true, updatedAt: true }
        });

        const doctorPages = doctors.map((doc) => ({
            url: `${BASE_URL}/doctors/${doc.slug}`,
            lastModified: doc.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.8, // Фактор E-E-A-T автора контента
        }));

        // 4. ИНФОРМАЦИОННЫЕ СТАТЬИ БЛОГА (/mediacentre или /blog)
        const posts = await db.post.findMany({
            select: { slug: true, updatedAt: true }
        });

        const postPages = posts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }));

        // 5. АКТУАЛЬНЫЕ АКЦИИ КЛИНИКИ
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

        // Объединяем все массивы в один финальный фид карты сайта
        return [
            ...staticPages,
            ...directionPages,
            ...doctorPages,
            ...postPages,
            ...promoPages
        ];

    } catch (error) {
        console.error("Ошибка при генерации sitemap.ts:", error);
        // В случае сбоя БД отдаем хотя бы базовые статические страницы, чтобы не упал весь сайт
        return [
            { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 }
        ];
    }
}
