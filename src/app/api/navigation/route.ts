import { NextResponse } from "next/server";
import { db } from "~/server/db"; // ИСПРАВЛЕНО: приведен к стандартному алиасу @/* вашего проекта

// КРИТИЧЕСКИ ВАЖНО ДЛЯ NEXT.JS 15: Отключаем статическое кэширование Safari и роботов.
// Теперь меню хедера всегда запрашивает свежие данные из базы данных в реальном времени.
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const directions = await db.direction.findMany({
            include: {
                subdirections: {
                    select: {
                        id: true,
                        slug: true,
                        title: true
                    }
                },
                doctors: {
                    where: {
                        is_active: true, // СЕО-ФАКТОР: Выводим в меню только работающих в данный момент врачей
                        NOT: [
                            { specialty: { contains: "сестра", mode: "insensitive" } },
                            { specialty: { contains: "процедур", mode: "insensitive" } },
                            { specialty: { contains: "администратор", mode: "insensitive" } }
                        ]
                    },
                    select: {
                        id: true,
                        slug: true,
                        name: true 
                    },
                    orderBy: { name: "asc" }
                }
            },
            orderBy: { title: "asc" }
        });

        const recentNews = await db.news.findMany({
            take: 3,
            orderBy: [{ isImportant: "desc" }, { createdAt: "desc" }],
            select: { id: true, slug: true, title: true }
        });

        const recentArticles = await db.post.findMany({
            take: 3,
            orderBy: { createdAt: "desc" },
            select: { id: true, slug: true, title: true }
        });

        return NextResponse.json({
            directions,
            mediacentre: {
                news: recentNews,
                articles: recentArticles
            }
        });
    } catch (error) {
        console.error("Критическая ошибка API навигации хедера:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
