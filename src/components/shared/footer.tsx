'use client';

import Link from "next/link";

const FOOTER_DIRECTIONS = [
    { href: "/services/[direction-slug]inekologiya", label: "Гинекология" },
    { href: "/services/[direction-slug]zi", label: "УЗИ диагностика" },
    { href: "/services/analizy", label: "Анализы и процедурный кабинет" },
    { href: "/services/[direction-slug]ermatologiya", label: "Дерматология" },
    { href: "/services/[direction-slug]rihologiya", label: "Трихология" },
    { href: "/services/allergologiya", label: "Аллергология и Иммунология" },
    { href: "/services/[direction-slug]ndokrinologiya", label: "Эндокринология" },
    { href: "/services/[direction-slug]astroenterologiya", label: "Гастроэнтерология" },
];

export default function Footer() {
    return (
        <footer className="w-full pt-10 pb-6 px-4 select-none bg-transparent mt-auto">
            <div
                className="container mx-auto max-w-7xl rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative"
                style={{
                    background: "linear-gradient(135deg, #111c44 0%, #0b112c 100%)",
                }}
            >

                {/* ВЕРХНЯЯ ЧАСТЬ: 4 КОЛОНКИ НАВИГАЦИИ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/5">

                    {/* Колонка 1: О клинике и Соцсети */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black uppercase tracking-wider text-indigo-400">
                            Клиника Вербенкина
                        </h3>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">
                            Многопрофильный медицинский центр экспертного уровня в Зеленограде. Профессиональная диагностика, лечение и забота о вашем здоровье.
                        </p>
                        {/* Кнопки соцсетей */}
                        <div className="flex items-center gap-3 pt-2">
                            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition border border-white/5">
                                <span className="text-sm">✈️</span>
                            </a>
                            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition border border-white/5">
                                <span className="text-sm">💬</span>
                            </a>
                        </div>
                    </div>

                    {/* Колонка 2: Филиал №1 */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-black uppercase tracking-wider text-indigo-400">
                            Филиал №1
                        </h3>
                        <div className="text-xs text-slate-300 font-light space-y-2 leading-relaxed">
                            <p>📍 Георгиевский проспект, д. 37, к. 3</p>
                            <p>⏰ Пн–Пт: 07:30–18:00<br />Сб–Вс: 08:00–17:00</p>
                            <p className="text-slate-400 text-[11px] italic">• Специализация: Гинекология, УЗИ, Лабораторные анализы, Процедурный кабинет, Неврология.</p>
                        </div>
                    </div>

                    {/* Колонка 3: Филиал №2 */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-black uppercase tracking-wider text-indigo-400">
                            Филиал №2
                        </h3>
                        <div className="text-xs text-slate-300 font-light space-y-2 leading-relaxed">
                            <p>📍 Георгиевский проспект, д. 37, к. 3</p>
                            <p>⏰ Пн–Вс: 10:00–20:00 <span className="text-emerald-400 font-medium">(Без выходных)</span></p>
                            <p className="text-slate-400 text-[11px] italic">• Специализация: Дерматология, Косметология, Трихология, Аллергология, Массаж, Терапия, Гастроэнтерология.</p>
                        </div>
                    </div>

                    {/* Колонка 4: Медицинские направления (SEO) */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-black uppercase tracking-wider text-indigo-400">
                            Направления
                        </h3>
                        <nav className="flex flex-col space-y-2">
                            {FOOTER_DIRECTIONS.map((dir) => (
                                <Link
                                    key={dir.href}
                                    href={dir.href}
                                    className="text-xs text-slate-300 hover:text-white transition-colors font-medium truncate"
                                >
                                    • {dir.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                </div>

                {/* НИЖНЯЯ ЧАСТЬ: ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ И РЕКВИЗИТЫ */}
                <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] text-slate-500 font-medium">
                    <div className="space-y-1">
                        <p className="text-slate-400">© {new Date().getFullYear()} ООО "ВЕРБМЕД". Все права защищены.</p>
                        <p>ИНН: 8603243520 / ОГРН: 1218600004510</p>
                        <p>Медицинская лицензия № Л041-01137-77/00336955 выданна Департаментом здравоохранения г. Москвы</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-slate-400">
                        <Link href="/privacy" className="hover:text-white transition">Политика конфиденциальности</Link>
                        <Link href="/mediacentre" className="hover:text-white transition">Медиацентр</Link>
                        <a href="#contacts" className="text-indigo-400 font-black tracking-wide uppercase hover:text-indigo-300 transition">
                            Регистратура: +7 (495) 122-21-78
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
}
