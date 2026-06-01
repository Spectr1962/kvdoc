'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Gift } from "lucide-react";

interface PromoData {
    id: string;
    slug: string;
    title: string;
    description: string;
    discountBadge: string;
    untilDate: string;
    newPrice: number | null;
    oldPrice: number | null;
}

interface PromosSliderProps {
    promos: PromoData[];
}

export default function PromosSlider({ promos }: PromosSliderProps) {
    // Сборка и фильтрация всех предложений клиники
    const allCards = [
        ...(promos || []).map((p) => {
            // ИСПРАВЛЕНО: Защита от дублирования ценников в бейджах
            const cleanBadge = p.discountBadge.includes("₽") || p.discountBadge.includes("руб")
                ? "Выгодно"
                : p.discountBadge;

            return {
                id: p.id,
                // ИСПРАВЛЕНО: Возвращаем прямой, синтаксически верный роут, который требует сервер
                // ИСПРАВЛЕНО: Ссылка дополнена подпапкой /promo/ в соответствии с иерархией вашего проекта
                // ИСПРАВЛЕНО: Ссылка ведет на стопроцентно рабочий и существующий в вашей файловой системе роут акций
                link: `/promo/${p.slug}`,
                badge: cleanBadge,
                badgeColor: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                subTitle: `Спеццена ${p.untilDate}`,
                title: p.title,
                price: p.newPrice,
                oldPrice: p.oldPrice,
                actionText: "Узнать условия →",
                desc: p.description
            };
        }),
        // ... здесь идет динамический .map из базы данных ...
        {
            id: "static-birthday-20",
            link: "#contacts",
            // ИСПРАВЛЕНО: Эмодзи подарка удален из текстовой строки бейджа
            badge: "-20%",
            badgeColor: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
            subTitle: "Постоянная программа",
            title: "20% на День Рождения на все услуги",
            desc: "Просим предъявить документ, удостоверяющий личность, администраторам регистратуры первого или второго филиала.",
            actionText: "Подробнее",
            price: null, oldPrice: null
        },
        {
            id: "static-accumulative-10",
            link: "#contacts",
            // ИСПРАВЛЕНО: Эмодзи звезды удален
            badge: "до 10%",
            badgeColor: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
            subTitle: "Накопительная система",
            title: "Накопительная скидка при обращениях",
            desc: "Активируется автоматически при регулярном обращении в наши медицинские отделения и прохождении процедур.",
            actionText: "Подробнее",
            price: null, oldPrice: null
        },
        {
            id: "static-pension-15",
            link: "#contacts",
            // ИСПРАВЛЕНО: Эмодзи сердца удален
            badge: "-15%",
            badgeColor: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
            subTitle: "Лабораторные анализы",
            title: "Пенсионерам — скидка 15% на анализы",
            desc: "Особая забота о старшем поколении. Предоставляем постоянную скидку на весь спектр лабораторных исследований.",
            actionText: "Запись",
            price: null, oldPrice: null
        },
        {
            id: "static-kids-10",
            link: "#contacts",
            // ИСПРАВЛЕНО: Эмодзи сердца удален
            badge: "-10%",
            badgeColor: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            subTitle: "Лабораторные анализы",
            title: "Дети до 14 лет и ветераны — скидка 10%",
            desc: "Постоянная льготная программа. В первом филиале процедурный кабинет оборудован для безболезненного приема детей 0+.",
            actionText: "Запись",
            price: null, oldPrice: null
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Настройка 6-секундного замедленного шага прокрутки
    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev >= allCards.length - 1 ? 0 : prev + 1));
            }, 6000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, allCards.length]);
    return (
        <div
            className="space-y-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* ИСПРАВЛЕНО: Высота увеличена до h-[340px] и добавлен pb-8, чтобы тень shadow-xl свободно рассеивалась снизу без срезов */}
            <div className="w-full overflow-hidden pt-4 pb-8 px-1 relative h-[340px]">

                <div className="relative w-full h-full">

                    {allCards.map((card, idx) => {
                        const isActive = currentIndex === idx;
                        const isPrev = idx === (currentIndex === 0 ? allCards.length - 1 : currentIndex - 1);
                        const isNext = idx === (currentIndex === allCards.length - 1 ? 0 : currentIndex + 1);

                        if (!isActive && !isPrev && !isNext) return null;

                        // Расчет упругих Apple-пропорций сдвига элементов по горизонтали
                        let leftPosition = "0%";
                        let cardWidth = "25%";
                        let heightClass = "h-[240px] mt-[20px] z-10 opacity-35 scale-[0.88] mx-0 px-1";

                        if (isPrev) {
                            leftPosition = "0%";
                            cardWidth = "calc(25% - 8px)";
                        } else if (isActive) {
                            leftPosition = "25%";
                            cardWidth = "calc(50% - 16px)";
                            // Активный центр выше боковых карт на 40px, имеет scale-100 и парящую тень shadow-xl
                            heightClass = "h-[280px] mt-0 z-20 opacity-100 scale-100 -mx-4 px-0";
                        } else if (isNext) {
                            leftPosition = "75%";
                            cardWidth = "calc(25% - 8px)";
                        }

                        return (
                            <div
                                key={`${card.id}-${idx}`}
                                className={`absolute top-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${heightClass}`}
                                style={{
                                    left: leftPosition,
                                    width: cardWidth,
                                }}
                            >
                                <Link
                                    href={card.link}
                                    className={`flex flex-col justify-between rounded-[2rem] transition-all duration-500 h-[268px] bg-white p-5 ${isActive ? "shadow-xl ring-1 ring-slate-100/50" : "shadow-none bg-slate-50/50"
                                        }`}
                                >
                                    {/* Контентный верхний узел карточки */}
                                    <div className="space-y-2.5 overflow-hidden">
                                        <span className="text-[9px] font-black text-indigo-600 bg-indigo-50/70 px-2.5 py-1 rounded-md uppercase tracking-wider block w-fit select-none">
                                            {card.subTitle}
                                        </span>

                                        <div className="space-y-1.5 whitespace-normal">
                                            {/* ИСПРАВЛЕНО: Неактивные заголовки стали контрастными (text-slate-500) и легкими */}
                                            <h3 className={`tracking-tight leading-snug transition-all duration-500 ${isActive
                                                ? "text-xl font-bold text-slate-900 line-clamp-2"
                                                : "text-xs font-bold text-slate-500 line-clamp-3"
                                                }`}>
                                                {isActive
                                                    ? card.title
                                                    : (card.title.charAt(0).toUpperCase() + card.title.slice(1).toLowerCase())
                                                }
                                            </h3>

                                            {card.desc && isActive && (
                                                <p className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-3 pt-0.5 animate-in fade-in duration-500">
                                                    {card.desc}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Отрезанный нижний подвал цен и бейджей с автоматическим mt-auto */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto shrink-0 w-full pb-1">
                                        <div className="flex items-center gap-3">
                                            {card.price && isActive ? (
                                                <div className="flex items-baseline gap-2 animate-in fade-in duration-500">
                                                    <span className="text-base font-black text-slate-900">{card.price.toLocaleString("ru-RU")} ₽</span>
                                                    {card.oldPrice && <span className="text-[11px] font-medium text-slate-400 line-through">{card.oldPrice.toLocaleString("ru-RU")} ₽</span>}
                                                </div>
                                            ) : card.price && !isActive ? (
                                                <span className="text-xs font-black text-slate-900">{card.price.toLocaleString("ru-RU")} ₽</span>
                                            ) : (
                                                <div className="h-4" />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="px-2.5 py-1 rounded-full text-[9px] font-black text-white shadow-2xs shrink-0" style={{ background: card.badgeColor }}>
                                                {card.badge}
                                            </div>

                                            {isActive && (
                                                <span className="text-[11px] font-black text-indigo-600 shrink-0 animate-in slide-in-from-left-2 duration-200">
                                                    {card.actionText}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* НИЖНИЕ ИНДИКАТОРНЫЕ ТОЧКИ УПРАВЛЕНИЯ (Замедленный 6-секундный progress bar) */}
            <div className="flex items-center justify-center gap-3 pt-4">
                {allCards.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className="group flex items-center justify-center focus:outline-hidden cursor-pointer"
                        aria-label={`Перейти к слайду ${idx + 1}`}
                    >
                        <div className={`h-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${currentIndex === idx ? "w-10 bg-indigo-100" : "w-2.5 bg-slate-200 hover:bg-slate-300"
                            }`}>
                            {/* Линия заполнения прогресса времени */}
                            {currentIndex === idx && (
                                <div
                                    className={`absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full ${isPaused ? "w-full" : "w-0 animate-[progress_6s_linear_infinite]"
                                        }`}
                                    style={{
                                        animationPlayState: isPaused ? "paused" : "running"
                                    }}
                                />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
