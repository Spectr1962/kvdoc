import { NextResponse } from 'next/server';
import { db } from "~/server/db";

// Функция безопасной транслитерации для формирования ЧПУ URL (slug)
function generateSlug(text: string): string {
    const rus = 'а-б-в-г-д-е-ё-ж-з-и-й-к-л-м-н-о-п-р-с-т-у-ф-х-ц-ч-ш-щ-ъ-ы-ь-э-ю-я- '.split('-');
    const eng = 'a-b-v-g-d-e-e-zh-z-i-y-k-l-m-n-o-p-r-s-t-u-f-h-ts-ch-sh-shch--y--e-yu-ya-'.split('-');
    let res = text.toLowerCase().trim();

    for (let i = 0; i < rus.length; i++) {
        res = res.split(rus[i]).join(eng[i]);
    }
    return res
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as Blob;

        if (!file) {
            return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
        }

        const text = await file.text();
        const lines = text.split(/\r?\n/);

        let updatedCount = 0;
        let createdCount = 0;

        // Начинаем со 2-й строки, пропуская шапку "Название услуги;Цена;Направление"
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Делим строку по точке с запятой, учитывая кавычки Excel вокруг сложных названий
            const matches = line.match(/(".*?"|[^;]+)(?=\s*;|\s*$|\s*;*)/g);
            if (!matches || matches.length < 2) continue;

            // Очищаем данные от кавычек Excel по краям
            const rawTitle = matches[0]?.replace(/^"|"$/g, '').trim();
            const priceStr = matches[1]?.replace(/^"|"$/g, '').trim() || '0';
            const rawDirection = matches[2] ? matches[2].replace(/^"|"$/g, '').trim() : 'Анализы';

            // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ ДЛЯ СНИЖЕНИЯ СТОИМОСТИ:
            // Отсекаем копейки (всё, что идет после точки или запятой в файле)
            const integerPart = priceStr.split(/[.,]/)[0] || '0';
            const price = parseInt(integerPart.replace(/[^0-9]/g, ''), 10);

            if (!rawTitle || isNaN(price)) continue;

            // Приведение к единому журнальному стилю Apple Style (без кричащего капса)
            const title = rawTitle;
            const marketingTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
            const directionTitle = rawDirection.charAt(0).toUpperCase() + rawDirection.slice(1).toLowerCase();

            const slug = generateSlug(title);
            const directionSlug = generateSlug(directionTitle);

            // 1. Проверяем или создаем направление (UPSERT)
            const direction = await db.direction.upsert({
                where: { slug: directionSlug },
                update: {},
                create: {
                    slug: directionSlug,
                    title: directionTitle,
                    h1: `${directionTitle} в Москве`,
                    metaTitle: `${directionTitle} в Москве — цены в Клинике Вербенкина`,
                    description: `Отделение: ${directionTitle.toLowerCase()}. Полный перечень услуг, актуальный прайс-лист и онлайн-запись.`
                }
            });

            // 2. Проверяем или создаем саму медицинскую услугу
            const h1 = `${marketingTitle} в Москве`;
            const metaTitle = `${marketingTitle} — цена от ${price} руб. в Москве`;
            const seoDescription = `Узнать стоимость и сдать ${marketingTitle.toLowerCase()} в клинике в Москве. Квалифицированные специалисты, современное оборудование, цены от ${price} руб.`;

            const existingService = await db.medicalService.findUnique({
                where: { slug }
            });

            if (existingService) {
                // Если услуга уже существует — МГНОВЕННО ОБНОВЛЯЕМ ТОЛЬКО ЦЕНУ.
                // Кастомные SEO-тексты, FAQ, врачи и описания, введенные руками, не затрутся!
                await db.medicalService.update({
                    where: { slug },
                    data: { price }
                });
                updatedCount++;
            } else {
                // Если услуги нет в базе — создаем новую запись с базовыми SEO-заглушками
                await db.medicalService.create({
                    data: {
                        slug,
                        title,
                        marketingTitle,
                        h1,
                        metaTitle,
                        seoDescription,
                        price,
                        directionId: direction.id
                    }
                });
                createdCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Прейскурант успешно синхронизирован. Обновлено цен: ${updatedCount}, добавлено новых услуг: ${createdCount}.`
        });

    } catch (error: any) {
        console.error("Критическая ошибка импорта прайса:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
