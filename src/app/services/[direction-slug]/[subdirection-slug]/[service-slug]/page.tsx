import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/Breadcrumbs";
import MedicalDisclaimer from "~/components/shared/MedicalDisclaimer";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{
        directionSlug: string;
        subdirectionSlug: string;
        serviceSlug: string;
    }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const directionSlug = resolvedParams?.directionSlug;
    const subdirectionSlug = resolvedParams?.subdirectionSlug;
    const serviceSlug = resolvedParams?.serviceSlug;

    if (!serviceSlug || !directionSlug || !subdirectionSlug) notFound();

    const service = await db.medicalService.findUnique({
        where: { slug: serviceSlug },
        select: {
            id: true,
            slug: true,
            title: true,
            price: true,
            description: true,
            doctorId: true,
            direction: { select: { title: true, slug: true } },
            subdirection: { select: { title: true, slug: true } }
        }
    });

    if (!service) notFound();

    let relevantDoctors: any[] = [];

    if (service.doctorId) {
        const personalDoctor = await db.doctor.findUnique({
            where: { id: service.doctorId },
            select: { id: true, name: true, specialty: true, slug: true }
        });
        if (personalDoctor) {
            relevantDoctors = [personalDoctor];
        }
    } else {
        const directionData = await db.direction.findUnique({
            where: { slug: directionSlug },
            include: {
                doctors: { select: { id: true, name: true, specialty: true, slug: true } }
            }
        });
        relevantDoctors = directionData?.doctors || [];
    }

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Услуги", href: "/services" },
        { label: service.direction.title, href: `/services/${directionSlug}` },
        { label: service.title }
    ];

    return (
        <main className="container mx-auto px-4 py-10 space-y-12">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Левая колонка (2/3): Карточки описания услуги без рамок с тенями */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                    <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            {service.subdirection?.title || "Медицинская услуга"}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                            {service.title}
                        </h1>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between gap-6">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Стоимость процедуры:</p>
                            <p className="text-2xl font-black text-slate-900 mt-0.5">{service.price.toLocaleString("ru-RU")} ₽</p>
                        </div>
                        <a href="#contacts" className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-xs transition">
                            Записаться на прием
                        </a>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                        <h2 className="text-base font-bold text-slate-900">Описание медицинской услуги</h2>
                        <p className="text-sm text-slate-600 leading-relaxed font-light">
                            {service.description || "Описание процедуры находится в процессе обновления. Подробную информацию вы можете получить у администраторов Клиники Вербенкина по телефону регистратуры."}
                        </p>
                    </div>
                </div>

                {/* Правая колонка (1/3): Блок "Кто проводит процедуру" без рамок с тенями */}
                <div className="lg:col-span-1 space-y-6">
                    <div
                        className="p-6 rounded-3xl shadow-md space-y-4 text-white"
                        style={{ background: 'linear-gradient(to bottom, #0f172a, #172554, #0f172a)' }}
                    >
                        <h3 className="text-sm font-black uppercase tracking-wider text-blue-400">Кто проводит процедуру</h3>

                        <div className="space-y-3 pt-1">
                            {relevantDoctors.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">Информация обновляется</p>
                            ) : (
                                relevantDoctors.map((doc) => (
                                    <Link
                                        key={doc.id}
                                        href={`/doctors/${directionSlug}/${doc.slug}`}
                                        className="block p-4 rounded-2xl transition group bg-white/5 hover:bg-white/10"
                                    >
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                                                {doc.name}
                                            </h4>
                                            <p className="text-[11px] text-slate-300 line-clamp-2 leading-normal font-light">
                                                {doc.specialty}
                                            </p>
                                        </div>
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
