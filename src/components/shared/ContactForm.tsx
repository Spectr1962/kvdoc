'use client';

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        theme: "Обратная связь",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Имитация отправки формы администраторам Клиники Вербенкина
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: "", phone: "", theme: "Обратная связь", email: "", message: "" });
            setTimeout(() => setStatus('idle'), 4000);
        }, 1000);
    };

    return (
        <div className="w-full max-w-7xl mx-auto rounded-3xl bg-slate-100/70 p-6 md:p-10 border border-slate-200/50 shadow-xs select-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

                {/* ЛЕВАЯ И ЦЕНТРАЛЬНАЯ ЧАСТЬ (2/3): ИНТЕРАКТИВНАЯ ФОРМА ОБРАТНОЙ СВЯЗИ */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                        {/* Маленький бейдж хедера по макету */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-2xs w-fit">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Контакты
                        </span>

                        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-wide uppercase">
                            Задать вопрос
                        </h2>

                        {/* Первая строка полей: Имя и Телефон */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-800 pl-1">Ваше имя:</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Имя"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 px-4 rounded-2xl bg-white border border-slate-300 text-sm font-medium text-slate-900 focus:outline-hidden focus:border-indigo-500 shadow-3xs placeholder:text-slate-300"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-800 pl-1">Телефон:</label>
                                <div className="relative flex items-center">
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+7 (000) 000-00-00"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full h-12 pl-4 pr-4 rounded-2xl bg-white border border-slate-300 text-sm font-medium text-slate-900 focus:outline-hidden focus:border-indigo-500 shadow-3xs placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Селект темы */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-800 pl-1">Выберите тему:</label>
                            <div className="relative">
                                <select
                                    value={formData.theme}
                                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                                    className="w-full h-12 px-4 rounded-2xl bg-white border border-slate-300 text-sm font-bold text-slate-800 appearance-none focus:outline-hidden focus:border-indigo-500 shadow-3xs cursor-pointer"
                                >
                                    <option>Обратная связь</option>
                                    <option>Запись к специалисту</option>
                                    <option>Вопрос главному врачу</option>
                                    <option>Жалобы и предложения</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">▼</span>
                            </div>
                        </div>

                        {/* Поле Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-800 pl-1">Email:</label>
                            <input
                                type="email"
                                required
                                placeholder="mail@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full h-12 px-4 rounded-2xl bg-white border border-slate-300 text-sm font-medium text-slate-900 focus:outline-hidden focus:border-indigo-500 shadow-3xs placeholder:text-slate-300"
                            />
                        </div>

                        {/* Поле Сообщение */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-800 pl-1">Сообщение:</label>
                            <textarea
                                rows={3}
                                required
                                placeholder="Сообщение:"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-sm font-medium text-slate-900 focus:outline-hidden focus:border-indigo-500 shadow-3xs resize-none placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    {/* Кнопка отправки и политика конфиденциальности по макету */}
                    <div className="pt-2 space-y-4 flex flex-col items-center justify-center">
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="px-10 h-11 rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-400 text-white text-xs font-bold tracking-wide shadow-md hover:scale-102 transition duration-150 cursor-pointer min-w-[160px]"
                            style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" }}
                        >
                            {status === 'sending' ? 'Отправка...' : status === 'success' ? 'Отправлено! ✓' : 'Отправить'}
                        </button>
                        <p className="text-[10px] text-slate-600 text-center font-medium leading-tight">
                            * Заполняя данную форму вы подтверждаете, что ознакомились с <span className="font-bold underline cursor-pointer text-slate-900 hover:text-blue-600 transition">политикой конфиденциальности</span>
                        </p>
                    </div>
                </form>

                {/* ПРАВАЯ ЧАСТЬ (1/3): ТЕМНО-СИНИЙ БЛОК "КАК С НАМИ СВЯЗАТЬСЯ" */}
                <div
                    className="lg:col-span-1 rounded-3xl p-6 md:p-8 flex flex-col justify-center space-y-4 shadow-xl border border-slate-800"
                    style={{ background: "linear-gradient(180deg, #111c44 0%, #0b112c 100%)" }}
                >
                    <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-white/10 pb-2 mb-2">
                        Как с нами связаться
                    </h3>

                    <div className="space-y-2.5">
                        {/* Телефон */}
                        <a href="tel:+74951222178" className="w-full h-11 rounded-full bg-white/10 border border-white/10 flex items-center px-4 gap-4 text-white hover:bg-white/15 transition group">
                            <span className="text-lg group-hover:scale-110 transition-transform">📞</span>
                            <span className="text-xs font-bold tracking-wide">+7 (495) 122-21-78</span>
                        </a>

                        {/* Telegram */}
                        <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="w-full h-11 rounded-full bg-white/10 border border-white/10 flex items-center px-4 gap-4 text-white hover:bg-white/15 transition group">
                            <span className="text-lg group-hover:scale-110 transition-transform">✈️</span>
                            <span className="text-xs font-bold tracking-wide">Написать в Telegram</span>
                        </a>

                        {/* WhatsApp */}
                        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="w-full h-11 rounded-full bg-white/10 border border-white/10 flex items-center px-4 gap-4 text-white hover:bg-white/15 transition group">
                            <span className="text-lg group-hover:scale-110 transition-transform">💬</span>
                            <span className="text-xs font-bold tracking-wide">Написать в Whatsapp</span>
                        </a>

                        {/* МАКС / ЧАТ */}
                        <a href="#chat" className="w-full h-11 rounded-full bg-white/10 border border-white/10 flex items-center px-4 gap-4 text-white hover:bg-white/15 transition group">
                            <span className="text-lg group-hover:scale-110 transition-transform">🔘</span>
                            <span className="text-xs font-bold tracking-wide">Написать в МАКС</span>
                        </a>

                        {/* Email */}
                        <a href="mailto:citilabzel@yandex.ru" className="w-full h-11 rounded-full bg-white/10 border border-white/10 flex items-center px-4 gap-4 text-white hover:bg-white/15 transition group">
                            <span className="text-lg group-hover:scale-110 transition-transform">✉️</span>
                            <span className="text-xs font-bold tracking-wide truncate">citilabzel@yandex.ru</span>
                        </a>

                        {/* Локация */}
                        <div className="w-full p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start px-4 gap-4 text-white/80 leading-snug">
                            <span className="text-lg pt-0.5">📍</span>
                            <div className="text-[10px] font-semibold tracking-wide">
                                г. Зеленоград,<br />
                                Георгиевский проспект 37 к.3
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
