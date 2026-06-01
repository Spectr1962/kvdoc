import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/Breadcrumbs";
import MedicalDisclaimer from "~/components/shared/MedicalDisclaimer";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ directionSlug: string; serviceSlug: string }>;
}

export default async function ServicePage({ params }: PageProps) {
    const resolvedParams = await params;
    const directionSlug = resolvedParams?.directionSlug;
    const serviceSlug = resolvedParams?.serviceSlug;

    if (!serviceSlug) notFound();

    // Ищем услугу без жесткой привязки к регистру или опечаткам
    const service = await db.medicalService.findFirst({
        where: {
            slug: {
                equals: serviceSlug,
                mode: 'insensitive'
            }
        },
        include: {
            direction: {
                select: { title: true, slug: true, id: true }
            },
            subdirection: {
                select: { title: true, slug: true }
            }
        }
    });

    // ЭКРАН ОТЛАДКИ: Если база вернула null, выводим что мы искали
    if (!service) {
        return (
            <div className="container mx-auto p-10 bg-red-50 border border-red-200 rounded-xl mt-10 space-y-2">
                <h1 className="text-xl font-bold text-red-700">Услуга не найдена в базе данных</h1>
                <p className="text-sm text-slate-700">Вы искали слаг услуги: <strong className="bg-white px-2 py-0.5 border rounded text-red-600">{serviceSlug}</strong></p>
                <p className="text-xs text-slate-500 font-medium">Проверьте, совпадает ли он со ссылкой со страницы отделения.</p>
            </div>
        );
    }

    // Находим врачей
    const relevantDoctors = await db.doctor.findMany({
        where: {
            directions: {
                some: { id: service.direction.id }
            }
        },
        select: { id: true, name: true, specialty: true, slug: true }
    });

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Услуги", href: "/services" },
        { label: service.direction.title, href: `/services/${service.direction.slug}` },
    ];

    if (service.subdirection) {
        breadcrumbItems.push({
            label: service.subdirection.title,
            href: `/services/${service.direction.slug}`
        });
    }

    breadcrumbItems.push({ label: service.title });


    return (
        <main className="container mx-auto px-4 py-10 space-y-12">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Левая колонка (2/3): Подробная медицинская и коммерческая информация */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Главная карточка услуги */}
                    <div className="bg-white rounded-2xl border border-slate-150/80 p-6 md:p-8 space-y-6 shadow-xs">
                        <div className="space-y-2">
                            {service.subdirection && (
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                                    {service.subdirection.title}
                                </span>
                            )}
                            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                                {service.title}
                            </h1>
                        </div>

                        {/* Блок стоимости и записи */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="space-y-0.5">
                                <span className="text-xs text-slate-500 font-medium">Стоимость процедуры:</span>
                                <div className="text-2xl font-black text-slate-950">
                                    {service.price.toLocaleString("ru-RU")} ₽
                                </div>
                            </div>
                            <a
                                href="#contacts"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm text-center shadow-xs transition"
                            >
                                Записаться на прием
                            </a>
                        </div>

                        {/* Описание услуги (YMYL фактор) */}
                        <div className="space-y-3 pt-2">
                            <h2 className="text-lg font-bold text-slate-900">Описание медицинской услуги</h2>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {service.description || "Описание процедуры находится в процессе обновления. Подробную информацию о порядке проведения, подготовке и длительности манипуляции вы можете получить у администраторов клиники по телефону регистратуры."}
                            </p>
                        </div>
                    </div>

                    {/* Клинические факторы (Показания и Противопоказания) — важнейшее требование для E-E-A-T */}
                    {(service.indications || service.contraindications) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {service.indications && (
                                <div className="bg-white rounded-2xl border border-slate-150/80 p-6 space-y-3 shadow-xs">
                                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        Показания к проведению
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                        {service.indications}
                                    </p>
                                </div>
                            )}

                            {service.contraindications && (
                                <div className="bg-white rounded-2xl border border-slate-150/80 p-6 space-y-3 shadow-xs border-l-4 border-l-amber-500">
                                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 text-amber-800">
                                        Важные противопоказания
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                        {service.contraindications}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Правая колонка (1/3): Врачи, выполняющие данную услугу */}
                <div className="lg:col-span-1 space-y-6">
                    <div
                        className="p-6 rounded-2xl border border-slate-800 space-y-4 shadow-md text-white"
                        style={{
                            background: 'linear-gradient(to bottom, #0f172a, #172554, #0f172a)',
                            color: '#ffffff'
                        }}
                    >
                        <h3 className="text-lg font-bold tracking-tight">Кто проводит процедуру</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Манипуляцию выполняют профильные специалисты медицинского центра КВ-ДОК в Зеленограде:
                        </p>

                        <div className="space-y-3 pt-2">
                            {relevantDoctors.length === 0 ? (
                                <p className="text-xs italic" style={{ color: '#94a3b8' }}>Информация обновляется.</p>
                            ) : (
                                relevantDoctors.map((doc) => (
                                    <Link
                                        key={doc.id}
                                        href={`/doctors/${doc.slug}`}
                                        className="block p-4 rounded-xl border border-white/10 transition-all duration-200 group"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    >
                                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {doc.name}
                                        </h4>
                                        <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                                            {doc.specialty}
                                        </p>
                                        <span className="text-[11px] text-blue-400 font-bold mt-3 inline-block group-hover:translate-x-0.5 transition-transform">
                                            Записаться к доктору →
                                        </span>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <MedicalDisclaimer />
        </main>
    );
}
