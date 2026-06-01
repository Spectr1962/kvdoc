'use client';

import { useState, useMemo } from 'react';
import { Search, Calendar, X } from 'lucide-react';

interface ServiceItem {
    id: string;
    title: string;
    marketingTitle: string;
    price: number;
    promoPrice: number | null;
}

interface PriceTableClientProps {
    initialServices: ServiceItem[];
}

export default function PriceTableClient({ initialServices }: PriceTableClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    // Быстрая фильтрация на клиенте через useMemo
    const filteredServices = useMemo(() => {
        return initialServices.filter((service) => {
            const matchText = (service.marketingTitle + ' ' + service.title).toLowerCase();
            return matchText.includes(searchQuery.toLowerCase());
        });
    }, [searchQuery, initialServices]);

    return (
        <div className="space-y-4">
            {/* Поисковый инпут */}
            <div className="relative w-full max-w-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                </span>
                <input
                    type="text"
                    placeholder="Поиск по названию услуги или анализа..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-10 bg-slate-100/80 focus:bg-white border border-transparent focus:border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-200"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Таблица цен */}
            <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-xs font-semibold text-slate-500 tracking-wider">
                                <th className="py-3.5 px-6 w-full">Медицинская манипуляция</th>
                                <th className="py-3.5 px-6 text-right whitespace-nowrap">Стоимость</th>
                                <th className="py-3.5 px-6 text-center">Действие</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service) => (
                                    <tr
                                        key={service.id}
                                        className="hover:bg-slate-50/40 transition-colors duration-150 group"
                                    >
                                        <td className="py-4 px-6 font-medium text-slate-900 leading-snug">
                                            {service.marketingTitle}
                                        </td>
                                        <td className="py-4 px-6 text-right font-semibold tabular-nums whitespace-nowrap">
                                            {service.promoPrice ? (
                                                <div className="flex flex-col items-end">
                                                    <span className="text-rose-600 text-sm">
                                                        {service.promoPrice.toLocaleString('ru-RU')} ₽
                                                    </span>
                                                    <span className="text-xs text-slate-400 line-through font-normal">
                                                        {service.price.toLocaleString('ru-RU')} ₽
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-800">
                                                    {service.price.toLocaleString('ru-RU')} ₽
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-50 group-hover:bg-slate-900 border border-slate-200/60 group-hover:border-transparent text-slate-600 group-hover:text-white transition-all duration-200 shadow-2xs">
                                                <Calendar className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="py-12 px-6 text-center text-slate-400 text-xs">
                                        Ничего не найдено по вашему запросу.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-right text-[11px] text-slate-400 px-2">
                Показано позиций: {filteredServices.length} из {initialServices.length}
            </div>
        </div>
    );
}
