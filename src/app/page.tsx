import Link from "next/link";
import { db } from "~/server/db"; // Именованный импорт из контекста проекта
import DirectionIcon from "~/components/shared/direction-icons"; // ✅ Исправлено на строчные буквы
import { ServicesTabs } from "~/components/main/services-tabs"; // ✅ Исправлено на строчные буквы
import MedicalDisclaimer from "~/components/shared/medical-disclaimer"; // Дефолтный импорт
import MyReviewsWidget from "~/components/shared/my-reviews-widget";
import Script from "next/script";
import PromosSlider from "~/components/shared/promos-slider";
import DoctorsSlider from "~/components/shared/doctors-slider";
import {
  Stethoscope,
  TestTube,
  Truck,
  Activity,
  Sparkles,
  Scissors,
  Syringe,
  HeartHandshake,
  Brain,
  ShieldCheck,
  Pill,
  Eye,
  ChevronRight
} from "lucide-react";

// Отключаем статический кэш Next.js 15 для этой страницы, чтобы прайс-лист всегда был актуален
export const dynamic = "force-dynamic";

// Жесткий список разрешенных 13 направлений клиники КВ-ДОК для защиты от мусора в БД
const ALLOWED_SLUGS = [
  "analizy",
  "ginekologiya",
  "gastroenterologiya",
  "dermatologiya",
  "nevrologiya",
  "trihologiya",
  "allergologiya-immunologiya",
  "uzi",
  "lazernaya-epilyaciya",
  "endokrinologiya",
  "massazh",
  "procedurnyj-kabinet",
  "vyezdnye-uslugi",
];
export default async function HomePage() {
  // 1. ЗАПРОС НАПРАВЛЕНИЙ ПРИЕМА (Для Блока медицинских отделений)
  const directions = await db.direction.findMany({
    include: {
      subdirections: {
        select: {
          id: true,
          slug: true,
          title: true
        }
      }
    },
    orderBy: { title: "asc" }
  });

  // 2. ЗАПРОС ДИНАМИЧЕСКИХ АКЦИЙ (Для карусели-гармошки)
  const promos = await db.promo.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });

  // 3. ЗАПРОС ПОПУЛЯРНЫХ УСЛУГ (Строго один раз, без дублирования константы)
  const popularServices = await db.medicalService.findMany({
    where: { isPopular: true },
    take: 6,
    include: {
      direction: { select: { slug: true } },
      subdirection: { select: { slug: true } }
    },
    orderBy: { price: "asc" }
  });

  // 4. ЗАПРОС ИСКЛЮЧИТЕЛЬНО ВРАЧЕЙ КЛИНИКИ (Сестры и администраторы отсекаются)
  const doctors = await db.doctor.findMany({
    where: {
      NOT: [
        { specialty: { contains: "сестра" } },
        { specialty: { contains: "Сестра" } },
        { specialty: { contains: "процедур" } },
        { specialty: { contains: "Администратор" } }
      ]
    },
    orderBy: { name: "asc" }
  });

  // 5. ЗАПРОС СВЕЖИХ ПУБЛИКАЦИЙ ДЛЯ НОВОСТЕЙ МЕДИАЦЕНТРА
  const newsList = await db.news.findMany({
    take: 3,
    orderBy: [
      { isImportant: "desc" },
      { createdAt: "desc" }
    ]
  });

  // 6. ЗАПРОС ПОСТОВ ДЛЯ НИЖНЕГО БЛОКА СТАТЕЙ МЕДИАЦЕНТРА
  const posts = await db.post.findMany({
    take: 3,
    orderBy: { createdAt: "desc" }
  });
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      {/* 1. HERO BLOCK (Полноэкранный баннер 90vh) */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white min-h-[90vh] flex flex-col justify-center overflow-hidden pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="container mx-auto max-w-7xl px-6 relative z-10 w-full flex flex-col justify-center">
          <div className="h-36 min-h-[9rem] w-full block shrink-0" />
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Многопрофильная Клиника Вербенкина
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Профессиональная медицинская помощь рядом с вами
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              Диагностика, лечение и профилактика заболеваний по 13 ключевым медицинским направлениям в Зеленограде. Современное высокоточное оборудование и опытные сертифицированные специалисты.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/services"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md hover:shadow-blue-500/10 transition-all duration-200 text-sm md:text-base text-center"
              >
                Каталог всех услуг
              </Link>
              <a
                href="#contacts"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl border border-white/15 transition duration-200 text-sm md:text-base text-center backdrop-blur-xs"
              >
                Контакты клиники
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* 2. МЕДИЦИНСКИЕ ОТДЕЛЕНИЯ КЛИНИКИ */}
      <section id="departments" className="py-16 bg-slate-50/50">
        <div className="container mx-auto max-w-7xl px-6 space-y-10">
          {/* Заголовок секции */}
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 select-none">
              Направления приема
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Медицинские отделения
            </h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Клиника Вербенкина оказывает комплексную амбулаторно-поликлиническую помощь по всем ключевым направлениям современной доказательной медицины в Зеленограде.
            </p>
          </div>

          {/* Сетка направлений клиники */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {!directions || directions.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl shadow-sm lg:col-span-4">
                <p className="text-xs text-slate-400 font-medium italic">Список отделений центра обновляется администрацией</p>
              </div>
            ) : (
              directions.map((dir) => {
                const currentSlug = dir.slug.trim().toLowerCase();

                // Карта соответствий новых слагов в формате kebab-case и монохромных иконок Lucide
                const iconMap: Record<string, { icon: React.ReactNode; bg: string; status: string; desc: string }> = {
                  "ginekologiya": {
                    icon: <Stethoscope className="w-4 h-4" />,
                    bg: "bg-pink-50 text-pink-600 group-hover:bg-pink-100",
                    status: "Экспертный прием",
                    desc: "Комплексное ведение женского здоровья, лечение патологий шейки матки, УЗИ малого таза и планирование беременности."
                  },
                  "uzi": {
                    icon: <Eye className="w-4 h-4" />,
                    bg: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
                    status: "Аппараты 4D",
                    desc: "Ультразвуковые исследования всех органов на цифровых сканерах экспертного класса с максимальной детализацией."
                  },
                  "analizy": {
                    icon: <TestTube className="w-4 h-4" />,
                    bg: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
                    status: "Лаборатория 0+",
                    desc: "Срочный забор крови, биохимия, генетические тесты и ПЦР. Результаты поступают на вашу электронную почту."
                  },
                  "dermatologiya": {
                    icon: <Sparkles className="w-4 h-4" />,
                    bg: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
                    status: "Прием взрослых и детей",
                    desc: "Лечение акне, экземы, псориаза, удаление новообразований жидким азотом и дерматоскопия родинок."
                  },
                  "trihologiya": {
                    icon: <Scissors className="w-4 h-4" />,
                    bg: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100",
                    status: "Лечение волос",
                    desc: "Профессиональная диагностика кожи головы, лечение выпадения волос, себореи и трихограмма."
                  },
                  "allergologiya-immunologiya": {
                    icon: <Pill className="w-4 h-4" />,
                    bg: "bg-teal-50 text-teal-600 group-hover:bg-teal-100",
                    status: "Аллерготесты",
                    desc: "Выявление пищевых, сезонных и бытовых аллергенов, составление паспорта аллергика для детей."
                  },
                  "endokrinologiya": {
                    icon: <Activity className="w-4 h-4" />,
                    bg: "bg-violet-50 text-violet-600 group-hover:bg-violet-100",
                    status: "Гормональный чекап",
                    desc: "Коррекция веса, лечение заболеваний щитовидной железы, сахарного диабета и дисфункций метаболизма."
                  },
                  "gastroenterologiya": {
                    icon: <ShieldCheck className="w-4 h-4" />,
                    bg: "bg-lime-50 text-lime-700 group-hover:bg-lime-100",
                    status: "Лечение ЖКТ",
                    desc: "Диагностика и терапия гастрита, язвенной болезни, дисбактериоза и заболеваний печени."
                  },
                  "nevrologiya": {
                    icon: <Brain className="w-4 h-4" />,
                    bg: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100",
                    status: "Неврология",
                    desc: "Лечение острых болей в спине и суставах, защемлений нервов, мигреней, головокружений и бессонницы."
                  },
                  "procedurnyj-kabinet": {
                    icon: <Syringe className="w-4 h-4" />,
                    bg: "bg-red-50 text-red-600 group-hover:bg-red-100",
                    status: "Уколы и капельницы",
                    desc: "Внутримышечные и внутривенные инъекции, постановка капельниц, бережный уход под контролем медсестры."
                  },
                  "massazh": {
                    icon: <HeartHandshake className="w-4 h-4" />,
                    bg: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
                    status: "Медицинский массаж",
                    desc: "Лечебный массаж спины, воротниковой зоны и суставов для реабилитации после травм и снятия мышечных зажимов."
                  },
                  "vyezdnye-uslugi": {
                    icon: <Truck className="w-4 h-4" />,
                    bg: "bg-sky-50 text-sky-600 group-hover:bg-sky-100",
                    status: "Выезд на дом",
                    desc: "Квалифицированная медицинская помощь, забор анализов и ЭКГ в комфортных условиях у вас дома."
                  },
                  "lazernaya-epilyaciya": {
                    icon: <Sparkles className="w-4 h-4" />,
                    bg: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
                    status: "Гладкая кожа",
                    desc: "Безопасное удаление нежелательных волос на передовом диодном лазерном оборудовании без боли."
                  }
                };

                // Запасной дефолтный конфиг
                const config = iconMap[currentSlug] || {
                  icon: <Activity className="w-4 h-4" />,
                  bg: "bg-slate-50 text-slate-600 group-hover:bg-slate-100",
                  status: "Амбулаторный прием",
                  desc: "Специализированная диагностика, профилактика и эффективные методы амбулаторного лечения заболеваний отделения."
                };

                return (
                  <Link
                    key={dir.id}
                    href={`/services/${dir.slug}`}
                    className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[160px] relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
                          {dir.title.charAt(0).toUpperCase() + dir.title.slice(1).toLowerCase()}
                        </h3>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm ${config.bg}`}>
                          {config.icon}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                        {config.desc}
                      </p>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 pt-3 border-t border-slate-50 flex items-center justify-between select-none">
                      <span className={dir.subdirections?.length > 0 ? "text-indigo-500 font-semibold" : "text-slate-400 font-medium"}>
                        {dir.subdirections?.length > 0 ? `${dir.subdirections.length} поднаправлений` : config.status}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all stroke-[2.5]" />
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
      {/* 3. ОБЪЕДИНЕННЫЙ МЕДИА-СЛАЙДЕР */}
      <section id="promos" className="py-24 bg-white overflow-hidden select-none">
        <div className="container mx-auto max-w-7xl px-6 space-y-12">
          {/* Заголовок секции */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600">
                Специальные предложения
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Акции и программы лояльности
              </h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Сезонные скидки центра, комплексные чекапы и постоянные социальные программы для всей семьи в Зеленограде. Наведите курсор на карточку, чтобы приостановить таймер прокрутки.
              </p>
            </div>
            {/* Кнопка-капсула перехода */}
            <Link
              href="/mediacentre?tab=promo"
              className="px-6 h-10 text-white text-xs font-black tracking-wide rounded-full shadow-lg hover:scale-102 hover:shadow-indigo-500/20 transition-all duration-200 text-center flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #3b82f6 100%)"
              }}
            >
              Все акции и программы →
            </Link>
          </div>

          {/* Интерактивный слайдер */}
          <div className="pb-6">
            <PromosSlider promos={promos} />
          </div>
        </div>
      </section>
      {/* 4. ПОПУЛЯРНЫЕ УСЛУГИ И ЦЕНЫ */}
      <section className="py-20 bg-slate-50/50 select-none">
        <div className="container mx-auto max-w-7xl px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 select-none">
                Прейскурант
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Популярные услуги и цены
              </h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Ознакомьтесь со стоимостью базовых процедур, диагностических исследований и приемов специалистов, наиболее востребованных среди пациентов нашего центра.
              </p>
            </div>
            {/* Кнопка полного каталога */}
            <Link
              href="/services"
              className="px-6 h-10 text-white text-xs font-black tracking-wide rounded-full shadow-lg hover:scale-102 hover:shadow-indigo-500/20 transition-all duration-200 text-center flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #3b82f6 100%)"
              }}
            >
              Все услуги и цены →
            </Link>
          </div>

          {/* Сетка популярных услуг */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {!popularServices || popularServices.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl shadow-sm lg:col-span-2">
                <p className="text-xs text-slate-400 font-medium italic">Список популярных услуг находится на стадии формирования</p>
              </div>
            ) : (
              popularServices.map((service) => {
                const dirSlug = service.direction.slug;
                // ✅ ИСПРАВЛЕНО: приведен к единому стандарту 'general' роутов без поднаправлений
                const subSlug = service.subdirection?.slug || "general";

                return (
                  <div
                    key={service.id}
                    className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-none"
                  >
                    {/* Левая часть: Название услуги и ссылка */}
                    <div className="space-y-1 flex-1">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {service.title}
                      </h3>
                      {/* ✅ ИСПРАВЛЕНО: Ссылки теперь формируют корректный 4-уровневый URL по новым kebab-case папкам */}
                      <Link
                        href={`/services/${dirSlug}/${subSlug}/${service.slug}`}
                        className="text-[11px] font-medium text-slate-600 group-hover:text-blue-500 group-hover:font-semibold transition-all inline-block"
                      >
                        Подробнее об услуге →
                      </Link>
                    </div>

                    {/* Правая часть: Стоимость и быстрая запись */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-50 pt-3 sm:pt-0 shrink-0">
                      <span className="text-sm font-black text-slate-950 whitespace-nowrap bg-slate-50 px-3 py-1.5 rounded-xl">
                        {service.price.toLocaleString("ru-RU")} ₽
                      </span>
                      <a
                        href="#contacts"
                        className="px-5 h-8 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-full shadow-sm transition-all duration-150 flex items-center justify-center whitespace-nowrap"
                      >
                        Запись
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      {/* 5. НАШИ ВРАЧИ */}
      <section id="doctors" className="py-24 bg-slate-50/50 select-none">
        <div className="container mx-auto max-w-7xl px-6 space-y-12">
          {/* Заголовок секции */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 select-none">
                Команда
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Наши врачи
              </h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Профессиональные специалисты с высокой квалификацией, подтвержденными аккредитациями Минздрава РФ и бережным отношением к каждому пациенту.
              </p>
            </div>
            <Link
              href="/doctors"
              className="px-6 h-10 text-white text-xs font-black tracking-wide rounded-full shadow-lg hover:scale-102 hover:shadow-indigo-500/20 transition-all duration-200 text-center flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #3b82f6 100%)"
              }}
            >
              Все специалисты клиники →
            </Link>
          </div>

          <DoctorsSlider doctors={doctors} />
        </div>
      </section>
      {/* 6. МЕДИАЦЕНТР (СТАТЬИ) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6 space-y-10">
          {/* Заголовок и кнопка перехода в хаб */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 select-none">
                Экспертные материалы
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Медиацентр
              </h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Актуальные статьи, полезные медицинские публикации, разборы симптомов и практические рекомендации от практикующих врачей Клиники Вербенкина.
              </p>
            </div>
            <Link
              href="/mediacentre"
              className="px-6 h-10 text-white text-xs font-black tracking-wide rounded-full shadow-lg hover:scale-102 hover:shadow-indigo-500/20 transition-all duration-200 text-center flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #3b82f6 100%)"
              }}
            >
              Перейти в Медиацентр →
            </Link>
          </div>

          {/* Сетка карточек экспертных статей */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts && posts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="group flex flex-col justify-between bg-slate-50/40 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-600 uppercase tracking-wider text-[9px] font-black shadow-sm">
                      Статья
                    </span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                  </div>
                </div>
                {/* Подвал карточки статьи */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600">
                  {/* ✅ ИСПРАВЛЕНО: Роут переведен на строчные буквы согласно новой структуре папки /blog/[post-slug] */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
                  >
                    Читать материал →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 7. НОВОСТИ КЛИНИКИ */}
      <section id="news" className="py-20 bg-white select-none">
        <div className="container mx-auto max-w-7xl px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 select-none">
                События центра
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Новости клиники
              </h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Следите за ключевыми событиями медицинского центра: графиками работы в праздничные дни, обновлением парка оборудования и открытием новых лечебных направлений.
              </p>
            </div>
            <Link
              href="/mediacentre?tab=news"
              className="px-6 h-10 text-white text-xs font-black tracking-wide rounded-full shadow-lg hover:scale-102 hover:shadow-indigo-500/20 transition-all duration-200 text-center flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #3b82f6 100%)"
              }}
            >
              All новости клиники →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!newsList || newsList.length === 0 ? (
              <div className="p-8 text-center bg-slate-50/50 rounded-3xl shadow-sm lg:col-span-3">
                <p className="text-xs text-slate-400 font-medium italic">Лента новостей центра находится на стадии обновления</p>
              </div>
            ) : (
              newsList.slice(0, 3).map((item) => {
                const isImportant = item.isImportant;
                return (
                  <div
                    key={item.id}
                    className="group bg-slate-50/40 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[220px] border-none"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className={`px-2.5 py-0.5 rounded-md uppercase tracking-wider text-[9px] font-black shadow-sm ${isImportant ? "bg-amber-50 text-amber-600 animate-pulse" : "bg-blue-50 text-blue-600"
                          }`}>
                          {isImportant ? "Важно" : "Событие"}
                        </span>
                        <span className="text-slate-400 font-medium">
                          {new Date(item.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                          {item.content}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end text-[11px] font-bold">
                      <Link
                        href="#contacts"
                        className="text-slate-600 group-hover:text-blue-500 group-hover:font-semibold group-hover:translate-x-0.5 transition-all flex items-center gap-0.5"
                      >
                        Читать полностью →
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      {/* 8. ОТЗЫВЫ ПАЦИЕНТОВ */}
      <section id="reviews" className="py-20 bg-white scroll-mt-16">
        <div className="container mx-auto max-w-7xl px-6 space-y-10">
          {/* Заголовок секции */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 select-none">
                Обратная связь
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                Отзывы пациентов
              </h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Мы искренне благодарны за каждый отклик. Ваше мнение помогает специалистам Клиники Вербенкина становиться еще лучше и поддерживать экспертный уровень медицины.
              </p>
            </div>
            {/* Кнопка-ссылка на сторонний агрегатор */}
            <a
              href="https://yandex.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 h-10 text-white text-xs font-black tracking-wide rounded-full shadow-lg hover:scale-102 hover:shadow-indigo-500/20 transition-all duration-200 text-center flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #3b82f6 100%)"
              }}
            >
              Оставить отзыв на Яндексе →
            </a>
          </div>

          {/* Вызов нашего изолированного клиентского компонента виджета отзывов */}
          {/* ✅ ПУТЬ ИМПОРТА ИСПРАВЛЕН: Теперь MyReviewsWidget подтягивается из нижнего регистра kebab-case */}
          <MyReviewsWidget />
        </div>
      </section>
      {/* 9. КОНТАКТЫ И СХЕМА ПРОЕЗДА */}
      <section id="contacts" className="py-20 bg-slate-50/50 scroll-mt-16">
        <div className="container mx-auto max-w-7xl px-6 space-y-10">
          {/* Заголовок секции */}
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 select-none">
              Ждем вас
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Контакты и схема проезда
            </h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Многопрофильный медицинский центр расположен в доступной локации Зеленограда на Георгиевском проспекте. Проложите удобный маршрут на карте ниже.
            </p>
          </div>

          {/* Интеграция интерактивного виджета Яндекс.Карт без рамок */}
          <div className="w-full bg-white rounded-3xl p-2 shadow-sm transition-shadow duration-300 hover:shadow-md overflow-hidden">
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "460px", minHeight: "460px" }}>
              {/* Официальный интерактивный iframe-виджет Клиники Вербенкина */}
              <iframe
                src="https://yandex.ru"
                width="100%"
                height="100%"
                allowFullScreen={true}
                style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                loading="lazy"
                title="Официальная интерактивная карта проезда — Клиника Вербенкина"
              />
            </div>
          </div>

          {/* Юридический блок внизу карты */}
          <div className="bg-white rounded-2xl shadow-sm p-6 text-xs text-slate-500 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Регистратура</p>
              <a href="tel:+74951222178" className="text-base font-black text-blue-600 hover:text-blue-700 transition block pt-0.5">
                +7 (495) 122-21-78
              </a>
              <p className="text-slate-400 font-medium">г. Зеленоград, Георгиевский проспект, д. 37, к. 3</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Лицензирование</p>
              <p className="font-bold text-slate-800 pt-0.5">ООО "ВЕРБМЕД"</p>
              <p className="text-slate-400 leading-normal font-medium">
                Лицензия № Л041-01137-77/00336955 на осуществление медицинской деятельности. Выдана Департаментом здравоохранения города Москвы. Действует бессрочно.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 10. ОБЯЗАТЕЛЬНЫЙ YMYL ДИСКЛЕЙМЕР МИНЗДРАВА */}
      <div className="mt-auto">
        <MedicalDisclaimer />
      </div>
    </div>
  )
}