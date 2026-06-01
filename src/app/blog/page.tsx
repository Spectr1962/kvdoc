import { type Metadata } from "next";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/Breadcrumbs";
import MedicalDisclaimer from "~/components/shared/MedicalDisclaimer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Медицинский журнал и публикации | Клиника Вербенкина",
    description: "Экспертные статьи, советы практикующих врачей и справочник заболеваний от специалистов Клиники Вербенкина в Зеленограде.",
    alternates: {
        canonical: "https://kvdoc.ru",
    }
};

export default async function BlogPage() {
    // Извлекаем все публикации журнала и подтягиваем авторов-врачей
    const posts = await db.post.findMany({
        include: {
            author: {
                select: { name: true, specialty: true }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Журнал" }
    ];

    return (
        <main className="container mx-auto max-w-7xl px-4 py-10 space-y-12">
            <Breadcrumbs items={breadcrumbItems} />

            {/* Заголовок журнала */}
            <div className="max-w-3xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Экспертный контент
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Медицинский журнал клиники
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                    Полезные материалы о здоровье, рекомендации по профилактике заболеваний и разборы клинических случаев от практикующих специалистов Клиники Вербенкина.
                </p>
            </div>

            {/* СЕТКА СТАТЕЙ: ИСПРАВЛЕНО — БЕЗ РАМОК С МЯГКИМИ ПАРАЛЛЕЛЬНЫМИ ТЕНЯМИ */}
            {posts.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-3xl shadow-xs">
                    <p className="text-sm text-slate-400">Публикации в журнале находятся на стадии подготовки.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col justify-between bg-white p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-200"
                        >
                            <div className="space-y-4">
                                {/* Бейджи типов публикаций на основе вашего дизайна */}
                                <div>
                                    {post.type === "article" && (
                                        <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600 uppercase tracking-wide">
                                            Статья
                                        </span>
                                    )}
                                    {post.type === "advice" && (
                                        <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 uppercase tracking-wide">
                                            Совет врача
                                        </span>
                                    )}
                                    {post.type === "disease" && (
                                        <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-600 uppercase tracking-wide">
                                            Заболевание
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-light line-clamp-3 leading-relaxed">
                                        {post.seoDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Информация об авторе-докторе внизу плитки */}
                            {post.author && (
                                <div className="pt-4 mt-4 border-t border-slate-50 flex flex-col space-y-1">
                                    <span className="text-[11px] font-bold text-slate-700">{post.author.name}</span>
                                    <span className="text-[10px] text-slate-400 truncate font-medium">{post.author.specialty}</span>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            )}

            <MedicalDisclaimer />
        </main>
    );
}
