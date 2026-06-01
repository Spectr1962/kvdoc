import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { db } from "~/server/db";
import { PriceSection } from "~/components/sections/price-table";
import Breadcrumbs from "~/components/shared/breadcrumbs";

interface SubdirectionPageProps {
    params: Promise<{
        'direction-slug': string;
        'subdirection-slug': string;
    }>;
}

// 1. ГЕНЕРАЦИЯ МЕТАДАННЫХ
export async function generateMetadata({ params }: SubdirectionPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const directionSlug = resolvedParams['direction-slug'];
    const subdirectionSlug = resolvedParams['subdirection-slug'];

    const subdirection = await db.subdirection.findUnique({
        where: { slug: subdirectionSlug },
        select: {
            title: true,
            metaTitle: true,
            description: true,
        },
    });

    if (!subdirection) return {};

    const fallbackTitle = subdirection.metaTitle || `${subdirection.title} — цены в Клинике Вербенкина`;

    return {
        title: fallbackTitle,
        description: subdirection.description || "",
        alternates: {
            canonical: `/services/${directionSlug}/${subdirectionSlug}`,
        },
    };
}

// 2. КОМПОНЕНТ СТРАНИЦЫ ПОДНАПРАВЛЕНИЯ
export default async function ServiceSubdirectionPage({ params }: SubdirectionPageProps) {
    const resolvedParams = await params;
    const directionSlug = resolvedParams['direction-slug'];
    const subdirectionSlug = resolvedParams['subdirection-slug'];

    const subdirection = await db.subdirection.findUnique({
        where: { slug: subdirectionSlug },
        include: {
            direction: true
        }
    });

    if (!subdirection || subdirection.direction.slug !== directionSlug) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pt-24 pb-16 font-sans">
            <div className="max-w-5xl mx-auto px-4 mb-12">
                <Breadcrumbs
                    items={[
                        { label: "Услуги", href: "/services" },
                        { label: subdirection.direction.title, href: `/services/${directionSlug}` },
                        { label: subdirection.title }
                    ]}
                />

                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-none mb-4">
                    {subdirection.title}
                </h1>

                {subdirection.description && (
                    <div className="max-w-3xl text-sm leading-relaxed text-slate-500">
                        <p>{subdirection.description}</p>
                    </div>
                )}
            </div>

            {/* Передаем отфильтрованный подраздел в прайс-лист */}
            <PriceSection directionSlug={directionSlug} subdirectionSlug={subdirectionSlug} />
        </main>
    );
}

// 3. СТАТИЧЕСКАЯ ГЕНЕРАЦИЯ (SSG)
export async function generateStaticParams() {
    const subdirections = await db.subdirection.findMany({
        include: { direction: true }
    });

    return subdirections.map((sub) => ({
        'direction-slug': sub.direction.slug,
        'subdirection-slug': sub.slug
    }));
}
