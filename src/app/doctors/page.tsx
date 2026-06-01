import { type Metadata } from "next";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";

export const dynamic = "force-dynamic";

// SEO-оптимизация главной страницы каталога специалистов
export const metadata: Metadata = {
    title: "Врачи и медицинские специалисты | Клиника Вербенкина",
    description: "Официальный реестр врачей и медицинского персонала Клиники Вербенкина в Зеленограде. Информация о квалификации, стаже работы и дипломах специалистов по всем направлениям приема.",
    alternates: {
        canonical: "https://kvdoc.ru",
    }
};

export default async function AllDoctorsPage() {
    // Извлекаем все направления клиники и количество привязанных к ним врачей
    const directions = await db.direction.findMany({
        include: {
            _count: {
                select: { doctors: true }
            }
        },
        orderBy: { title: "asc" }
    });

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Врачи" }
    ];

    return (
        <main className="container mx-auto max-w-7xl px-4 py-10 space-y-12">
            {/* Хлебные крошки */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Заголовок и вводный текст каталога специалистов */}
            <div className="max-w-3xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Медицинский штат
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Наши врачи и специалисты
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                    Выберите интересующее вас медицинское направление, чтобы ознакомиться со списком ведущих прием специалистов, их профессиональным стажем, образованием и действующими аккредитациями Минздрава РФ.
                </p>
            </div>

            {/* СЕТКА НАПРАВЛЕНИЙ ШТАТА: ИСПРАВЛЕНО — БЕЗ РАМОК С МЯГКИМИ ПАРАЛЛЕЛЬНЫМИ ТЕНЯМИ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {directions.map((dir) => (
                    <Link
                        key={dir.id}
                        href={`/doctors/${dir.slug}`}
                        className="group block bg-white p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-200"
                    >
                        <div className="flex flex-col justify-between h-32">
                            <div className="space-y-1.5">
                                {/* Декоративный мини-акцент отделения по дизайну хедера */}
                                <div className="w-6 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                                {/* Название отделения */}
                                <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors pt-1">
                                    {dir.title}
                                </h3>
                            </div>

                            {/* Техническая плашка количества врачей внутри направления */}
                            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pt-2">
                                <span>
                                    {dir._count.doctors > 0
                                        ? `${dir._count.doctors} специалистов`
                                        : "Штат укомплектовывается"}
                                </span>
                                <span className="text-blue-500 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                                    Смотреть врачей →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Обязательный медицинский дисклеймер */}
            <MedicalDisclaimer />
        </main>
    );
}
