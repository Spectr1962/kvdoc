'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Send, Eye, ChevronDown } from "lucide-react";


interface SubdirectionItem {
    id: string;
    slug: string;
    title: string;
}

interface DoctorItem {
    id: string;
    slug: string;
    shortName: string;
}

interface DirectionItem {
    id: string;
    slug: string;
    title: string;
    subdirections: SubdirectionItem[];
    doctors: DoctorItem[];
}

interface MediaItem {
    id: string;
    slug: string;
    title: string;
}

interface MediacentreMenuData {
    news: MediaItem[];
    articles: MediaItem[];
}

interface NavigationState {
    directions: DirectionItem[];
    mediacentre: MediacentreMenuData;
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [menuData, setMenuData] = useState<NavigationState>({
        directions: [],
        mediacentre: { news: [], articles: [] }
    });

    const pathname = usePathname();

    // ИСПРАВЛЕНО: Безопасное считывание структуры меню хедера через API-канал
    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch('/api/navigation');
                if (response.ok) {
                    const data = await response.json();
                    setMenuData(data);
                }
            } catch (err) {
                console.error("Ошибка загрузки мега-меню хедера:", err);
            }
        };

        void fetchMenuData();
        setIsOpen(false);
    }, [pathname]);

    const isMainPage = pathname === "/";
    return (
        <header className={`w-full z-50 select-none left-0 top-0 transition-all duration-150 ${isMainPage ? "absolute h-0 pt-6" : "relative h-24 pt-4"
            }`}>
            <div
                className="container mx-auto max-w-7xl h-16 rounded-full flex items-center justify-between px-6 shadow-xl relative transition-all duration-300"
                style={{
                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(79, 70, 229, 0.95) 40%, rgba(59, 130, 246, 0.95) 100%)",
                    backdropFilter: "blur(12px)",
                }}
            >

                {/* ИСПРАВЛЕНО: Утонченная навигация, шрифт text-[13px] font-semibold */}
                <nav className="hidden lg:flex items-center gap-6 text-white/90">

                    {/* БЛОК 1: О КЛИНИКЕ */}
                    <div className="relative group/nav py-4">
                        <Link href="/about" className="text-[13px] font-semibold tracking-wide flex items-center gap-1 hover:text-white transition-colors">
                            О клинике
                            <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover/nav:rotate-180 transition-transform duration-300 stroke-[2.5]" />
                        </Link>
                        <div className="absolute top-full left-0 mt-1 w-52 rounded-2xl bg-white p-2 shadow-xl text-slate-800 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-200 z-50">
                            <Link href="/about" className="block px-4 py-2.5 text-xs font-bold rounded-xl hover:bg-slate-50 hover:text-blue-600 transition">О центре</Link>
                            <Link href="/about/pravovaya-informaciya" className="block px-4 py-2.5 text-xs font-bold rounded-xl hover:bg-slate-50 hover:text-blue-600 transition">Правовая информация</Link>
                        </div>
                    </div>


                    {/* БЛОК 2: КАТАЛОГ МЕДИЦИНСКИХ УСЛУГ */}
                    <div className="relative group/nav py-4">
                        <Link href="/services" className="text-[13px] font-semibold tracking-wide flex items-center gap-1 hover:text-white transition-colors">
                            Услуги
                            <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover/nav:rotate-180 transition-transform duration-300 stroke-[2.5]" />
                        </Link>
                        <div className="absolute top-full left-0 mt-1 w-[768px] rounded-3xl bg-white p-6 shadow-2xl text-slate-800 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-200 z-50">
                            <div className="grid grid-cols-3 gap-x-6 gap-y-5 max-h-[420px] overflow-y-auto pr-2">
                                {menuData.directions.map((dir) => (
                                    <div key={dir.id} className="space-y-2">
                                        {/* Заголовок направления — убран кричащий капс CAPS */}
                                        <Link href={`/services/${dir.slug}`} className="block text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors leading-tight">
                                            {dir.title.charAt(0).toUpperCase() + dir.title.slice(1).toLowerCase()}
                                        </Link>
                                        {dir.subdirections.length > 0 && (
                                            <div className="space-y-1.5 pl-2 border-l border-slate-100 flex flex-col">
                                                {dir.subdirections.map((sub) => (
                                                    <Link
                                                        key={sub.id}
                                                        href={`/services/${dir.slug}#${sub.slug}`}
                                                        // ИСПРАВЛЕНО: Глубокий читаемый графитовый оттенок text-slate-600 font-semibold
                                                        className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors truncate"
                                                    >
                                                        • {sub.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* БЛОК 3: НАШИ ПРАКТИКУЮЩИЕ ВРАЧИ */}
                    <div className="relative group/nav py-4">
                        <Link href="/doctors" className="text-[13px] font-semibold tracking-wide flex items-center gap-1 hover:text-white transition-colors">
                            Врачи
                            <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover/nav:rotate-180 transition-transform duration-300 stroke-[2.5]" />
                        </Link>
                        <div className="absolute top-full left-0 mt-1 w-[768px] rounded-3xl bg-white p-6 shadow-2xl text-slate-800 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-200 z-50">
                            <div className="grid grid-cols-3 gap-x-6 gap-y-5 max-h-[440px] overflow-y-auto pr-2">
                                {menuData.directions.map((dir) => (
                                    <div key={dir.id} className="space-y-2">
                                        <Link href={`/doctors/${dir.slug}`} className="block text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors leading-tight">
                                            {dir.title.charAt(0).toUpperCase() + dir.title.slice(1).toLowerCase()}
                                        </Link>
                                        {dir.doctors && dir.doctors.length > 0 ? (
                                            <div className="space-y-1.5 pl-2 border-l border-slate-100 flex flex-col">
                                                {dir.doctors.map((doc) => (
                                                    <Link
                                                        key={doc.id}
                                                        href={`/doctors/${dir.slug}/${doc.slug}`}
                                                        // ИСПРАВЛЕНО: Высокая контрастность фамилий докторов text-slate-600 font-semibold
                                                        className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors truncate"
                                                    >
                                                        • {doc.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-[10px] text-slate-400 italic pl-2 font-medium">• Расписание формируется</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* БЛОК 4: ИНФОРМАЦИОННЫЙ МЕДИАЦЕНТР КЛИНИКИ */}
                    <div className="relative group/nav py-4">
                        <Link href="/mediacentre" className="text-[13px] font-semibold tracking-wide flex items-center gap-1 hover:text-white transition-colors">
                            Медиацентр
                            <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover/nav:rotate-180 transition-transform duration-300 stroke-[2.5]" />
                        </Link>
                        <div className="absolute top-full left-0 mt-1 w-[768px] rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-slate-800 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-200 z-50">
                            <div className="grid grid-cols-3 gap-6">

                                {/* 4.1. Раздел Свежих Новостей */}
                                <div className="space-y-3">
                                    <Link href="/mediacentre" className="block text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors leading-tight">
                                        1. Новости и события
                                    </Link>
                                    <div className="space-y-1.5 pl-2 border-l border-slate-100 flex flex-col">
                                        {menuData.mediacentre?.news?.length > 0 ? (
                                            menuData.mediacentre.news.map((item) => (
                                                <Link key={item.id} href={`/news/${item.slug}`} className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors truncate">
                                                    • {item.title}
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-[10px] text-slate-400 italic pl-2 font-medium">• Раздел обновляется</p>
                                        )}
                                    </div>
                                </div>

                                {/* 4.2. Раздел Акций и Спецпредложений */}
                                <div className="space-y-3">
                                    <Link href="/mediacentre" className="block text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors leading-tight">
                                        2. Акции и спецпредложения
                                    </Link>
                                    <div className="space-y-1.5 pl-2 border-l border-slate-100 flex flex-col">
                                        <Link href="/#promos" className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors truncate">• Комплексные чекапы УЗИ</Link>
                                        <Link href="/#promos" className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors truncate">• Скидки пенсионерам 15%</Link>
                                        <Link href="/#promos" className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors truncate">• Программа «День Рождения»</Link>
                                        <Link href="/#promos" className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors truncate">• Накопительная система 10%</Link>
                                    </div>
                                </div>

                                {/* 4.3. Раздел Экспертного Журнала Статей */}
                                <div className="space-y-3">
                                    <Link href="/mediacentre" className="block text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors leading-tight">
                                        3. Экспертный журнал
                                    </Link>
                                    <div className="space-y-1.5 pl-2 border-l border-slate-100 flex flex-col">
                                        {menuData.mediacentre?.articles?.length > 0 ? (
                                            menuData.mediacentre.articles.map((item) => (
                                                <Link key={item.id} href={`/blog/${item.slug}`} className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors truncate">
                                                    • {item.title}
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-[10px] text-slate-400 italic pl-2 font-medium">• Публикации готовятся</p>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                                <Link href="/mediacentre" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                    Открыть информационный хаб Клиники Вербенкина →
                                </Link>
                            </div>
                        </div>
                    </div>


                    <Link href="/contacts" className="text-[13px] font-semibold tracking-wide text-white/90 hover:text-white transition-colors">Контакты</Link>
                </nav>

                {/* ЦЕНТРАЛЬНЫЙ ЛОГОТИП */}
                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 block w-9 h-9 hover:scale-105 transition-transform">
                    <Image src="/logo.png" alt="Клиника Вербенкина" fill className="object-contain" priority />
                </Link>

                {/* ПРАВАЯ КНОПОЧНАЯ ГРУППА ДЕСКТОПА (Интеграция монохромных иконок Lucide) */}
                <div className="hidden lg:flex items-center gap-5 text-white">
                    <span className="text-sm font-semibold tracking-wide opacity-95">
                        +7 (495) 122-21-78
                    </span>

                    {/* Иконка Telegram */}
                    <a
                        href="https://t.me"
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-150 text-white"
                        title="Наш Telegram-канал"
                    >
                        <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>

                    {/* Иконка Правовой информации */}
                    <Link
                        href="/about/pravovaya-informaciya"
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-150 text-white"
                        title="Правовая информация"
                    >
                        <Eye className="w-4 h-4 stroke-[2]" />
                    </Link>

                    <a
                        href="#contacts"
                        className="px-5 h-9 bg-white text-slate-900 text-xs font-bold tracking-wide rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 hover:scale-102 transition-all duration-150"
                    >
                        Записаться на приём
                    </a>
                </div>


                {/* КНОПКА ГАМБУРГЕРА ДЛЯ МОБИЛЬНЫХ СМАРТФОНОВ */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden w-10 h-10 rounded-full bg-white/10 flex flex-col items-center justify-center gap-1 cursor-pointer focus:outline-hidden text-white"
                    aria-label="Открыть мобильное меню"
                >
                    <span className={`w-4 h-0.5 bg-current rounded-full transition-all duration-200 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                    <span className={`w-4 h-0.5 bg-current rounded-full transition-all duration-200 ${isOpen ? "opacity-0" : ""}`} />
                    <span className={`w-4 h-0.5 bg-current rounded-full transition-all duration-200 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </button>

                {/* ВЫЕЗЖАЮЩАЯ МОБИЛЬНАЯ ШТОРКА MENU ДЛЯ СМАРТФОНОВ */}
                <div className={`lg:hidden fixed inset-x-4 top-24 rounded-3xl bg-white p-6 shadow-2xl transition-all duration-300 transform border border-slate-100 flex flex-col gap-6 z-50 ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
                    }`}>
                    <div className="flex flex-col gap-4 font-bold text-slate-900 text-sm">
                        <Link href="/about" className="hover:text-blue-600 transition">О клинике</Link>
                        <Link href="/services" className="hover:text-blue-600 transition">Услуги и цены</Link>
                        <Link href="/doctors" className="hover:text-blue-600 transition">Наши врачи</Link>
                        <Link href="/mediacentre" className="hover:text-blue-600 transition">Медиацентр клиники</Link>
                        <Link href="/contacts" className="hover:text-blue-600 transition">Контакты и адреса</Link>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                        <span className="text-sm font-black text-slate-950 text-center">+7 (495) 122-21-78</span>
                        <a
                            href="#contacts"
                            onClick={() => setIsOpen(false)}
                            className="w-full h-11 text-white text-xs font-black tracking-wide rounded-xl shadow-lg flex items-center justify-center uppercase"
                            style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #3b82f6 100%)" }}
                        >
                            Запись на приём
                        </a>
                    </div>
                </div>

            </div>
        </header>
    );
}
