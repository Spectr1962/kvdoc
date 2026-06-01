import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function run() {
    console.log('Начало принудительной разметки популярного прайс-листа...');

    // 1. Сбрасываем старые значения
    await db.medicalService.updateMany({
        data: { isPopular: false }
    });

    // 2. Активируем маркер популярности для приемов и УЗИ-диагностики
    const result = await db.medicalService.updateMany({
        where: {
            OR: [
                { slug: { contains: 'priem' } },
                { slug: { contains: 'uzi' } },
                { title: { contains: 'Прием' } },
                { title: { contains: 'УЗИ' } }
            ]
        },
        data: { isPopular: true }
    });

    console.log(`Успешно! По флагам активировано позиций: ${result.count}`);
}

run()
    .catch(err => console.error('Ошибка выполнения скрипта:', err))
    .finally(async () => {
        await db.$disconnect();
    });
