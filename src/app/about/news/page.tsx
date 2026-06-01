import { type Metadata } from "next";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Новости и события клиники | Клиника Вербенкина",
    description: "Актуальные новости многопрофильного медицинского центра Клиника Вербенкина в Зеленограде. Информация об изменениях в графике работы, открытии новых направлений и обновлении оборудования.",
};

export default async function NewsArchivePage() {
    // Получаем полный список новостей из базы данных
    const allNews = await db.news.findMany({
        orderBy: [
            { isImportant: "desc" },
            { createdAt: "desc" }
        ]
    });

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "О клинике", href: "/about" },
        { label: "Новости клиники" }
    ];

    return (
        <main className="min-h-screen bg-slate-50/30 pt-24 pb-16 font-sans">
            <div className="container mx-auto max-w-6xl px-4 space-y-8">
                {/* Хлебные крошки */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Шапка страницы */}
                <div className="max-w-2xl space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 select-none">
                        Пресс-служба
                    </span>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Новости клиники
                    </h1>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                        Следите за событиями нашего медицинского центра. Здесь публикуются официальные объявления, графики работы в праздники и отчеты о запуске новых лечебных программ.
                    </p>
                </div>

                {/* Сетка архива новостей */}
                {!allNews || allNews.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl shadow-xs border border-dashed border-slate-100">
                        <p className="text-sm text-slate-400 font-medium italic">Лента новостей центра временно пуста.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allNews.map((item) => {
                            const isImportant = item.isImportant;
                            return (
                                <div
                                    key={item.id}
                                    className="group bg-white p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[240px]"
                                >
                                    <div className="space-y-4">
                                        {/* Мета-информация */}
                                        <div className="flex items-center justify-between text-[11px] font-bold">
                                            <span className={`px-2.5 py-0.5 rounded-md uppercase tracking-wider text-[9px] font-black shadow-3xs ${isImportant ? "bg-amber-50 text-amber-600 animate-pulse" : "bg-blue-50 text-blue-600"
                                                }`}>
                                                {isImportant ? "Важно" : "Событие"}
                                            </span>
                                            <span className="text-slate-400 font-medium">
                                                {new Date(item.createdAt).toLocaleDateString("ru-RU", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                        {/* Текст */}
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-4">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Ссылка на детальную страницу новости */}
                                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end text-[11px] font-bold">
                                        <Link
                                            href={`/about/news/${item.slug}`}
                                            className="text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-all flex items-center gap-0.5"
                                        >
                                            Читать полностью →
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Обязательный медицинский дисклеймер */}
                <div className="pt-8">
                    <MedicalDisclaimer />
                </div>
            </div>
        </main>
    );
}
