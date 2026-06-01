import { type Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "~/components/shared/breadcrumbs"; // ✅ Исправлено на строчные
import MedicalDisclaimer from "~/components/shared/medical-disclaimer"; // ✅ Исправлено на строчные

export const dynamic = "force-dynamic";

// Локальное SEO для юридического хаба клиники (ИСПРАВЛЕНО под роут /about)
export const metadata: Metadata = {
    title: "Правовая информация и документы | Клиника Вербенкина",
    description: "Официальная правовая информация многопрофильного медицинского центра Клиника Вербенкина в Зеленограде. Политика конфиденциальности, условия оказания медицинских услуг, выписка из ЕГРЮЛ и прейскурант.",
    alternates: {
        canonical: "https://kvdoc.ru",
    }
};

const LEGAL_DOCUMENTS = [
    {
        slug: "privacy",
        title: "Политика конфиденциальности",
        description: "Официальное положение об обработке, хранении и защите персональных данных пациентов в соответствии с ФЗ-152.",
        icon: "📄",
        href: "/privacy" // Ссылка ведет на встроенную страницу сайта
    },
    {
        slug: "rules",
        title: "Условия и порядок предоставления медицинских услуг",
        description: "Правила внутреннего распорядка, права и обязанности граждан Российской Федерации в сфере охраны здоровья.",
        icon: "⚖️",
        href: "/legal/rules.pdf"
    },
    {
        slug: "egryul",
        title: "Выписка из ЕГРЮЛ",
        description: "Официальные регистрационные и налоговые сведения об организации ООО «ВЕРБМЕД» из реестра ФНС РФ.",
        icon: "🏢",
        href: "/legal/egryul.pdf"
    },
    {
        slug: "price-list",
        title: "Прейскурант услуг и цены",
        description: "Полный утвержденный прейскурант платных медицинских услуг центра с подписью руководства и печатью.",
        icon: "₽",
        href: "/legal/price-list.pdf" // ИСПРАВЛЕНО: Теперь ведет на скачивание/просмотр официального PDF-файла
    }
];

export default function PravovayaInformaciyaPage() {
    // ИСПРАВЛЕНО: Ссылки хлебных крошек синхронизированы с папкой /about
    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "О клинике", href: "/about" },
        { label: "Правовая информация" }
    ];

    return (
        <main className="container mx-auto max-w-7xl px-4 py-10 space-y-12 select-none">
            {/* Хлебные крошки */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Заголовок страницы с бейджем в едином стиле */}
            <div className="max-w-2xl space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-600">
                    Документы центра
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                    Правовая информация
                </h1>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                    В данном разделе опубликованы официальные нормативно-правовые документы, лицензии и регламенты, на основании которых ООО «ВЕРБМЕД» осуществляет медицинскую деятельность.
                </p>
            </div>

            {/* СЕТКА ЮРИДИЧЕСКИХ ДОКУМЕНТОВ ПО МАКЕТУ: БЕЗ РАМОК, НА ПАРЯЩИХ ТЕНЯХ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LEGAL_DOCUMENTS.map((doc) => (
                    <a
                        key={doc.slug}
                        href={doc.href}
                        target={doc.href.endsWith(".pdf") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="group block bg-white p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden min-h-[160px] flex flex-col justify-between"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                {/* Круглая контурная подложка под иконку из макета в фирменных тонах */}
                                <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-700 font-black flex items-center justify-center text-lg shadow-3xs group-hover:scale-105 transition-transform group-hover:bg-blue-50 group-hover:text-blue-600">
                                    {doc.icon}
                                </div>
                                {/* Стрелочка-индикатор перехода */}
                                <span className="text-xs font-bold text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                                    Открыть →
                                </span>
                            </div>

                            <div className="space-y-1.5">
                                <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase leading-snug">
                                    {doc.title}
                                </h3>
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed line-clamp-2">
                                    {doc.description}
                                </p>
                            </div>
                        </div>

                        {/* Тонкий нижний визуальный маркер типа файла */}
                        <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest pt-4 mt-2 border-t border-slate-50 select-none">
                            {doc.href.endsWith(".pdf") ? "Документ PDF" : "Раздел сайта"}
                        </div>
                    </a>
                ))}
            </div>

            {/* Блок с лицензией для Роспотребнадзора внизу хаба */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2 space-y-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Сведения о лицензировании</h3>
                    <p className="text-sm font-bold text-slate-800">Лицензия № Л041-01137-77/00336955</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                        Выдана Департаментом здравоохранения города Москвы на осуществление медицинской деятельности. Копии бланков лицензий и приложений к ним также доступны для ознакомления на информационных стендах в холлах обоих филиалов клиники.
                    </p>
                </div>
                <div className="lg:col-span-1 flex lg:justify-end">
                    <Link
                        href="/about/licenses"
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs text-center whitespace-nowrap w-full lg:w-auto"
                    >
                        Смотреть лицензии МО →
                    </Link>
                </div>
            </div>

            {/* Обязательный медицинский дисклеймер */}
            <MedicalDisclaimer />
        </main>
    );
}
