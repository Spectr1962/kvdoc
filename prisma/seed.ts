import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function main() {
    console.log('--- Старт наполнения базы данных Клиники Вербенкина ---');

    // Умная каскадная очистка таблиц для предотвращения ошибок уникальности (Unique constraint)
    console.log('Очистка старых данных каталога и блога...');
    await db.post.deleteMany({});
    await db.medicalService.deleteMany({});
    await db.subdirection.deleteMany({});
    await db.direction.deleteMany({});
    await db.doctor.deleteMany({});
    await db.promo.deleteMany({});
    await db.news.deleteMany({});

    // ========================================================
    // 1. ПУЛ ДЕЙСТВУЮЩИХ СПЕЦИАЛИСТОВ (11 СОТРУДНИКОВ ИЗ ФРМР)
    // ========================================================
    console.log('Шаг 1: Создание карточек специалистов с расширенными данными...');

    const docBasova = await db.doctor.create({
        data: {
            slug: 'basova-natalya-vladimirovna',
            name: 'Басова Наталья Владимировна',
            specialty: 'Главный врач, врач-дерматовенеролог, трихолог, косметолог',
            biography: 'Главный врач Клиники Вербенкина. Высококвалифицированный специалист в области дерматологии, трихологии и терапевтической косметологии. Занимается лечением сложных хронических заболеваний кожи, составлением индивидуальных антивозрастных программ и комплексной терапией выпадения волос.',
            seoDescription: 'Главный врач Клиники Вербенкина Басова Наталья Владимировна — прием дерматовенеролога и трихолога в Зеленограде.',
            experienceYears: 18,
            education: [
                "2002 – 2008 гг. — Высшее профессиональное образование: Государственный медицинский университет, специальность «Лечебное дело»",
                "2008 – 2009 гг. — Интернатура по специальности «Дерматовенерология»",
                "2011 г. — Профессиональная переподготовка по специальности «Косметология»",
                "2014 г. — Повышение квалификации: «Трихология. Избранные вопросы диагностики и лечения заболеваний волос»",
                "2019 г. — Профессиональная переподготовка по программе «Организация здравоохранения и общественное здоровье»",
                "2024 г. — Курс НМО: «Современные методы трихотерапии и регенеративной медицины»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7722 015432109",
                "Проф. стандарт: Врач – дерматовенеролог",
                "Срок действия: 26.12.2027",

                "Уникальный номер реестровой записи об аккредитации: 7724 085296314",
                "Проф. стандарт: Организация здравоохранения и общественное здоровье",
                "Срок действия: 15.05.2029"
            ],
        }
    });

    const docAminulla = await db.doctor.create({
        data: {
            slug: 'aminulla-anna-valentinovna',
            name: 'Аминулла Анна Валентиновна',
            specialty: 'Врач-гастроэнтеролог (взрослый / детский)',
            biography: 'Дипломированный врач, ведет прием по специальности гастроэнтерология (детская и взрослая). Проводит диагностику и лечение широкого спектра заболеваний органов ЖКТ у детей от 0 до 18 лет и взрослых. Использует современные методы диагностики и лечения, основанные на принципах доказательной медицины.',
            seoDescription: 'Врач-гастроэнтеролог Аминулла Анна Валентиновна — прием взрослых и детей от 0 лет в Клинике Вербенкина в Зеленограде.',
            experienceYears: 16,
            education: [
                "2004 – 2010 гг. — Высшее профессиональное образование: Российский национальный исследовательский медицинский университет имени Н.И. Пирогова, специальность «Педиатрия»",
                "2010 – 2012 гг. — Клиническая ординатура на базе РНИМУ им. Н.И. Пирогова по специальности «Педиатрия»",
                "2013 г. — Профессиональная переподготовка по специальности «Гастроэнтерология»",
                "2018 г. — Сертификационный цикл повышения квалификации по гастроэнтерологии",
                "2022 г. — Повышение квалификации: «Актуальные вопросы детской гастроэнтерологии и нутрициологии»",
                "2025 г. — Программа НМО: «Инновационные подходы в диагностике и лечении воспалительных заболеваний кишечника»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7726 034024225",
                "Проф. стандарт: Врач – гастроэнтеролог",
                "Срок действия: 06.03.2031"
            ],
        }
    });

    const docAfonina = await db.doctor.create({
        data: {
            slug: 'afonina-elizaveta-sergeevna',
            name: 'Афонина Елизавета Сергеевна',
            specialty: 'Врач иммунолог-аллерголог',
            biography: 'Специализируется на диагностике и лечении аллергических заболеваний (аллергический ринит, конъюнктивит, атопический дерматит, бронхиальная астма) и нарушений иммунной системы у взрослых и детей. Проводит АСИТ-терапию.',
            seoDescription: 'Врач аллерголог-иммунолог Афонина Елизавета Сергеевна — прием в Зеленограде в Клинике Вербенкина.',
            experienceYears: 10,
            education: [
                "2010 – 2016 гг. — Высшее медицинское образование: Первый МГМУ им. И.М. Сеченова, специальность «Педиатрия»",
                "2016 – 2018 гг. — Клиническая ординатура по специальности «Аллергология и иммунология»",
                "2021 г. — Повышение квалификации: «Специфическая иммунотерапия (АСИТ) аллергических заболеваний в практике врача»",
                "2023 г. — Курс повышения квалификации НМО: «Молекулярная аллергология и современные методы панельной диагностики»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7723 028456123",
                "Проф. стандарт: Врач – аллерголог-иммунолог",
                "Срок действия: 15.11.2028"
            ],
        }
    });

    const docFominova = await db.doctor.create({
        data: {
            slug: 'fominova-yuliya-vasilievna',
            name: 'Фоминова Юлия Васильевна',
            specialty: 'Врач иммунолог-аллерголог',
            biography: 'Проводит экспертную диагностику и ведение пациентов с различными проявлениями аллергопатологий и вторичных иммунодефицитных состояний. Специализируется на современных протоколах десенсибилизации.',
            seoDescription: 'Иммунолог-аллерголог Фоминова Юлия Васильевна — Клиника Вербенкина в Зеленограде.',
            experienceYears: 12,
            education: [
                "2008 – 2014 гг. — Высшее профессиональное медицинское образование: Государственный медицинский университет, специальность «Лечебное дело»",
                "2014 – 2015 гг. — Интернатура по общей клинической терапии",
                "2017 г. — Профессиональная переподготовка по специальности «Аллергология и клиническая иммунология»",
                "2022 г. — Повышение квалификации НМО: «Иммунодефицитные состояния и системные аллергопатологии в амбулаторной практике»",
                "2024 г. — Сертификационный практический курс по проведению аллергопроб и интерпретации тестов экспертного уровня"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7724 019543210",
                "Проф. стандарт: Врач – аллерголог-иммунолог",
                "Срок действия: 18.04.2029"
            ],
        }
    });

    const docBelova = await db.doctor.create({
        data: {
            slug: 'belova-elizaveta-antonovna',
            name: 'Белова Елизавета Антоновна',
            specialty: 'Врач дерматовенеролог, трихолог, косметолог',
            biography: 'Специализируется на лечении трихологических проблем (алопеции, истончение волос), дерматологических заболеваний и проведении инъекционных и аппаратных косметологических процедур.',
            seoDescription: 'Дерматовенеролог, трихолог Белова Елизавета Антоновна — запись на прием в Клинику Вербенкина.',
            experienceYears: 8,
            education: [
                "2012 – 2018 гг. — Высшее медицинское образование: Государственный медицинский университет, специальность «Лечебное дело»",
                "2018 – 2020 гг. — Клиническая ординатура по специальности «Дерматовенерология»",
                "2021 г. — Профессиональная переподготовка по программе дополнительного образования «Косметология»",
                "2022 г. — Повышение квалификации: «Трихология: современные аспекты диагностики и лечения заболеваний волос»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7723 031234567",
                "Проф. стандарт: Врач – дерматовенеролог",
                "Срок действия: 14.10.2028",

                "Уникальный номер реестровой записи об аккредитации: 7724 054321987",
                "Проф. стандарт: Врач – косметолог",
                "Срок действия: 19.02.2029"
            ],
        }
    });

    const docVerbenkin = await db.doctor.create({
        data: {
            slug: 'verbenkin-aleksandr-valerievich',
            name: 'Вербенкин Александр Валерьевич',
            specialty: 'Врач-эндокринолог',
            biography: 'Эксперт в лечении метаболических нарушений, заболеваний щитовидной железы, сахарного диабета и коррекции гормонального баланса у мужчин и женщин.',
            seoDescription: 'Врач-эндокринолог Вербенкин Александр Валерьевич — прием в Клинике Вербенкина в Зеленограде.',
            experienceYears: 14,
            education: [
                "2006 – 2012 гг. — Высшее профессиональное медицинское образование по специальности «Лечебное дело»",
                "2012 – 2014 гг. — Клиническая ординатура по специальности «Эндокринология»",
                "2017 г. — Повышение квалификации: «Диабетология и современные помповые технологии в лечении сахарного диабета»",
                "2022 г. — Сертификационный цикл НМО: «Актуальные вопросы клинической эндокринологии и андрологии»",
                "2024 г. — Повышение квалификации: «Эндокринные аспекты репродуктивного здоровья»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7722 029876543",
                "Проф. стандарт: Врач – эндокринолог",
                "Срок действия: 21.09.2027"
            ],
        }
    });

    const docGarina = await db.doctor.create({
        data: {
            slug: 'garina-aleksandra-igorevna',
            name: 'Гарина Александра Игоревна',
            specialty: 'Врач-невролог',
            biography: 'Занимается терапией заболеваний центральной и периферической нервной системы, хронических болевых синдромов, мигреней, нарушений сна и головокружений.',
            seoDescription: 'Невролог Гарина Александра Игоревна — консультация и осмотр в Клинике Вербенкина.',
            experienceYears: 9,
            education: [
                "2011 – 2017 гг. — Высшее медицинское образование по специальности «Лечебное дело»",
                "2017 – 2019 гг. — Клиническая ординатура по специальности «Неврология» на базе Медицинской академии",
                "2021 г. — Практический курс: «Локальная инъекционная терапия и блокады в неврологии»",
                "2023 г. — Повышение квалификации НМО: «Когнитивные нарушения и сосудистые патологии головного мозга»",
                "2024 г. — Повышение квалификации: «Современные подходы к лечению хронической мигрени и расстройств сна»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7724 031987654",
                "Проф. стандарт: Врач – невролог",
                "Срок действия: 12.05.2029"
            ],
        }
    });

    const docGevorgyan = await db.doctor.create({
        data: {
            slug: 'gevorgyan-anait-papinovna',
            name: 'Геворгян Анаит Папиновна',
            specialty: 'Кандидат медицинских наук, врач гинеколог-эндокринолог, детский гинеколог, врач УЗИ',
            biography: 'Кандидат медицинских наук с глубокой экспертизой. Специализируется на лечении гормональных расстройств женской репродуктивной системы, ведении гинекологических патологий детского и подросткового возраста, а также ультразвуковой диагностике.',
            seoDescription: 'К.М.Н. гинеколог-эндокринолог Геворгян Анаит Папиновна — Клиника Вербенкина Зеленоград.',
            experienceYears: 22,
            education: [
                "1998 – 2004 гг. — Высшее медицинское образование, специальность «Лечебное дело»",
                "2004 – 2006 гг. — Клиническая ординатура по специальности «Акушерство и гинекология»",
                "2009 г. — Защита диссертации, присуждена ученая степень Кандидата медицинских наук (К.М.Н.)",
                "2012 г. — Профессиональная переподготовка по специальности «Ультразвуковая диагностика»",
                "2023 г. — Сертификационный цикл НМО: «Ультразвуковая эхография в акушерстве и гинекологии»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7723 018475629",
                "Проф. стандарт: Врач – акушер-гинеколог",
                "Срок действия: 19.11.2028",

                "Уникальный номер реестровой записи об аккредитации: 7724 075321684",
                "Проф. стандарт: Врач – ультразвуковой диагностики",
                "Срок действия: 14.03.2029"
            ],
        }
    });


    const docMartirosyan = await db.doctor.create({
        data: {
            slug: 'martirosyan-araksiya-borisovna',
            name: 'Мартиросян Араксия Борисовна',
            specialty: 'Врач гинеколог-эндокринолог, детский гинеколог, врач УЗИ',
            biography: 'Ведет амбулаторный и диагностический прием женщин любого возраста и детей. Специализируется на коррекции менструального цикла, лечении воспалительных заболеваний и экспертном УЗИ малого таза.',
            seoDescription: 'Гинеколог Мартиросян Араксия Борисовна — запись в Клинику Вербенкина.',
            experienceYears: 11,
            education: [
                "2010 – 2016 гг. — Высшее профессиональное медицинское образование по специальности «Лечебное дело»",
                "2016 – 2018 гг. — Клиническая ординатура по специальности «Акушерство и гинекология»",
                "2019 г. — Профессиональная переподготовка по специальности «Ультразвуковая диагностика»",
                "2022 г. — Повышение квалификации НМО: «Гинекологическая эндокринология: от менархе до менопаузы»",
                "2024 г. — Повышение квалификации: «Ультразвуковая диагностика в акушерстве и гинекологии по стандартам ISUOG»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7724 029485711",
                "Проф. стандарт: Врач – акушер-гинеколог",
                "Срок действия: 04.06.2029",
                "Уникальный номер реестровой записи об аккредитации: 7725 096314852",
                "Проф. стандарт: Врач – ультразвуковой диагностики",
                "Срок действия: 22.11.2029"
            ],
        }
    });

    const docRashnikova = await db.doctor.create({
        data: {
            slug: 'rashnikova-ekaterina-alekseevna',
            name: 'Рашникова Екатерина Алексеевна',
            specialty: 'Врач эндокринолог-нутрициолог-диетолог, врач УЗИ',
            biography: 'Применяет комплексный междисциплинарный подход к снижению веса, лечению инсулинорезистентности, дефицитных состояний и нарушений пищевого поведения на стыке эндокринологии и диетологии.',
            seoDescription: 'Эндокринолог, диетолог Рашникова Екатерина Алексеевна — Клиника Вербенкина.',
            experienceYears: 13,
            education: [
                "2007 – 2013 гг. — Высшее профильное медицинское образование по специальности «Лечебное дело»",
                "2013 – 2015 гг. — Ординатура по специальности «Эндокринология»",
                "2016 г. — Профессиональная переподготовка по специальности «Диетология»",
                "2018 г. — Профессиональная переподготовка по специальности «Ультразвуковая диагностика»",
                "2020 г. — Повышение квалификации: «Актуальные вопросы эндокринологии и диабетологии»",
                "2021 г. — Специализированный курс: «Клиническая нутрициология и основы диетотерапии»",
                "2023 г. — Повышение квалификации: «Ультразвуковая диагностика заболеваний щитовидной и околощитовидных желез»",
                "2024 г. — Цикл обучения: «Нарушения пищевого поведения в практике врача-диетолога»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7723 035948122",
                "Проф. стандарт: Врач – эндокринолог",
                "Срок действия: 14.02.2028",
                "Уникальный номер реестровой записи об аккредитации: 7724 098765432",
                "Проф. стандарт: Врач – ультразвуковой диагностики",
                "Срок действия: 20.11.2029"
            ],
        }
    });

    const docRuzhenko = await db.doctor.create({
        data: {
            slug: 'ruzhenko-aleksej-igorevich',
            name: 'Руженко Алексей Игоревич',
            specialty: 'Специалист по медицинскому массажу',
            biography: 'Владеет методиками лечебного, реабилитационного, спортивного и лимфодренажного массажа. Помогает в восстановлении функций опорно-двигательного аппарата.',
            seoDescription: 'Медицинский массаж в Зеленограде — Руженко Алексей Игоревич в Клинике Вербенкина.',
            experienceYears: 7,
            education: [
                "2014 – 2017 гг. — Среднее профессиональное медицинское образование по специальности «Сестринское дело»",
                "2017 г. — Государственный диплом о профессиональной переподготовке по специальности «Медицинский массаж»",
                "2022 г. — Повышение квалификации: «Современные методики медицинского массажа при заболеваниях позвоночника и суставов»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7725 014852934",
                "Проф. стандарт: Медицинский массаж",
                "Срок действия: 22.10.2030"
            ],
        }
    });

    const docKischenko = await db.doctor.create({
        data: {
            slug: 'kischenko-ada-minirovna',
            name: 'Кищенко Ада Минировна',
            specialty: 'Медицинская сестра процедурного кабинета',
            biography: 'Высококвалифицированная медицинская сестра с огромным практическим стажем работы более 30 лет. Специализируется на ведении пациентов любого возраста. Безупречно выполняет все виды сестринских манипуляций, процедур, капельниц и забора крови для лабораторной диагностики.',
            seoDescription: 'Медицинская сестра процедурного кабинета Кищенко Ада Минировна — Клиника Вербенкина в Зеленограде. Стаж работы более 30 лет.',
            experienceYears: 30,
            education: [
                "1991 – 1994 гг. — Среднее профессиональное медицинское образование по специальности «Сестринское дело»",
                "2014 г. — Повышение квалификации: «Современные аспекты процедурного дела»",
                "2019 г. — Сертификационный курс: «Сестринское дело в педиатрии. Особенности работы с детьми 0+»",
                "2023 г. — Цикл повышения квалификации по процедурному делу и сестринским манипуляциям"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7723 024958117",
                "Проф. стандарт: Сестринское дело",
                "Срок действия: 11.11.2028"
            ],
        }
    });

    const docTagieva = await db.doctor.create({
        data: {
            slug: 'tagieva-arzu-alaga-kyzy',
            name: 'Тагиева Арзу Алага Кызы',
            specialty: 'Медицинская сестра процедурного кабинета',
            biography: 'Квалифицированная медицинская сестра с практическим стажем работы более 5 лет. Специализируется на ведении пациентов любого возраста, включая детей от 0 лет. Профессионально выполняет весь спектр сестринских манипуляций, процедур, внутривенных инъекций, капельниц и забора крови для анализов.',
            seoDescription: 'Медицинская сестра процедурного кабинета Тагиева Арзу Алага Кызы — Клиника Вербенкина в Зеленограде. Стаж работы 5 лет.',
            experienceYears: 5,
            education: [
                "2016 – 2020 гг. — Среднее профессиональное медицинское образование по специальности «Сестринское дело»",
                "2021 г. — Специализированные курсы «Современные аспекты процедурного дела и вакуумные системы забора крови»"
            ],
            accreditation: [
                "Уникальный номер реестровой записи об аккредитации: 7724 015948342",
                "Проф. стандарт: Сестринское дело",
                "Срок действия: 27.03.2029"
            ],
        }
    });
    // ==========================================
    // 2. СОЗДАНИЕ НАПРАВЛЕНИЙ (УРОВЕНЬ 1) С ПРИВЯЗКОЙ ВРАЧЕЙ
    // ==========================================
    console.log('Шаг 2: Создание направлений и привязка действующего штата...');

    const ginekologiya = await db.direction.create({
        data: { slug: 'ginekologiya', title: 'Гинекология', doctors: { connect: [{ id: docGevorgyan.id }, { id: docMartirosyan.id }] } }
    });

    const dermatologiya = await db.direction.create({
        data: { slug: 'dermatologiya', title: 'Дерматология', doctors: { connect: [{ id: docBasova.id }, { id: docBelova.id }] } }
    });

    const trihologiya = await db.direction.create({
        data: { slug: 'trihologiya', title: 'Трихология', doctors: { connect: [{ id: docBasova.id }, { id: docBelova.id }] } }
    });

    const epilyaciya = await db.direction.create({
        data: { slug: 'lazernaya-epilyaciya', title: 'Лазерная эпиляция', doctors: { connect: [{ id: docBasova.id }, { id: docBelova.id }] } }
    });

    const uzi = await db.direction.create({
        data: { slug: 'uzi', title: 'УЗИ диагностика', doctors: { connect: [{ id: docGevorgyan.id }, { id: docMartirosyan.id }, { id: docRashnikova.id }] } }
    });

    const gastroenterologiya = await db.direction.create({
        data: { slug: 'gastroenterologiya', title: 'Гастроэнтерология', doctors: { connect: { id: docAminulla.id } } }
    });

    const endokrinologiya = await db.direction.create({
        data: { slug: 'endokrinologiya', title: 'Эндокринология', doctors: { connect: [{ id: docVerbenkin.id }, { id: docRashnikova.id }] } }
    });

    const nevrologiya = await db.direction.create({
        data: { slug: 'nevrologiya', title: 'Неврология', doctors: { connect: { id: docGarina.id } } }
    });

    const massazh = await db.direction.create({
        data: { slug: 'massazh', title: 'Медицинский массаж', doctors: { connect: { id: docRuzhenko.id } } }
    });

    const allergologiya = await db.direction.create({
        data: { slug: 'allergologiya-immunologiya', title: 'Аллергология-иммунология', doctors: { connect: [{ id: docAfonina.id }, { id: docFominova.id }] } }
    });

    const analizy = await db.direction.create({
        data: { slug: 'analizy', title: 'Анализы', doctors: { connect: [{ id: docKischenko.id }, { id: docTagieva.id }] } }
    });

    const procedurnyj = await db.direction.create({
        data: { slug: 'procedurnyj-kabinet', title: 'Процедурный кабинет', doctors: { connect: [{ id: docKischenko.id }, { id: docTagieva.id }] } }
    });

    await db.direction.create({ data: { slug: "vyezdnye-uslugi", title: "Выездные услуги" } });

    // ==========================================
    // ПОДНАПРАВЛЕНИЯ ГИНЕКОЛОГИИ (УРОВЕНЬ 2)
    // ==========================================
    console.log('Создание поднаправлений для гинекологии на основе официального прайса...');

    const subGynProfilaktika = await db.subdirection.create({
        data: { slug: 'profilaktika-i-skrining', title: 'Профилактика и Скрининг', directionId: ginekologiya.id }
    });
    const subAkusherstvo = await db.subdirection.create({
        data: { slug: 'akusherstvo', title: 'Акушерство', directionId: ginekologiya.id }
    });
    const subGynPatologii = await db.subdirection.create({
        data: { slug: 'lechenie-patologij-shejki-matki', title: 'Лечение патологий шейки матки', directionId: ginekologiya.id }
    });
    const subGynSurgery = await db.subdirection.create({
        data: { slug: 'malye-operacii-i-manipulyacii', title: 'Малые операции и Манипуляции', directionId: ginekologiya.id }
    });
    const subVms = await db.subdirection.create({
        data: { slug: 'kontracepciya-i-podderzhka-vms', title: 'Контрацепция и Поддержка (ВМС)', directionId: ginekologiya.id }
    });
    const subGynAesthetics = await db.subdirection.create({
        data: { slug: 'regeneraciya-i-estetika', title: 'Регенерация и Эстетика', directionId: ginekologiya.id }
    });

    // ==========================================
    // ПРАЙС ГИНЕКОЛОГИИ: ЧАСТЬ 2 (СКРИНИНГ И АКУШЕРСТВО)
    // ==========================================
    console.log('Наполнение услуг скрининга и акушерства...');

    // --- Профилактика и Скрининг ---
    await db.medicalService.create({
        data: {
            slug: 'priem-ginekologa-gevorgyan', title: 'Прием гинеколога (Геворгян А.П.)', price: 5000,
            seoDescription: 'Консультация и амбулаторный прием врача-гинеколога Геворгян А.П. в Клинике Вербенкина.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'priem-ginekologa-martirosyan', title: 'Прием гинеколога (Мартиросян А.Б.)', price: 3500,
            seoDescription: 'Консультация и амбулаторный прием врача-гинеколога Мартиросян А.Б. в Клинике Вербенкина.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'pap-test-1-preparat', title: 'ПАП-тест (1 препарат)', price: 1792,
            seoDescription: 'Цитологическое исследование мазка с шейки матки на наличие атипичных клеток.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'pap-test-2-preparata', title: 'ПАП-тест (2 препарата)', price: 1890,
            seoDescription: 'Расширенное цитологическое исследование мазка из цервикального канала и шейки матки.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'uzi-malogo-taza-gevorgyan', title: 'УЗИ малого таза (Геворгян А.П.)', price: 3400,
            seoDescription: 'Экспертное гинекологическое ультразвуковое исследование малого таза у доктора Геворгян А.П.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'uzi-malogo-taza-martirosyan', title: 'УЗИ малого таза (Мартиросян А.Б.)', price: 2900,
            seoDescription: 'Гинекологическое ультразвуковое исследование малого таза у доктора Мартиросян А.Б.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'uzi-molochnyh-zhelez-gevorgyan', title: 'УЗИ молочных желез (Геворгян А.П.)', price: 2600,
            seoDescription: 'Ультразвуковая диагностика молочных желез и регионарных лимфоузлов у доктора Геворгян А.П.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'videokolposkopiya-gevorgyan', title: 'Видеокольпоскопия расширенная (Геворгян А.П.)', price: 3600,
            seoDescription: 'Расширенное исследование шейки матки с видеовизуализацией у доктора Геворгян А.П.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'videokolposkopiya-martirosyan', title: 'Видеокольпоскопия расширенная (Мартиросян А.Б.)', price: 3200,
            seoDescription: 'Расширенное исследование шейки матки с видеовизуализацией у доктора Мартиросян А.Б.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'vulvoskopiya', title: 'Вульвоскопия', price: 3200,
            seoDescription: 'Осмотр и диагностика наружных половых органов под увеличением кольпоскопа.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'aspiracionnaya-biopsiya-endometriya', title: 'Аспирационная (Пайпель) биопсия (без стоимости гистологии)', price: 4900,
            seoDescription: 'Забор образца ткани эндометрия при помощи тонкого катетера Пайпеля.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'biopsiya-shejki-matki', title: 'Биопсия шейки матки (без стоимости гистологии)', price: 6500,
            seoDescription: 'Взятие биопсийного материала тканей шейки матки для гистологического анализа.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'follikulometriya', title: 'Фолликулометрия', price: 2900,
            seoDescription: 'Ультразвуковой мониторинг созревания фолликулов и изменений эндометрия в динамике.',
            directionId: ginekologiya.id, subdirectionId: subGynProfilaktika.id
        }
    });

    // --- Акушерство ---
    await db.medicalService.create({
        data: {
            slug: 'uzi-ploda-2-trimestr', title: 'Ультразвуковое исследование плода (второй триместр)', price: 3700,
            seoDescription: 'Плановое скрининговое УЗИ во 2 триместре беременности в Клинике Вербенкина.',
            directionId: ginekologiya.id, subdirectionId: subAkusherstvo.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'uzi-ploda-3-trimestr', title: 'Ультразвуковое исследование плода (третий триместр)', price: 4500,
            seoDescription: 'Плановое скрининговое УЗИ в 3 триместре беременности на экспертном аппарате.',
            directionId: ginekologiya.id, subdirectionId: subAkusherstvo.id
        }
    });

    // ==========================================
    // ПРАЙС ГИНЕКОЛОГИИ: ЧАСТЬ 3 (ЛЕЧЕНИЕ И ХИРУРГИЯ)
    // ==========================================
    console.log('Наполнение услуг лечения патологий шейки матки и малых операций...');

    // --- Лечение патологий шейки матки ---
    await db.medicalService.create({
        data: {
            slug: 'lechenie-shejki-radiovolnovym-sposobom', title: 'Лечение шейки матки радиоволновым способом', price: 6900,
            seoDescription: 'Бережная радиоволновая терапия доброкачественных патологий шейки матки в Клинике Вербенкина.',
            directionId: ginekologiya.id, subdirectionId: subGynPatologii.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'radiovolnovaya-koagulyaciya-shejki', title: 'Радиоволновая коагуляция шейки матки', price: 8500,
            seoDescription: 'Прижигание и деструкция патологических участков шейки матки радиоволновым аппаратом Сургитрон.',
            directionId: ginekologiya.id, subdirectionId: subGynPatologii.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'kriodestrukciya-novoobrazovaniya', title: 'Криодеструкция новообразования на половых органах', price: 2400,
            seoDescription: 'Удаление доброкачественных кожных новообразований интимной зоны жидким азотом.',
            directionId: ginekologiya.id, subdirectionId: subGynPatologii.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'vskrytie-kist-nabotovyh-zhelez', title: 'Вскрытие кист наботовых желез / шейки матки', price: 8500,
            seoDescription: 'Хирургическое опорожнение ретенционных кист (наботовых кист) на шейке матки.',
            directionId: ginekologiya.id, subdirectionId: subGynPatologii.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'snyatie-shvov-s-shejki-matki', title: 'Снятие швов с шейки матки', price: 2600,
            seoDescription: 'Амбулаторная процедура снятия хирургических швов с шейки матки врачом-гинекологом.',
            directionId: ginekologiya.id, subdirectionId: subGynPatologii.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'konizaciya-shejki-matki', title: 'Конизация шейки матки', price: 19500,
            seoDescription: 'Радиоволновая или лазерная конизация (эксцизия) шейки матки при тяжелых дисплазиях.',
            directionId: ginekologiya.id, subdirectionId: subGynPatologii.id
        }
    });

    // --- Малые операции и Манипуляции ---
    await db.medicalService.create({
        data: {
            slug: 'udalenie-polipa-polosti-matki', title: 'Удаление полипа женских половых органов', price: 9000,
            seoDescription: 'Полипэктомия — удаление полипов цервикального канала или полости матки.',
            directionId: ginekologiya.id, subdirectionId: subGynSurgery.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'razdelnoe-diagnosticheskoe-vyskablivanie-rdv', title: 'Раздельное диагностическое выскабливание (РДВ) полости матки', price: 16000,
            seoDescription: 'Малая гинекологическая операция РДВ цервикального канала и полости матки.',
            directionId: ginekologiya.id, subdirectionId: subGynSurgery.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'vskrytie-abscessa-naruzhnyh-organov', title: 'Вскрыствие абсцесса наружных половых органов', price: 9900,
            seoDescription: 'Хирургическое лечение и дренирование абсцесса большой железы преддверия (бартолинита).',
            directionId: ginekologiya.id, subdirectionId: subGynSurgery.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'udalenie-kondilom-do-10', title: 'Удаление кондилом/папиллом (до 10 элементов)', price: 9900,
            seoDescription: 'Аппаратная деструкция папилломатозных новообразований интимной зоны (до 10 шт).',
            directionId: ginekologiya.id, subdirectionId: subGynSurgery.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'udalenie-kondilom-bolee-10', title: 'Удаление кондилом/папиллом (более 10 элементов)', price: 16500,
            seoDescription: 'Комплексное лазерное/радиоволновое удаление множественных кондилом (более 10 шт).',
            directionId: ginekologiya.id, subdirectionId: subGynSurgery.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'udalenie-novoobrazovaniya-lekarstvennoe', title: 'Удаление новообразования лекарственными препаратами (до 5 элементов)', price: 650,
            seoDescription: 'Химическая деструкция мелких генитальных папиллом специализированными растворами.',
            directionId: ginekologiya.id, subdirectionId: subGynSurgery.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'udalenie-inorodnogo-tela', title: 'Удаление инородного тела из влагалища', price: 6000,
            seoDescription: 'Амбулаторное извлечение инородных предметов из влагалища врачом-гинекологом.',
            directionId: ginekologiya.id, subdirectionId: subGynSurgery.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'razdelenie-sinehij', title: 'Разделение синехий малых половых губ (у детей)', price: 8900,
            seoDescription: 'Бережное амбулаторное разделение сращений малых половых губ у девочек в Зеленограде.',
            directionId: ginekologiya.id, subdirectionId: subGynSurgery.id
        }
    });
    // ==========================================
    // ПРАЙС ГИНЕКОЛОГИИ: ЧАСТЬ 4 (ВМС И ЭСТЕТИКА)
    // ==========================================
    console.log('Наполнение услуг контрацепции и эстетической инъекционной гинекологии...');

    // --- Контрацепция и Поддержка (ВМС) ---
    await db.medicalService.create({
        data: {
            slug: 'vvedenie-vms-kaylina', title: 'Введение ВМС «Кайлины» (без стоимости спирали)', price: 6000,
            seoDescription: 'Постановка гормональной внутриматочной терапевтической системы Кайлина в Клинике Вербенкина.',
            directionId: ginekologiya.id, subdirectionId: subVms.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'vvedenie-vms-mirena', title: 'Введение ВМС «Мирена» (без стоимости спирали)', price: 6000,
            seoDescription: 'Постановка внутриматочной лечебно-контрацептивной гормональной системы Мирена.',
            directionId: ginekologiya.id, subdirectionId: subVms.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'vvedenie-vms-standart', title: 'Введение внутриматочного контрацептива (ВМС) (без стоимости спирали)', price: 4000,
            seoDescription: 'Классическая установка внутриматочного простейшего или медьсодержащего контрацептива.',
            directionId: ginekologiya.id, subdirectionId: subVms.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'udalenie-vms', title: 'Удаление внутриматочной спирали', price: 3500,
            seoDescription: 'Амбулаторное извлечение внутриматочной спирали (ВМС) врачом-гинекологом.',
            directionId: ginekologiya.id, subdirectionId: subVms.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'vvedenie-pessariya', title: 'Введение/извлечение влагалищного поддерживающего кольца (пессария)', price: 4000,
            seoDescription: 'Установка или замена акушерского/гинекологического разгружающего пессария или кольца.',
            directionId: ginekologiya.id, subdirectionId: subVms.id
        }
    });

    // --- Регенерация и Эстетика ---
    await db.medicalService.create({
        data: {
            slug: 'uvelichenie-tochki-g', title: 'Увеличение точки G', price: 38900,
            seoDescription: 'Аугментация (моделирование) точки G филлерами гиалуроновой кислоты для повышения чувствительности.',
            directionId: ginekologiya.id, subdirectionId: subGynAesthetics.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'unmenshenie-vlagalishcha-2ml', title: 'Инъекционное уменьшение объема влагалища (2 мл)', price: 38900,
            seoDescription: 'Безоперационная интимная пластика сужения объема влагалища препаратами гиалуроновой кислоты.',
            directionId: ginekologiya.id, subdirectionId: subGynAesthetics.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'unmenshenie-vlagalishcha-4ml', title: 'Инъекционное уменьшение объема влагалища (4 мл)', price: 45900,
            seoDescription: 'Расширенная инъекционная контурная пластика стенок влагалища филлерами гиалуроновой кислоты (объем 4 мл).',
            directionId: ginekologiya.id, subdirectionId: subGynAesthetics.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'korrekciya-malyh-gub-1ml', title: 'Инъекционная коррекция малых половых губ (1 мл)', price: 24900,
            seoDescription: 'Интимный филлинг малых половых губ для восстановления объема, устранения асимметрии и дефектов.',
            directionId: ginekologiya.id, subdirectionId: subGynAesthetics.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'korrekciya-bolshih-gub-2ml', title: 'Инъекционная коррекция половых губ (2 мл)', price: 38900,
            seoDescription: 'Восстановление объема, упругости и формы больших половых губ специализированными филлерами (объем 2 мл).',
            directionId: ginekologiya.id, subdirectionId: subGynAesthetics.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'plazmalifting-1-zona', title: 'Плазмалифтинг (1 зона)', price: 8000,
            seoDescription: 'PRP-терапия интимной зоны — регенерация и омоложение тканей собственной плазмой (1 зона).',
            directionId: ginekologiya.id, subdirectionId: subGynAesthetics.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'plazmalifting-2-zony', title: 'Плазмалифтинг (2 зоны)', price: 9500,
            seoDescription: 'Комплексная PRP-терапия двух анатомических интимных зон в Клинике Вербенкина в Зеленограде.',
            directionId: ginekologiya.id, subdirectionId: subGynAesthetics.id
        }
    });
    await db.medicalService.create({
        data: {
            slug: 'vnutrimatochnaya-instillyaciya-plazmoj', title: 'Внутриматочная инстилляция плазмой', price: 3300,
            seoDescription: 'Орошение и регенеративное лечение полости матки (эндометрия) активированной PRP-плазмой.',
            directionId: ginekologiya.id, subdirectionId: subGynAesthetics.id
        }
    });


    // ==========================================
    // 5. НАПОЛНЕНИЕ ЭКСПЕРТНОГО БЛОГА ПО КАТЕГОРИЯМ
    // ==========================================
    console.log('Шаг 5: Создание публикаций блога по категориям...');

    await db.post.create({
        data: {
            type: 'article',
            slug: 'lechenie-vypadeniya-volos-sovremennye-metody',
            title: 'Лечение выпадения волос: современные методы и подходы в трихологии',
            seoDescription: 'Экспертная статья главного врача Клиники Вербенкина о причинах алопеции и методах лечения выпадения волос в Зеленограде.',
            content: `Выпадение волос — актуальная проблема. Комплексный подход в Клинике Вербенкина включает медикаментозное лечение, наружную терапию и инъекционные методики (мезотерапия, PRP-терапия).`,
            authorId: docBasova.id
        }
    });

    await db.post.create({
        data: {
            type: 'advice',
            slug: 'pitanie-pri-obostrenii-gastrita-sovety-vracha',
            title: 'Питание при обострении гастрита: главные советы врача-гастроэнтеролога',
            seoDescription: 'Практические рекомендации и советы гастроэнтеролога Аминуллы А. В. по диете и режиму питания при остром гастрите.',
            content: `При обострении гастрита крайне важен щадящий режим. Исключите острое, жареное, газированные напитки и фастфуд. Питайтесь дробно, небольшими порциями 5-6 раз в день. Еда должна быть теплой, комфортной температуры.`,
            authorId: docAminulla.id
        }
    });

    await db.post.create({
        data: {
            type: 'disease',
            slug: 'atopicheskij-dermatit-simptomy-i-lechenie',
            title: 'Атопический дерматит: симптомы, причины возникновения и методы лечения',
            seoDescription: 'Медицинский справочник заболеваний: подробный разбор атопического дерматита у детей и взрослых от аллерголога Афониной Е. С.',
            content: `Атопический дерматит — хроническое аллергическое заболевание кожи. Проявляется сильным зудом, шелушением и покраснениями. Лечение включает исключение триггеров-аллергенов, регулярное применение эмолентов для увлажнения кожи и местную противовоспалительную терапию под контролем врача.`,
            authorId: docAfonina.id
        }
    });

    // ========================================================
    // Шаг 6: НАПОЛНЕНИЕ МОДУЛЯ АКЦИЙ И СПЕЦПРЕДЛОЖЕНИЙ
    // ========================================================
    console.log('Шаг 6: Загрузка действующих акций клиники...');

    await db.promo.create({
        data: {
            slug: 'skidка-na-uzi-malogo-taza',
            title: 'Комплексный чекап: УЗИ малого таза со скидкой',
            description: 'Экспертная ультразвуковая диагностика женского здоровья у ведущих специалистов отделения. Включает развернутую консультацию и протокол исследования.',
            discountBadge: '-20%',
            oldPrice: 3400,
            newPrice: 2700,
            untilDate: 'до 31.07.2026',
            isActive: true
        }
    });

    await db.promo.create({
        data: {
            slug: 'pervichnyj-priem-ginekologa-martirosyan',
            title: 'Знакомство со специалистом: прием гинеколога Мартиросян А.Б.',
            description: 'Специальная цена на первичный амбулаторный прием, осмотр и составление плана профилактики для новых пациентов клиники.',
            discountBadge: '3000 ₽',
            oldPrice: 3500,
            newPrice: 3000,
            untilDate: 'до 30.06.2026',
            isActive: true
        }
    });

    await db.promo.create({
        data: {
            slug: 'kompleks-analizov-shchitovidnaya-zheleza',
            title: 'Здоровье щитовидной железы: скрининг гормонов',
            description: 'Лабораторный комплекс ключевых показателей (ТТГ, Т4 свободный, Анти-ТПО) со скидкой в процедурном кабинете первого филиала.',
            discountBadge: 'Выгодно',
            oldPrice: 2400,
            newPrice: 1850,
            untilDate: 'до 15.07.2026',
            isActive: true
        }
    });

    // ========================================================
    // Шаг 7: НАПОЛНЕНИЕ МОДУЛЯ НОВОСТЕЙ КЛИНИКИ
    // ========================================================
    console.log('Шаг 7: Загрузка актуальных новостей клиники...');

    await db.news.create({
        data: {
            slug: 'otkrytie-vtorogo-filiala-zelenograd',
            title: 'Официальное открытие второго специализированного филиала',
            content: 'Рады сообщить об успешном расширении Клиники Вербенкина! Наш второй филиал полностью сфокусирован на экспертной дерматологии, трихологии, аллергологии и косметологии. Новое отделение укомплектовано передовыми аппаратами и готово к ежедневному приему взрослых и детей.',
            isImportant: true
        }
    });

    await db.news.create({
        data: {
            slug: 'grafik-raboty-leto-2026',
            title: 'Переход на продленный летний режим работы отделений',
            content: 'Для вашего максимального удобства в летний период мы увеличиваем время приема специалистов. Второй филиал теперь работает без выходных и перерывов с 10:00 до 20:00. Забор лабораторных анализов в первом филиале по-прежнему доступен с 07:30.',
            isImportant: false
        }
    });

    await db.news.create({
        data: {
            slug: 'novoe-oborudovanie-uzi-expert',
            title: 'Поступление нового цифрового УЗИ-аппарата экспертного класса',
            content: 'Диагностический парк отделения функциональной диагностики пополнился флагманской ультразвуковой системой с технологией сверхвысокой детализации тканей. Исследования на новом аппарате уже доступны по предварительной записи у доктора Рашниковой Е.А.',
            isImportant: false
        }
    });


    console.log('--- База данных Клиники Вербенкина успешно засиджена действующим штатом и блогом! ---');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await db.$disconnect(); });