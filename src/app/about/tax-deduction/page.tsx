import { type Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";
import {
    FileText,
    CheckCircle2,
    HelpCircle,
    Info
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Налоговый вычет за медицинские услуги | Клиника Вербенкина",
    description: "Инструкция по оформлению налогового вычета (НДФЛ 13%) за лечение и медицинские услуги в Клинике Вербенкина в Зеленограде. Перечень необходимых документов и порядок получения справки.",
};

const STEPS = [
    {
        num: "01",
        title: "Соберите чеки",
        desc: "Сохраняйте кассовые чеки и договоры об оказании платных медицинских услуг после каждого визита в клинику."
    },
    {
        num: "02",
        title: "Закажите справку",
        desc: "Обратитесь к администратору любого филиала нашей клиники или оставьте заявку на получение справки об оплате медицинских услуг для налоговых органов."
    },
    {
        num: "03",
        title: "Подайте декларацию",
        desc: "Заполните декларацию 3-НДФЛ в личном кабинете налогоплательщика на сайте nalog.ru и прикрепите скан-копии документов."
    }
];

export default function TaxDeductionPage() {
    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "О клинике", href: "/about" },
        { label: "Налоговый вычет" }
    ];

    return (
        <main className="min-h-screen bg-slate-50/30 pt-24 pb-16 font-sans">
            <div className="container mx-auto max-w-4xl px-4 space-y-10">
                {/* Хлебные крошки */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Шапка страницы */}
                <div className="max-w-2xl space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 select-none">
                        Пациентам
                    </span>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Возврат налогового вычета
                    </h1>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                        Вы можете вернуть 13% от стоимости лечения, диагностики и анализов, оплаченных в Клинике Вербенкина. Налоговый вычет предоставляется гражданам РФ, имеющим официальный доход и уплачивающим НДФЛ.
                    </p>
                </div>

                {/* Карточка-инфобокс */}
                <div className="bg-blue-50/50 border border-blue-100/70 p-6 rounded-3xl flex gap-4 items-start">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold text-blue-900">Важная информация</h3>
                        <p className="text-xs text-blue-700 font-normal leading-relaxed">
                            Вычет можно оформить как за своё собственное лечение, так и за лечение супруга (супруги), родителей, а также детей в возрасте до 18 лет (или до 24 лет, если они обучаются очно).
                        </p>
                    </div>
                </div>

                {/* Пошаговый процесс */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Порядок получения вычета:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {STEPS.map((step) => (
                            <div key={step.num} className="bg-white p-6 rounded-3xl shadow-3xs space-y-4 relative overflow-hidden">
                                <span className="absolute top-2 right-4 text-4xl font-black text-slate-100/70 select-none">
                                    {step.num}
                                </span>
                                <h3 className="text-sm font-bold text-slate-900 pt-2">{step.title}</h3>
                                <p className="text-xs text-slate-400 font-light leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Список документов */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-3xs space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Документы от клиники:</h2>
                    <p className="text-xs text-slate-500 font-light">Для налоговой инспекции мы подготавливаем полный комплект документов:</p>
                    <ul className="space-y-3">
                        {[
                            "Справка об оплате медицинских услуг установленного образца;",
                            "Копия лицензии нашей медицинской организации на осуществление медицинской деятельности;",
                            "Копия договора об оказании платных медицинских услуг (при необходимости)."
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-4 border-t border-slate-50">
                        <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                            Срок подготовки справки составляет от 3 до 7 рабочих дней. Для оформления при себе необходимо иметь ИНН налогоплательщика (того, кто будет получать вычет) и паспорт.
                        </p>
                    </div>
                </div>

                {/* Обязательный медицинский дисклеймер */}
                <div className="pt-4">
                    <MedicalDisclaimer />
                </div>
            </div>
        </main>
    );
}
