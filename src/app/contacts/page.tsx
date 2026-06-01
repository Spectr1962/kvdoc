import { type Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";
import ContactForm from "~/components/shared/contact-form"; // строго маленькими буквами

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Адреса филиалов и контакты | Клиника Вербенкина",
    description: "Контакты и режим работы филиалов Клиники Вербенкина в Зеленограде.",
    alternates: { canonical: "https://kvdoc.ru" }
};

export default function ContactsPage() {
    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Контакты" }
    ];

    return (
        <main className="container mx-auto max-w-7xl px-4 py-10 space-y-12">
            <Breadcrumbs items={breadcrumbItems} />

            {/* Заголовок страницы */}
            <div className="max-w-2xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Многопрофильный медицинский центр
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Наши филиалы в Зеленограде
                </h1>
            </div>

            {/* СЕТКА ФИЛИАЛОВ: БЕЗ РАМОК С ЛЕГКИМИ ТЕНЯМИ */}
            <div className="space-y-8">

                {/* --- КАРТОЧКА ФИЛИАЛА №1 --- */}
                <div className="bg-white rounded-3xl shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-3 transition-shadow duration-300 hover:shadow-lg">

                    {/* Квадратный блок под карту-схему (Рамка border-r убрана) */}
                    <div className="relative w-full aspect-square bg-slate-50 overflow-hidden lg:col-span-1">
                        <Image
                            src="/filial1.png"
                            alt="Схема проезда — Филиал №1"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                            Филиал 1
                        </div>
                    </div>

                    {/* Текстовый контент (Разделители линий убраны или заменены на отступы) */}
                    <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 lg:col-span-2">
                        <div className="space-y-5">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Филиал №1</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Адрес:</h4>
                                    <p className="font-semibold text-slate-800 leading-relaxed text-sm">
                                        г. Зеленоград, ул. Георгиевский проспект, д. 37, корп. 3
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">График работы:</h4>
                                    <p className="font-semibold text-slate-800 leading-relaxed text-sm">
                                        пн-пт: <span className="text-slate-950 font-bold">07:30 - 18:00</span><br />
                                        сб-вс: <span className="text-slate-950 font-bold">08:00 - 17:00</span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Услуги:</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-600 font-medium pl-1">
                                    <li>• анализы и процедурный кабинет</li>
                                    <li>• гинекология (детская/взрослая)</li>
                                    <li>• эндокринология</li>
                                    <li>• узи</li>
                                    <li>• неврология</li>
                                    <li>• функциональная диагностика</li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                            <a href="tel:+74951222178" className="text-sm font-black text-blue-600 hover:text-blue-700 transition">
                                +7 (495) 122-21-78
                            </a>
                            <a
                                href="https://yandex.ru" target="_blank" rel="noopener noreferrer"
                                className="px-6 h-10 bg-[#111c44] hover:bg-[#1a2963] text-white text-xs font-bold rounded-full shadow-xs transition flex items-center justify-center whitespace-nowrap"
                            >
                                Проложить маршрут
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- КАРТОЧКА ФИЛИАЛА №2 --- */}
                <div className="bg-white rounded-3xl shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-3 transition-shadow duration-300 hover:shadow-lg">

                    {/* Квадратный блок под карту-схему */}
                    <div className="relative w-full aspect-square bg-slate-50 overflow-hidden lg:col-span-1">
                        <Image
                            src="/filial2.png"
                            alt="Схема проезда — Филиал №2"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                            Филиал 2
                        </div>
                    </div>

                    {/* Текстовый контент */}
                    <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 lg:col-span-2">
                        <div className="space-y-5">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Филиал №2</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Адрес:</h4>
                                    <p className="font-semibold text-slate-800 leading-relaxed text-sm">
                                        г. Зеленоград, ул. Георгиевский проспект, д. 37, корп. 3
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">График работы:</h4>
                                    <p className="font-semibold text-slate-800 leading-relaxed text-sm">
                                        пн-вс: <span className="text-indigo-600 font-black">10:00 - 20:00</span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Услуги:</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-600 font-medium pl-1">
                                    <li>• дерматология (детская/взрослая)</li>
                                    <li>• косметология</li>
                                    <li>• трихология (детская/взрослая)</li>
                                    <li>• терапия</li>
                                    <li>• аллергология/иммунология (детская/взрослая)</li>
                                    <li>• эндокринология</li>
                                    <li>• массаж</li>
                                    <li>• гастроэнтерология (детская/взрослая)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                            <a href="tel:+74951222178" className="text-sm font-black text-blue-600 hover:text-blue-700 transition">
                                +7 (495) 122-21-78
                            </a>
                            <a
                                href="https://yandex.ru" target="_blank" rel="noopener noreferrer"
                                className="px-6 h-10 bg-[#111c44] hover:bg-[#1a2963] text-white text-xs font-bold rounded-full shadow-xs transition flex items-center justify-center whitespace-nowrap"
                            >
                                Проложить маршрут
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Форма обратной связи */}
            <ContactForm />

            {/* Юридический реестр без рамок с легкой тенью */}
            <div className="bg-white rounded-2xl shadow-xs p-6 text-xs text-slate-500 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                    <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Организация</p>
                    <p className="font-bold text-slate-800 pt-0.5">ООО "ВЕРБМЕД"</p>
                    <p>ИНН: 8603243520 / ОГРН: 1218600004510</p>
                </div>
                <div className="md:col-span-2 space-y-1">
                    <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Лицензирование</p>
                    <p className="text-slate-600 leading-relaxed pt-0.5">
                        Лицензия № Л041-01137-77/00336955 на осуществление медицинской деятельности, выданная Департаментом здравоохранения города Москвы. Действует бессрочно.
                    </p>
                </div>
            </div>

            <MedicalDisclaimer />
        </main>
    );
}
