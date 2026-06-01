import { type Metadata } from "next";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Акции и специальные предложения | Клиника Вербенкина",
    description: "Актуальные акции, скидки и комплексные программы чекапов многопрофильного медицинского центра Клиника Вербенкина в Зеленограде. Забота о здоровье вашей семьи с выгодой.",
};

export default async function PromoArchivePage() {
    // Извлекаем только активные акции из базы данных PostgreSQL
    const promos = await db.promo.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" }
    });

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "О клинике", href: "/about" },
        { label: "Акции и спецпредложения" }
    ];

    return (
        <main className="min-h-screen bg-slate-50/30 pt-24 pb-16 font-sans">
            <div className="container mx-auto max-w-6xl px-4 space-y-8">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="max-w-2xl space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 select-none">
                        Программы лояльности
                    </span>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Акции и спецпредложения
                    </h1>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                        Комплексные обследования (чекапы), сезонные скидки на приемы специалистов и специальные условия для постоянных пациентов Клиники Вербенкина в Зеленограде.
                    </p>
                </div>

                {!promos || promos.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl shadow-sm border border-dashed border-slate-100">
                        <p className="text-sm text-slate-400 font-medium italic">В данный момент активных акций нет. Список обновляется.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promos.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[220px]"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[11px] font-bold">
                                        <span className="px-2.5 py-0.5 rounded-md uppercase tracking-wider text-[9px] font-black bg-amber-50 text-amber-600 shadow-sm">
                                            Акция
                                        </span>
                                        <span className="text-slate-400 font-medium">
                                            {new Date(item.createdAt).toLocaleDateString("ru-RU", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                                            {item.description || "Узнайте подробности специального предложения у администраторов клиники."}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end text-[11px] font-bold">
                                    <Link
                                        href={`/about/promo/${item.slug}`}
                                        className="text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-all flex items-center gap-0.5"
                                    >
                                        Подробнее →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="pt-8">
                    <MedicalDisclaimer />
                </div>
            </div>
        </main>
    );
}
