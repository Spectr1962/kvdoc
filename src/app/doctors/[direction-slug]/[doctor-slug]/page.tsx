import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/Breadcrumbs";
import MedicalDisclaimer from "~/components/shared/MedicalDisclaimer";
import { type Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{
        directionSlug: string;
        doctorSlug: string;
    }>;
}

// Автоматическая генерация динамических метаданных и канонических URL для поисковых систем (Яндекс, Google)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const doctorSlug = resolvedParams?.doctorSlug;

    if (!doctorSlug) return {};

    const doctor = await db.doctor.findFirst({
        where: { slug: doctorSlug },
        select: { name: true, specialty: true }
    });

    if (!doctor) return {};

    return {
        title: `${doctor.name} | ${doctor.specialty} Клиники Вербенкина`,
        description: `Официальная страница врача клиники Вербенкина в Зеленограде: ${doctor.name}. Информация о квалификации, стаже работы, отзывы и онлайн-запись на прием.`,
        alternates: {
            canonical: `https://kvdoc.ru{resolvedParams.directionSlug}/${doctorSlug}`,
        }
    };
}

export default async function DoctorDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const directionSlug = resolvedParams?.directionSlug;
    const doctorSlug = resolvedParams?.doctorSlug;

    if (!doctorSlug) notFound();

    // Основной поиск врача в базе данных по его текстовому слагу
    let doctor = await db.doctor.findFirst({
        where: { slug: doctorSlug }
    });

    // Запасной умный поиск по фамилии, если слаг в СУБД пустой или записан иначе
    if (!doctor) {
        const lastNameSegment = doctorSlug.split("-")[0];
        if (lastNameSegment) {
            doctor = await db.doctor.findFirst({
                where: {
                    name: {
                        contains: lastNameSegment,
                        mode: 'insensitive'
                    }
                }
            });
        }
    }

    if (!doctor) notFound();

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Наши врачи", href: "/doctors" },
        { label: doctor.name }
    ];

    return (
        <main className="container mx-auto max-w-7xl px-4 py-10 space-y-12 select-none">
            {/* Навигационные хлебные крошки */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* ДВУХКОЛОНОЧНЫЙ ЖУРНАЛЬНЫЙ МАКЕТ КАРТОЧКИ ВРАЧА */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* ЛЕВАЯ КОЛОНКА (4 из 12): Парящее фото доктора и кнопка записи */}
                <div className="lg:col-span-4 bg-white p-4 rounded-3xl shadow-xs space-y-4">
                    <div className="relative w-full aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden shadow-3xs">
                        {doctor.image ? (
                            <Image
                                src={doctor.image}
                                alt={doctor.name}
                                fill
                                className="object-cover"
                                sizes="(max-w-7xl) 33vw"
                                priority
                            />
                        ) : (
                            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider text-center p-4 h-full flex items-center justify-center">
                                Фото специалиста
                            </div>
                        )}
                    </div>

                    <a
                        href="#contacts"
                        className="block w-full text-center px-6 py-3.5 text-white text-xs font-black tracking-wide rounded-xl shadow-lg hover:scale-102 hover:shadow-indigo-500/20 transition-all duration-200 uppercase"
                        style={{
                            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #3b82f6 100%)"
                        }}
                    >
                        Записаться на прием
                    </a>
                </div>

                {/* ПРАВАЯ КОЛОНКА (8 из 12): Профессиональное портфолио доктора */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 shadow-xs space-y-6">

                    <div className="space-y-2 border-b border-slate-100 pb-5">
                        {/* ИСПРАВЛЕНО: Английское слово заменено на русское, отключен агрессивный uppercase */}
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-600 tracking-wide select-none">
                            Действующий специалист центра
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 pt-1">
                            {doctor.name}
                        </h1>

                        {/* СТИЛИЗАЦИЯ ИСПРАВЛЕНА: Название специальности переведено в мягкий регистр и окрашено в индиго */}
                        <p className="text-sm font-semibold text-indigo-600/90 tracking-wide pt-0.5">
                            {doctor.specialty.charAt(0).toUpperCase() + doctor.specialty.slice(1).toLowerCase()}
                        </p>
                    </div>

                    {/* Описание регалий на глобальном контрастном токене medical-description */}
                    <div className="space-y-3">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest select-none">
                            О специалисте
                        </h2>
                        <div className="medical-description text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                            {doctor.bio || "Врач высшей квалификационной категории многопрофильного медицинского центра Клиника Вербенкина. Обладает многолетним опытом успешного амбулаторного лечения, регулярно проходит курсы повышения квалификации на базе ведущих медицинских академий и подтверждает аккредитацию Минздрава РФ."}
                        </div>
                    </div>

                    {/* Информационные плашки */}
                    <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-500 leading-relaxed">
                        <div className="p-4 bg-slate-50/60 rounded-2xl space-y-1.5">
                            <span className="font-bold text-slate-800 text-xs block select-none">🗓️ График приёма</span>
                            <span className="text-slate-600 font-medium leading-relaxed block text-[11px]">
                                Дни приема и точные часы работы специалиста уточняйте по телефонам единой регистратуры клиники.
                            </span>
                        </div>
                        <div className="p-4 bg-slate-50/60 rounded-2xl space-y-1.5">
                            <span className="font-bold text-slate-800 text-xs block select-none">🏥 Адрес приема</span>
                            <span className="text-slate-600 font-medium leading-relaxed block text-[11px]">
                                г. Зеленоград, корпус 1824. Процедурные кабинеты Клиники Вербенкина.
                            </span>
                        </div>
                    </div>

                </div>

            </div>

            {/* Обязательный медицинский дисклеймер Минздрава */}
            <MedicalDisclaimer />
        </main>
    );
}
