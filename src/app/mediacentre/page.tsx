import { db } from "~/server/db";
import { Suspense } from "react";
import Breadcrumbs from "~/components/shared/breadcrumbs";
import MedicalDisclaimer from "~/components/shared/medical-disclaimer";
import MediacentreClientHub from "~/components/shared/mediacentre-client-hub"; // строго маленькими буквами

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Медиацентр: Новости, Акции и Журнал | Клиника Вербенкина",
    description: "Единая лента событий медицинского центра Клиника Вербенкина в Зеленограде. Важные объявления, графики работы, сезонные акции и экспертные статьи врачей.",
    alternates: {
        canonical: "https://kvdoc.ru",
    }
};

export default async function MediacentrePage() {
    // Запрашиваем динамические данные из PostgreSQL через Prisma
    const news = await db.news.findMany({ orderBy: { createdAt: 'desc' } });
    const promos = await db.promo.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
    const posts = await db.post.findMany({
        include: { author: { select: { name: true, specialty: true } } },
        orderBy: { createdAt: 'desc' }
    });

    // Объединяем динамические и постоянные социальные программы в один поток
    const items = [
        ...news.map(n => ({
            id: n.id,
            slug: n.slug,
            title: n.title,
            content: n.content,
            type: n.isImportant ? 'important' : 'news',
            badge: n.isImportant ? 'Важное' : 'Событие',
            date: n.createdAt.toISOString(),
            link: `/news/${n.slug}`,
            tag: 'Общее'
        })),

        // А. Динамические акции из базы данных
        ...promos.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            content: p.description,
            type: 'promo',
            badge: p.discountBadge,
            date: p.createdAt.toISOString(),
            link: `/promo/${p.slug}`,
            tag: 'Акция'
        })),

        // Б. Постоянные программы лояльности с макета
        {
            id: "hub-static-birthday-20",
            slug: "birthday-20",
            title: "20% на День Рождения на все медицинские услуги",
            content: "Специальная праздничная скидка для пациентов клиники. Действует в день рождения, а также за 3 дня до и 3 дня после него. Для активации программы лояльности, пожалуйста, просим предъявить документ, удостоверяющий личность, администраторам регистратуры первого или второго филиала.",
            type: "promo",
            badge: "🎁 -20%",
            date: new Date().toISOString(),
            link: "/privacy",
            tag: "Программа"
        },
        {
            id: "hub-static-accumulative-10",
            slug: "accumulative-10",
            title: "Накопительная дисконтная система Клиники Вербенкина",
            content: "Заботьтесь о своем здоровье и здоровье своих близких с постоянной выгодой. Накопительная система до 10% активируется автоматически при регулярном обращении в наши медицинские отделения и прохождении лечебных или диагностических процедур.",
            type: "promo",
            badge: "⭐ до 10%",
            date: new Date().toISOString(),
            link: "/about",
            tag: "Лояльность"
        },
        {
            id: "hub-static-pension-15",
            slug: "pension-15",
            title: "Социальная программа: пенсионерам — скидка 15% на анализы",
            content: "Особая забота о старшем поколении. Предоставляем постоянную скидку в размере 15% на весь спектр лабораторных исследований и заборов анализов. Программа действует ежедневно в процедурном кабинете первого филиала клиники в Зеленограде.",
            type: "promo",
            badge: "💜 -15%",
            date: new Date().toISOString(),
            link: "#contacts",
            tag: "Программа"
        },
        {
            id: "hub-static-kids-10",
            slug: "kids-10",
            title: "Льготная программа: дети до 14 лет и ветераны — скидка 10%",
            content: "Постоянная социальная скидка 10% на лабораторную диагностику и забор крови. В первом филиале процедурный кабинет оборудован для комфортного и безболезненного приема детей 0+ без очередей и долгого ожидания.",
            type: "promo",
            badge: "💜 -10%",
            date: new Date().toISOString(),
            link: "#contacts",
            tag: "Льгота"
        },

        ...posts.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            content: p.content,
            type: 'article',
            badge: p.type === 'article' ? 'Статья' : 'Совет врача',
            date: p.createdAt.toISOString(),
            link: `/blog/${p.slug}`,
            tag: p.author?.specialty || 'Медицина'
        }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Медиацентр" }
    ];

    return (
        <main className="container mx-auto max-w-7xl px-4 py-10 space-y-10 select-none">
            <Breadcrumbs items={breadcrumbItems} />

            {/* Шапка Медиацентра — КВ-ДОК переименован везде на Клинику Вербенкина */}
            <div className="max-w-3xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Информационный хаб клиники
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                    Медиацентр Клиники Вербенкина
                </h1>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                    Единая лента событий медицинского центра: важные объявления, графики работы, запуск выгодных сезонных акций, чекапов и экспертные статьи от наших практикующих врачей.
                </p>
            </div>

            {/* ИСПРАВЛЕНО: Безопасный вызов интерактивного хаба через Suspense */}
            <Suspense fallback={<div className="text-center p-10 text-xs text-slate-400 font-medium">Загрузка Медиацентра...</div>}>
                <MediacentreClientHub initialItems={items} />
            </Suspense>

            <MedicalDisclaimer />
        </main>
    );
}
