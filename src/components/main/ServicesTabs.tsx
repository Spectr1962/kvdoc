'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MedicalService {
    id: string;
    name: string;
    slug: string;
    price: number;
}

interface DirectionWithServices {
    id: string;
    name: string;
    slug: string;
    services: MedicalService[];
}

interface ServicesTabsProps {
    directions: DirectionWithServices[];
}

export function ServicesTabs({ directions }: ServicesTabsProps) {
    const [activeTab, setActiveTab] = useState<string>('');

    useEffect(() => {
        if (directions && directions.length > 0) {
            const firstFilledDirection = directions.find(d => d.services && d.services.length > 0);
            setActiveTab(firstFilledDirection ? firstFilledDirection.slug : directions[0].slug);
        }
    }, [directions]);

    const activeDirection = directions.find((d) => d.slug === activeTab);

    if (!directions || directions.length === 0) {
        return (
            <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-100">
                <p className="text-slate-400 text-sm">Прейскурант временно недоступен.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 mt-8 items-start w-full overflow-hidden">

            {/* Левая колонка: Направления */}
            <div className="w-full md:w-1/4 flex md:flex-col overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 gap-2 border-b md:border-b-0 md:border-r border-slate-100 shrink-0 select-none">
                {directions.map((dir) => (
                    <button
                        key={dir.id}
                        onClick={() => setActiveTab(dir.slug)}
                        className={`text-left text-sm font-semibold px-4 py-3 rounded-xl transition-all duration-150 whitespace-nowrap md:whitespace-normal block min-w-[180px] md:min-w-0 w-auto md:w-full ${activeTab === dir.slug
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                    >
                        {dir.name}
                    </button>
                ))}
            </div>

            {/* Правая колонка: Услуги выбранного отделения */}
            <div className="w-full md:w-3/4 min-h-[300px]">
                {activeDirection && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 w-full">
                            <h3 className="text-xl font-bold text-slate-900">{activeDirection.name}</h3>
                            {/* Ссылка на всё отделение (Уровень 1): Исправлена синтаксическая ошибка */}
                            <Link
                                href={`/services/${activeDirection.slug}`}
                                className="text-sm font-bold text-blue-600 hover:text-blue-700 transition inline-flex items-center gap-1 shrink-0"
                            >
                                Все услуги отделения →
                            </Link>
                        </div>

                        {(!activeDirection.services || activeDirection.services.length === 0) ? (
                            <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-100 w-full">
                                <p className="text-slate-400 text-sm">Прейскурант отделения обновляется. Пожалуйста, уточняйте цены у администратора клиники.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                {activeDirection.services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-100 hover:shadow-xs transition w-full"
                                    >
                                        <div className="space-y-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-slate-900 truncate">{service.name}</h4>
                                            {/* Ссылка на саму карточку услуги. Так как на главной мы выводим популярные, 
                          роутер Next.js 15 перенаправит пользователя по полной 4-уровневой цепочке */}
                                            <Link
                                                href={`/services/${activeDirection.slug}`}
                                                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline transition"
                                            >
                                                Подробнее
                                            </Link>
                                        </div>
                                        <span className="text-sm font-bold text-slate-950 whitespace-nowrap bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100/50 shrink-0">
                                            {service.price.toLocaleString('ru-RU')} ₽
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
}
