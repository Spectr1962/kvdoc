import { type Metadata } from "next";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Услуги и цены медицинского центра | Клиника Вербенкина",
    description: "Полный прейскурант и каталог медицинских услуг Клиники Вербенкина в Зеленограде. Цены на приемы врачей, анализы, УЗИ-диагностику по 13 ключевым направлениям.",
    alternates: {
        canonical: "https://kvdoc.ru",
    }
};

export default async function AllServicesPage() {
    // Тянем направления, количество услуг и вложенные подразделы Уровня 2
    const directions = await db.direction.findMany({
        include: {
            subdirections: {
                select: {
                    id: true,
                    slug: true,
                    title: true,
                },
                orderBy: { title: "asc" }
            },
            _count: {
                select: { services: true }
            }
        },
        orderBy: { title: "asc" }
    });

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Услуги" }
    ];

    return (
        <main className="container mx-auto max-w-7xl px-4 py-10 space-y-12">
            <Breadcrumbs items={breadcrumbItems} />

            {/* Заголовок и вводный текст */}
            <div className="max-w-3xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Медицинские услуги
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Каталог направлений и цены
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                    Выберите интересующее вас медицинское отделение или конкретный подраздел, чтобы открыть развёрнутую тарифную сетку процедур медицинского центра Клиника Вербенкина.
                </p>
            </div>

            {/* СЕТКА НАПРАВЛЕНИЙ С ВЛОЖЕННЫМИ ПОДРАЗДЕЛАМИ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {directions.map((dir) => (
                    <div
                        key={dir.id}
                        className="group flex flex-col justify-between bg-white p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-200 min-h-[180px]"
                    >
                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <div className="w-6 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                                <Link
                                    href={`/services/${dir.slug}`}
                                    className="block text-base font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors pt-1"
                                >
                                    {dir.title}
                                </Link>
                            </div>

                            {/* ВЫВОД ПОДРАЗДЕЛОВ (Например, Акушерство, ВМС для гинекологии) */}
                            {dir.subdirections.length > 0 && (
                                <div className="space-y-1 pl-2 border-l border-slate-100 flex flex-col">
                                    {dir.subdirections.map((sub) => (
                                        <Link
                                            key={sub.id}
                                            href={`/services/${dir.slug}#${sub.slug}`}
                                            className="text-[11px] font-medium text-slate-400 hover:text-blue-500 transition-colors truncate"
                                        >
                                            • {sub.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Нижная плашка со статистикой */}
                        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pt-4 border-t border-slate-50 mt-2">
                            <span>
                                {dir._count.services > 0
                                    ? `${dir._count.services} позиций`
                                    : "Обновляется"}
                            </span>
                            <Link
                                href={`/services/${dir.slug}`}
                                className="text-blue-500 opacity-80 group-hover:opacity-100 font-bold transition-opacity"
                            >
                                Прайс →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <MedicalDisclaimer />
        </main>
    );
}
