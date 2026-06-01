import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";

interface PromoPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PromoPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) return {};

    const promoItem = await db.promo.findUnique({
        where: { slug },
        select: { title: true, description: true }
    });

    if (!promoItem) return {};

    return {
        title: `${promoItem.title} | Спецпредложения Клиники Вербенкина`,
        description: promoItem.description?.slice(0, 160) || "",
        alternates: {
            canonical: `/about/promo/${slug}`,
        }
    };
}

export default async function PromoDetailPage({ params }: PromoPageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) notFound();

    const promoItem = await db.promo.findUnique({
        where: { slug }
    });

    if (!promoItem) {
        notFound();
    }

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "О клинике", href: "/about" },
        { label: "Акции", href: "/about/promo" },
        { label: promoItem.title }
    ];

    return (
        <main className="min-h-screen bg-white pt-24 pb-16 font-sans">
            <div className="max-w-4xl mx-auto px-4">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="mt-8 border-b pb-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3">
                        <span className="px-2.5 py-0.5 rounded-md uppercase tracking-wider text-[9px] font-black bg-amber-50 text-amber-600 shadow-sm">
                            Спецпредложение
                        </span>
                        <time>
                            {new Date(promoItem.createdAt).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </time>
                    </div>

                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {promoItem.title}
                    </h1>
                </div>

                <div className="mt-6 text-slate-700 leading-relaxed text-base whitespace-pre-line">
                    {promoItem.description || "Полные условия специального предложения уточняйте по телефону регистратуры."}
                </div>

                <div className="mt-16">
                    <MedicalDisclaimer />
                </div>
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    const promos = await db.promo.findMany({
        select: { slug: true }
    });

    return promos.map((item) => ({
        slug: item.slug
    }));
}
