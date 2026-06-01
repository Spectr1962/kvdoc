import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { db } from "~/server/db";
import { PriceSection } from "~/components/sections/price-table";
import Breadcrumbs from "~/components/shared/breadcrumbs";

interface ServicePageProps {
    params: Promise<{
        'direction-slug': string;
    }>;
}

// 1. ДИНАМИЧЕСКАЯ ГЕНЕРАЦИЯ SEO МЕТА-ТЕГОВ
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const directionSlug = resolvedParams['direction-slug'];

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
    const resolvedParams = await params;
    const directionSlug = resolvedParams['direction-slug'];

    const direction = await db.direction.findUnique({
        where: { slug: directionSlug },
        select: {
            id: true,
            title: true,
            h1: true,
            description: true,
        },
    });

    if (!direction) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pt-24 pb-16 font-sans selection:bg-indigo-50">
            <div className="max-w-5xl mx-auto px-4 mb-12">
                {/* Привели к единому формату 'label' для хлебных крошек */}
                <Breadcrumbs
                    items={[
                        { label: "Услуги", href: "/services" },
                        { label: direction.title }
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

            <PriceSection directionSlug={directionSlug} />
        </main>
    );
}

// 3. СТАТИЧЕСКАЯ ГЕНЕРАЦИЯ МАРШРУТОВ (SSG)
export async function generateStaticParams() {
    const directions = await db.direction.findMany({
        select: { slug: true },
    });

    return directions.map((d) => ({
        'direction-slug': d.slug, // Ключ изменен под имя новой папки
    }));
}
