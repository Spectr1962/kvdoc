import { db } from "~/server/db";
import PriceTableClient from "./price-table-client";

interface PriceSectionProps {
    directionSlug: string;
}

export default async function PriceSection({ directionSlug }: PriceSectionProps) {
    // Получаем направление и входящие в него услуги через настроенный db.ts
    const direction = await db.direction.findUnique({
        where: { slug: directionSlug },
        include: {
            services: {
                orderBy: { title: 'asc' },
            },
        },
    });

    if (!direction || direction.services.length === 0) {
        return null;
    }

    // Маппинг данных под интерфейс витрины
    const servicesData = direction.services.map(s => ({
        id: s.id,
        title: s.title,
        marketingTitle: s.marketingTitle || s.title,
        price: s.price,
        promoPrice: s.promoPrice,
    }));

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-12 font-sans">
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                    Стоимость услуг отделения
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    Цены указаны в рублях. Запись на диагностику и забор биоматериала осуществляется онлайн.
                </p>
            </div>

            <PriceTableClient initialServices={servicesData} />
        </section>
    );
}
