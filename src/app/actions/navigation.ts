'use server';

import { db } from "~/server/db";

export async function getNavigationData() {
    // 1. Извлекаем направления, подразделы и врачей для первых двух мега-меню
    const directions = await db.direction.findMany({
        include: {
            subdirections: {
                select: { id: true, slug: true, title: true },
                orderBy: { title: 'asc' }
            },
            doctors: {
                select: { id: true, name: true, slug: true },
                orderBy: { name: 'asc' }
            }
        },
        orderBy: { title: 'asc' },
    });

    // 2. Извлекаем последние 3 новости для вывода в Уровень 3 медиацентра
    const recentNews = await db.news.findMany({
        take: 3,
        orderBy: [
            { isImportant: 'desc' },
            { createdAt: 'desc' }
        ],
        select: { id: true, slug: true, title: true }
    });

    // 3. Извлекаем последние 3 экспертные статьи для вывода в Уровень 3 медиацентра
    const recentArticles = await db.post.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: { id: true, slug: true, title: true }
    });

    // Вспомогательная функция для форматирования ФИО докторов в Фамилия И. О.
    const formatShortName = (fullName: string) => {
        const parts = fullName.trim().split(/\s+/);
        if (parts.length >= 3) return `${parts[0]} ${parts[1][0]}. ${parts[2][0]}.`;
        if (parts.length === 2) return `${parts[0]} ${parts[1][0]}.`;
        return fullName;
    };

    return {
        directions: directions.map(dir => ({
            id: dir.id,
            slug: dir.slug,
            title: dir.title,
            subdirections: dir.subdirections.map(sub => ({
                id: sub.id,
                slug: sub.slug,
                title: sub.title
            })),
            doctors: dir.doctors.map(doc => ({
                id: doc.id,
                slug: doc.slug,
                shortName: formatShortName(doc.name)
            }))
        })),
        mediacentre: {
            news: recentNews,
            articles: recentArticles
        }
    };
}
