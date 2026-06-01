'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface HubItem {
    id: string;
    slug: string;
    title: string;
    content: string;
    type: string;
    badge: string;
    date: string;
    link: string;
    tag: string;
}

export default function MediacentreClientHub({ initialItems }: { initialItems: HubItem[] }) {
    const searchParams = useSearchParams();
    const [filteredItems, setFilteredItems] = useState<HubItem[]>(initialItems);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // 1. ИСПРАВЛЕНО: Чистый хук чтения GET-параметра вкладок при переходе с главной страницы
    useEffect(() => {
        const tabParam = searchParams.get("tab");
        if (tabParam === "promo" || tabParam === "news" || tabParam === "article") {
            setActiveTab(tabParam);
        } else {
            setActiveTab("all");
        }
        setSearchQuery("");
    }, [searchParams]);

    // 2. ИСПРАВЛЕНО: Синтаксически идеальный хук фильтрации без лишних знаков и запятых
    useEffect(() => {
        let result = initialItems;

        if (activeTab === "news") {
            result = result.filter(item => item.type === "news" || item.type === "important");
        } else if (activeTab === "promo") {
            result = result.filter(item => item.type === "promo");
        } else if (activeTab === "article") {
            result = result.filter(item => item.type === "article");
        }

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.content.toLowerCase().includes(query)
            );
        }

        setFilteredItems(result);
    }, [searchQuery, activeTab, initialItems]);

    return (
        <div className="space-y-8">
            {/* ИНТЕРФЕЙС УПРАВЛЕНИЯ: ТАБЫ И ЖИВОЙ ПОИСК */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 rounded-2xl w-fit shadow-3xs">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${activeTab === "all" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                            }`}
                    >
                        Все материалы
                    </button>
                    <button
                        onClick={() => setActiveTab("news")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${activeTab === "news" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                            }`}
                    >
                        1. Новости и события
                    </button>
                    <button
                        onClick={() => setActiveTab("promo")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${activeTab === "promo" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                            }`}
                    >
                        2. Акции и спецпредложения
                    </button>
                    <button
                        onClick={() => setActiveTab("article")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${activeTab === "article" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                            }`}
                    >
                        3. Экспертный журнал
                    </button>
                </div>

                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        placeholder="Поиск по публикациям..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-4 pr-10 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 shadow-3xs placeholder:text-slate-300"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs opacity-40">🔍</span>
                </div>
            </div>

            {/* СЕТКА КАРТОЧЕК */}
            {filteredItems.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl shadow-xs">
                    <p className="text-sm text-slate-400 font-medium italic">По вашему запросу публикаций не найдено.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => {
                        const isImportant = item.type === 'important';
                        const isPromo = item.type === 'promo';
                        const isArticle = item.type === 'article';

                        return (
                            <Link
                                key={item.id}
                                href={item.link}
                                className="group bg-white p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[200px] relative overflow-hidden"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-3xs ${isImportant ? 'bg-amber-50 text-amber-600 animate-pulse' :
                                                isPromo ? 'bg-indigo-50 text-indigo-600' :
                                                    isArticle ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                                            }`}>
                                            {item.badge}
                                        </span>
                                        <span className="text-[11px] font-bold text-slate-400">
                                            {new Date(item.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="medical-description line-clamp-3">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold">
                                    <span className="text-slate-400 font-medium truncate max-w-[180px]">
                                        # {item.tag}
                                    </span>
                                    <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                                        {isPromo ? 'Узнать условия' : 'Читать'} →
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
