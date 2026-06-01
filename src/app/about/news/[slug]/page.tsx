import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";

// Строго типизируем пропсы для динамического роута [slug] в Next.js 15
interface NewsPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// 1. ДИНАМИЧЕСКАЯ ГЕНЕРАЦИЯ SEO МЕТА-ТЕГОВ ДЛЯ КОНКРЕТНОЙ НОВОСТИ
export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) return {};

    const newsItem = await db.news.findUnique({
        where: { slug },
        select: { title: true, content: true }
    });

    if (!newsItem) return {};

    return {
        title: `${newsItem.title} | Новости Клиники Вербенкина`,
        description: newsItem.content.slice(0, 160),
        alternates: {
            canonical: `/about/news/${slug}`,
        }
    };
}

// 2. СЕРВЕРНЫЙ КОМПОНЕНТ ДЕТАЛЬНОЙ СТРАНИЦЫ НОВОСТИ
export default async function NewsDetailPage({ params }: NewsPageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) notFound();

    // Запрос к таблице news в базе данных Prisma
    const newsItem = await db.news.findUnique({
        where: { slug }
    });

    // Если новости со слагом из URL нет в базе — отдаем 404
    if (!newsItem) {
        notFound();
    }

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "О клинике", href: "/about" },
        { label: "Новости", href: "/mediacentre?tab=news" },
        { label: newsItem.title }
    ];

    return (
        <main className="min-h-screen bg-white pt-24 pb-16 font-sans">
            <div className="max-w-4xl mx-auto px-4">
                {/* Хлебные крошки */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Контентная часть новости */}
                <div className="mt-8 border-b pb-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-md uppercase tracking-wider text-[9px] font-black ${newsItem.isImportant ? "bg-amber-50 text-amber-600 animate-pulse" : "bg-blue-50 text-blue-600"
                            }`}>
                            {newsItem.isImportant ? "Важно" : "Событие"}
                        </span>
                        <time>
                            {new Date(newsItem.createdAt).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </time>
                    </div>

                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {newsItem.title}
                    </h1>
                </div>

                {/* Тело новости */}
                <div className="mt-6 text-slate-700 leading-relaxed text-base whitespace-pre-line">
                    {newsItem.content}
                </div>

                {/* Обязательный медицинский дисклеймер */}
                <div className="mt-16">
                    <MedicalDisclaimer />
                </div>
            </div>
        </main>
    );
}

// 3. СТАТИЧЕСКАЯ ГЕНЕРАЦИЯ МАРШРУТОВ (SSG)
export async function generateStaticParams() {
    const news = await db.news.findMany({
        select: { slug: true }
    });

    return news.map((item) => ({
        slug: item.slug
    }));
}
