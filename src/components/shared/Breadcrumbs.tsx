'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    title: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="mb-4 flex items-center flex-wrap gap-1.5 text-xs font-medium text-slate-400 tracking-tight">
            <Link
                href="/"
                className="hover:text-slate-600 transition-colors duration-150"
            >
                Главная
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center gap-1.5">
                        <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
                        {isLast || !item.href ? (
                            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
                                {item.title}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="hover:text-slate-600 transition-colors duration-150 truncate max-w-[150px]"
                            >
                                {item.title}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
