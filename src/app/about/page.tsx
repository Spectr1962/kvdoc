import { type Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";
import {
    FileText,
    Newspaper,
    Percent,
    Scale,
    ShieldAlert
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "О клинике | Медицинский центр Клиника Вербенкина",
    description: "Информация о многопрофильном медицинском центре Клиника Вербенкина в Зеленограде. Правовая информация, лицензии, новости, актуальные акции и программы налогового вычета для пациентов.",
};

const ABOUT_SECTIONS = [
    {
        title: "Правовая информация",
        description: "Официальные нормативно-правовые документы, лицензии Минздрава и регламенты деятельности ООО «ВЕРБМЕД».",
        href: "/about/pravovaya-informaciya",
        icon: <Scale className="w-5 h-5 text-blue-600" />,
        badge: "Лицензии"
    },
    {
        title: "Новости центра",
        description: "События клиники, изменения в графике работы в праздничные дни и отчеты о закупках нового оборудования.",
        href: "/about/news",
        icon: <Newspaper className="w-5 h-5 text-emerald-600" />,
        badge: "Пресс-служба"
    },
    {
        title: "Акции и спецпредложения",
        description: "Текущие сезонные скидки, комплексные программы чекапов и социальные предложения для всей семьи.",
        href: "/about/promo",
        icon: <Percent className="w-5 h-5 text-amber-600" />,
        badge: "Выгода"
    },
    {
        title: "Налоговый вычет",
        description: "Инструкция и пакет документов для оформления налогового вычета (НДФЛ) за медицинские услуги.",
        href: "/about/tax-deduction",
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        badge: "Пациентам"
    },
    {
        title: "Юридический регламент",
        description: "Условия оказания медицинской помощи, правила внутреннего распорядка и права граждан.",
        href: "/about/legal",
        icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
        badge: "Важно"
    }
];

export default function AboutPage() {
    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "О клинике" }
    ];

    return (
        <main className="min-h-screen bg-slate-50/30 pt-24 pb-16 font-sans">
            <div className="container mx-auto max-w-5xl px-4 space-y-10">
                {/* Хлебные крошки */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Заголовок */}
                <div className="max-w-2xl space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 select-none">
                        О медицинском центре
                    </span>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Информация о клинике
                    </h1>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                        Добро пожаловать в информационный хаб Клиники Вербенкина. Здесь собрана вся необходимая официальная, юридическая и справочная информация для пациентов нашего центра.
                    </p>
                </div>

                {/* Сетка со ссылками на подразделы раздела about */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ABOUT_SECTIONS.map((section) => (
                        <Link
                            key={section.href}
                            href={section.href}
                            className="group block bg-white p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                                    {section.icon}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                                    {section.badge}
                                </span>
                            </div>

                            <div className="mt-4 space-y-1">
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {section.title}
                                </h3>
                                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                                    {section.description}
                                </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-50 text-[11px] font-bold text-blue-600 flex items-center justify-end group-hover:translate-x-0.5 transition-transform">
                                Перейти в раздел →
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Обязательный дисклеймер */}
                <div className="pt-6">
                    <MedicalDisclaimer />
                </div>
            </div>
        </main>
    );
}
