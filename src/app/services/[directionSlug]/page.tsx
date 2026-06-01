import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { db } from "~/server/db";
import { PriceSection } from "~/components/sections/price-table";
import Breadcrumbs from "~/components/shared/Breadcrumbs";

interface ServicePageProps {
    params: Promise<{
        directionSlug: string;
    }>;
}

// 1. ДИНАМИЧЕСКАЯ ГЕНЕРАЦИЯ SEO МЕТА-ТЕГОВ (С защитой от рантайм ошибок Prisma)
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { directionSlug } = await params;

    const direction = await db.direction.findUnique({
        where: { slug: directionSlug },
        select: {
            title: true,
            h1: true,
            description: true,
        },
    });

    if (!direction) {
        return {};
    }

    // Динамические фоллбэки на случай пустых полей в базе данных
    const pageTitle = direction.h1 || `${direction.title} в Москве`;
    const fallbackTitle = `${pageTitle} — цены в Клинике Вербенкина`;
    const fallbackDesc = direction.description || `Услуги отделения ${direction.title.toLowerCase()} в частной медицинской клинике. Актуальный прейскурант, квалифицированные специалисты и запись онлайн.`;

    return {
        title: fallbackTitle,
        description: fallbackDesc,
        alternates: {
            canonical: `/services/${directionSlug}`,
        },
        openGraph: {
            title: fallbackTitle,
            description: fallbackDesc,
            type: "website",
        },
    };
}

// 2. СЕРВЕРНЫЙ КОМПОНЕНТ СТРАНИЦЫ НАПРАВЛЕНИЯ
export default async function ServiceDirectionPage({ params }: ServicePageProps) {
    const { directionSlug } = await params;

    // Извлекаем чистые данные направления из PostgreSQL
    const direction = await db.direction.findUnique({
        where: { slug: directionSlug },
        select: {
            id: true,
            title: true,
            h1: true,
            description: true,
        },
    });

    // Защита: если слаг не найден, отдаем чистую страницу 404
    if (!direction) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pt-24 pb-16 font-sans selection:bg-indigo-50">
            {/* Шапка страницы в стиле Apple */}
            <div className="max-w-5xl mx-auto px-4 mb-12">

                {/* Интеграция переиспользуемого компонента хлебных крошек */}
                <Breadcrumbs
                    items={[
                        { title: "Услуги", href: "/services" },
                        { title: direction.title }
                    ]}
                />

                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-none mb-4">
                    {direction.h1 || `${direction.title} в Москве`}
                </h1>

                {direction.description && (
                    <div className="max-w-3xl text-sm leading-relaxed text-slate-500 font-normal">
                        <p>{direction.description}</p>
                    </div>
                )}
            </div>

            {/* Интерактивный интерактивный прайс-лист с поиском */}
            <PriceSection directionSlug={directionSlug} />
        </main>
    );
}

// 3. СТАТИЧЕСКАЯ ГЕНЕРАЦИЯ МАРШРУТОВ (SSG для ускорения Core Web Vitals)
export async function generateStaticParams() {
    const directions = await db.direction.findMany({
        select: { slug: true },
    });

    return directions.map((d) => ({
        directionSlug: d.slug,
    }));
}
