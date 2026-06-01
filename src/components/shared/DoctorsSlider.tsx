'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface DoctorData {
    id: string;
    slug: string;
    name: string;
    specialty: string;
    bio: string | null;
    image: string | null;
    directionSlug: string | null;
}

interface DoctorsSliderProps {
    doctors: DoctorData[];
}

export default function DoctorsSlider({ doctors }: DoctorsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isPaused && doctors.length > 1) {
            timerRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev >= doctors.length - 1 ? 0 : prev + 1));
            }, 6000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, doctors.length]);

    return (
        <div
            className="space-y-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* 
        ОКНО СЛАЙДЕРА: ИСПРАВЛЕНО (Убран класс overflow-hidden, высота увеличена до h-[380px]).
        Теперь парящая тень shadow-2xl свободно и мягко рассеивается во все стороны без обрезания краев.
      */}
            <div className="w-full pt-4 pb-12 px-1 relative h-[380px] select-none">
                <div className="relative w-full h-full">

                    {doctors.map((doc, idx) => {
                        const isActive = currentIndex === idx;
                        const isPrev = idx === (currentIndex === 0 ? doctors.length - 1 : currentIndex - 1);
                        const isNext = idx === (currentIndex === doctors.length - 1 ? 0 : currentIndex + 1);

                        if (!isActive && !isPrev && !isNext) return null;

                        // Точные горизонтальные координаты долей 18% / 64% / 18%
                        let leftPosition = "0%";
                        let cardWidth = "18%";
                        let heightClass = "h-[260px] mt-[30px] z-10 opacity-35 scale-[0.88] mx-0 px-1";

                        if (isPrev) {
                            leftPosition = "0%";
                            cardWidth = "calc(18% - 4px)";
                        } else if (isActive) {
                            leftPosition = "18%";
                            cardWidth = "calc(64% - 8px)";
                            // Высота активного центра зафиксирована на h-[320px] для перепада высот
                            heightClass = "h-[320px] mt-0 z-20 opacity-100 scale-100 -mx-4 px-0";
                        } else if (isNext) {
                            leftPosition = "82%";
                            cardWidth = "calc(18% - 4px)";
                        }

                        const isFirst = doc.name.includes("Аминулла");
                        const isSecond = doc.name.includes("Афонина");
                        const isThird = doc.name.includes("Басова");
                        const isFourth = doc.name.includes("Мартиросян");
                        const isFifth = doc.name.includes("Руженко");
                        const statusText = isThird ? "Главный врач" : isFourth ? "Ведущий эксперт" : isFifth ? "Массажист эксперт" : isFirst ? "Стаж 14+ лет" : isSecond ? "Высшая категория" : "Специалист";
                        const statusBg = isThird ? "bg-amber-500" : isFourth ? "bg-violet-600" : isFifth ? "bg-emerald-600" : isSecond ? "bg-indigo-600" : "bg-blue-600";

                        return (
                            <div
                                key={`${doc.id}-${idx}`}
                                className={`absolute top-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${heightClass}`}
                                style={{
                                    left: leftPosition,
                                    width: cardWidth,
                                }}
                            >
                                <div
                                    // Кастомный глубокий индиго-модуль парения активной карточки
                                    className={`flex bg-white rounded-[2.2rem] transition-all duration-500 h-full overflow-hidden ${isActive
                                        ? "shadow-[0_30px_70px_-15px_rgba(99,102,241,0.22)] ring-1 ring-slate-100/60 flex-row"
                                        : "shadow-none bg-slate-50/50 flex-col"
                                        }`}
                                >
                                    {/* ЗОНА ФОТО ВРАЧА */}
                                    <div className={`relative bg-slate-50/50 flex items-center justify-center overflow-hidden shrink-0 transition-all duration-500 ${isActive ? "w-[36%] h-full" : "w-full h-[60%]"
                                        }`}>
                                        <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider z-10 select-none text-white ${statusBg}`}>
                                            {statusText}
                                        </span>

                                        {doc.image ? (
                                            <Image
                                                src={doc.image}
                                                alt={doc.name}
                                                fill
                                                className="object-cover"
                                                sizes="30vw"
                                            />
                                        ) : (
                                            <div className="text-[9px] font-bold text-slate-300 uppercase tracking-wider select-none text-center p-2">
                                                Фото<br />врача
                                            </div>
                                        )}
                                    </div>

                                    {/* ЗОНА ТЕКСТА РЕГАЛИЙ */}
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4 overflow-hidden h-full relative">
                                        <div className="space-y-1.5">
                                            <h3 className={`font-bold text-slate-900 tracking-tight leading-snug transition-all duration-500 ${isActive ? "text-xl line-clamp-1" : "text-[11px] line-clamp-2"
                                                }`}>
                                                {doc.name}
                                            </h3>

                                            <p className="text-[11px] font-semibold text-indigo-600/90 leading-tight line-clamp-1">
                                                {doc.specialty.charAt(0).toUpperCase() + doc.specialty.slice(1).toLowerCase()}
                                            </p>

                                            {isActive && (
                                                <p className="medical-description line-clamp-4 pt-1 animate-in fade-in zoom-in-95 duration-500">
                                                    {/* ИСПРАВЛЕНО: Английское слово заменено на русское "специалист" */}
                                                    {doc.bio || "Практикующий специалист медицинского центра Клиника Вербенкина. Проводит комплексную экспертную диагностику."}
                                                </p>
                                            )}

                                        </div>

                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto shrink-0 w-full pb-1">
                                            {/* ИСПРАВЛЕНО: Ссылка формируется строго по вашей иерархии папок: /doctors/[directionSlug]/[doctorSlug] */}
                                            <Link
                                                key={doc.id}
                                                href={`/doctors/${doc.directionSlug || 'general'}/${doc.slug}`}
                                                className="text-[11px] font-medium text-slate-600 hover:text-blue-500 hover:font-semibold transition-all"
                                            >
                                                Подробнее о враче →
                                            </Link>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

            {/* ТОЧКИ УПРАВЛЕНИЯ */}
            <div className="flex items-center justify-center gap-3 pt-6">
                {doctors.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className="group flex items-center justify-center focus:outline-hidden cursor-pointer"
                    >
                        <div className={`h-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${currentIndex === idx ? "w-10 bg-indigo-100" : "w-2.5 bg-slate-200 hover:bg-slate-300"
                            }`}>
                            {currentIndex === idx && (
                                <div
                                    className={`absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full ${isPaused ? "w-full" : "w-0 animate-[progress_6s_linear_infinite]"
                                        }`}
                                    style={{ animationPlayState: isPaused ? "paused" : "running" }}
                                />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
