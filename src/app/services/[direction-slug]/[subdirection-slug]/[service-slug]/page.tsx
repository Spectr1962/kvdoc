import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";

interface ServicePageProps {
    params: Promise<{
        'direction-slug': string;
        'subdirection-slug': string;
        'service-slug': string;
    }>;
}

// 1. ГЕНЕРАЦИЯ МЕТАДАННЫХ
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const directionSlug = resolvedParams['direction-slug'];
    const subdirectionSlug = resolvedParams['subdirection-slug'];
    const serviceSlug = resolvedParams['service-slug'];

    const service = await db.medicalService.findUnique({
        where: { slug: serviceSlug },
        select: { title: true, description: true }
    });

    if (!service) return {};

    return {
        title: `${service.title} — Клиника Вербенкина`,
        description: service.description || "",
        alternates: {
            canonical: `/services/${directionSlug}/${subdirectionSlug}/${serviceSlug}`,
        },
    };
}

// 2. КОМПОНЕНТ СТРАНИЦЫ КОНКРЕТНОЙ УСЛУГИ
export default async function MedicalServicePage({ params }: ServicePageProps) {
    const resolvedParams = await params;
    const directionSlug = resolvedParams['direction-slug'];
    const subdirectionSlug = resolvedParams['subdirection-slug'];
    const serviceSlug = resolvedParams['service-slug'];

    const service = await db.medicalService.findUnique({
        where: { slug: serviceSlug },
        include: {
            subdirection: {
                include: { direction: true }
            }
        }
    });

    // Валидация цепочки URL: проверяем совпадение всех родительских сущностей
    if (!service ||
        service.subdirection.slug !== subdirectionSlug ||
        service.subdirection.direction.slug !== directionSlug) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pt-24 pb-16 font-sans">
            <div className="max-w-4xl mx-auto px-4">
                <Breadcrumbs
                    items={[
                        { label: "Услуги", href: "/services" },
                        { label: service.subdirection.direction.title, href: `/services/${directionSlug}` },
                        { label: service.subdirection.title, href: `/services/${directionSlug}/${subdirectionSlug}` },
                        { label: service.title }
                    ]}
                />

                <div className="mt-8 border-b pb-6">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {service.title}
                    </h1>
                    <div className="mt-4 flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                        <span className="text-slate-600 font-medium">Стоимость услуги:</span>
                        <span className="text-2xl font-bold text-indigo-600">{service.price} ₽</span>
                    </div>
                </div>

                <div className="mt-6 text-slate-700 leading-relaxed text-base">
                    {service.description || "Описание услуги в процессе наполнения специалистами клиники."}
                </div>

                <div className="mt-12">
                    <MedicalDisclaimer />
                </div>
            </div>
        </main>
    );
}

// 3. СТАТИЧЕСКАЯ ГЕНЕРАЦИЯ (SSG)
export async function generateStaticParams() {
    const services = await db.medicalService.findMany({
        include: {
            subdirection: {
                include: { direction: true }
            }
        }
    });

    return services.map((service) => ({
        'direction-slug': service.subdirection.direction.slug,
        'subdirection-slug': service.subdirection.slug,
        'service-slug': service.slug
    }));
}
