'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PostItem {
    id: string;
    type: string;
    slug: string;
    title: string;
    seoDescription: string;
    createdAt: string;
    author: {
        name: string;
        specialty: string;
    };
}

interface BlogContainerProps {
    initialPosts: PostItem[];
}

const TABS = [
    { id: 'all', label: 'Все материалы' },
    { id: 'article', label: 'Статьи' },
    { id: 'advice', label: 'Советы врача' },
    { id: 'disease', label: 'Заболевания' },
];

export function BlogContainer({ initialPosts }: BlogContainerProps) {
    const [activeTab, setActiveTab] = useState<string>('all');

    // Фильтруем массив на лету в зависимости от выбранного таба
    const filteredPosts = activeTab === 'all'
        ? initialPosts
        : initialPosts.filter(post => post.type === activeTab);

    return (
        <div className="space-y-8 w-full">
            {/* Горизонтальная панель переключения вкладок */}
            <div className="flex overflow-x-auto pb-2 border-b border-slate-100 gap-2 select-none whitespace-nowrap">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-150 ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Сетка отфильтрованных материалов */}
            {filteredPosts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-100 w-full">
                    <p className="text-sm text-slate-400">В этой категории пока нет опубликованных материалов.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {filteredPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-2xl border border-slate-150/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-4">
                                    {/* Красивый цветной бейдж категории */}
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${post.type === 'article' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                            post.type === 'advice' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                'bg-purple-50 text-purple-600 border border-purple-100'
                                        }`}>
                                        {post.type === 'article' ? 'Статья' : post.type === 'advice' ? 'Совет врача' : 'Заболевание'}
                                    </span>
                                    <div className="text-[11px] text-slate-400 font-medium">
                                        {new Date(post.createdAt).toLocaleDateString("ru-RU", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 min-h-[48px]">
                                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                                        {post.seoDescription}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-5 border-t border-slate-100 mt-6 flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-900 truncate">{post.author.name}</p>
                                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{post.author.specialty}</p>
                                </div>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5 shrink-0"
                                >
                                    Читать <span style={{ fontSize: '14px' }}>→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
