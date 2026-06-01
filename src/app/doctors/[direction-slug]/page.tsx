import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";

export const dynamic = "force-dynamic";

// 1. Исправили тип в интерфейсе на 'direction-slug'
interface PageProps {
    params: Promise<{ 'direction-slug': string }>;
}

// 2. Убрали 'default' (метаданные должны быть просто именным экспортом) и добавили тип PageProps
export async function generateMetadata({ params }: PageProps) {
    const resolvedParams = await params;
    const directionSlug = resolvedParams['direction-slug'];

    const direction = await db.direction.findUnique({
        where: { slug: directionSlug },
        select: { title: true, h1: true } // Оптимизировали запрос, выбрав только нужные для SEO поля
    });

    if (!direction) return {};

    return {
        title: `${direction.title} — Врачи клиники`,
        description: `Специалисты направления ${direction.title}. Запись на прием.`,
    };
}

// 3. Добавили основной компонент страницы, который принимает те же PageProps
export default async function DirectionDoctorsPage({ params }: PageProps) {
    const resolvedParams = await params;
    const directionSlug = resolvedParams['direction-slug'];

    const direction = await db.direction.findUnique({
        where: { slug: directionSlug },
        include: {
            doctors: {
                orderBy: { name: 'asc' }
            }
        }
    });

    if (!direction) notFound();

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Врачи", href: "/doctors" },
        { label: direction.title }
    ];

    return (
        <main className="container mx-auto max-w-7xl px-4 py-10 space-y-12">
            {/* Хлебные крошки */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Заголовок страницы направления */}
            <div className="max-w-3xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Медицинский штат
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Специалисты отделения: {direction.title}
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                    В данном медицинском отделении Клиники Вербенкина в Зеленограде прием ведут сертифицированные специалисты с многолетним практическим стажем.
                </p>
            </div>

            {/* СЕТКА КАРТОЧЕК ВРАЧЕЙ: ИСПРАВЛЕНО — БЕЗ ЖЁСТКИХ ГРАНИЦ С МЯГКИМИ ТЕНЯМИ */}
            {direction.doctors.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-3xl shadow-xs">
                    <p className="text-sm text-slate-400">График приема специалистов данного отделения находится на стадии формирования.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {direction.doctors.map((doc) => (
                        <Link
                            key={doc.id}
                            href={`/doctors/${direction.slug}/${doc.slug}`}
                            className="group block bg-white rounded-3xl shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden"
                        >
                            {/* Заглушка под фото специалиста (Обводка border убрана) */}
                            <div className="aspect-[4/3] w-full bg-slate-50 flex items-center justify-center text-slate-300 font-medium text-xs select-none">
                                Фото специалиста
                            </div>

                            {/* Текстовая анкета врача внутри плитки */}
                            <div className="p-6 space-y-2">
                                <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
                                    {doc.name}
                                </h3>
                                <p className="text-xs font-bold text-blue-600">
                                    {doc.specialty}
                                </p>

                                {/* Вывод стажа, если он больше нуля */}
                                {doc.experienceYears > 0 && (
                                    <p className="text-[11px] font-semibold text-slate-400 pt-1">
                                        Стаж работы: {doc.experienceYears} {
                                            doc.experienceYears % 10 === 1 && doc.experienceYears % 100 !== 11
                                                ? 'год'
                                                : [2, 3, 4].includes(doc.experienceYears % 10) && ![12, 13, 14].includes(doc.experienceYears % 100)
                                                    ? 'года'
                                                    : 'лет'
                                        }
                                    </p>
                                )}

                                <p className="text-xs text-slate-500 font-light line-clamp-3 pt-2 leading-relaxed">
                                    {doc.biography}
                                </p>

                                <div className="pt-4 flex items-center justify-between text-xs font-bold text-blue-600 border-t border-slate-50 mt-2">
                                    <span>Дипломы и аккредитация</span>
                                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Обязательный медицинский дисклеймер */}
            <MedicalDisclaimer />
        </main>
    );
}
