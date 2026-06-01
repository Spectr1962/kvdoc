import { type Metadata } from "next";
import Breadcrumbs from "~/components/shared/Breadcrumbs";
import MedicalDisclaimer from "~/components/shared/MedicalDisclaimer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Политика конфиденциальности | Клиника Вербенкина",
    description: "Положение об обработке и защите персональных данных пациентов многопрофильного медицинского центра Клиника Вербенкина (ООО «ВЕРБМЕД») в Зеленограде.",
    alternates: { canonical: "https://kvdoc.ru" }
};

export default function PrivacyPage() {
    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Правовая информация", href: "/about/pravovaya-informaciya" },
        { label: "Политика конфиденциальности" }
    ];

    return (
        <main className="container mx-auto max-w-4xl px-4 py-10 space-y-8 select-none">
            <Breadcrumbs items={breadcrumbItems} />

            {/* Контентный блок без рамок с легкой тенью */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xs space-y-6 text-slate-700 font-light text-xs md:text-sm leading-relaxed">
                <div className="border-b border-slate-100 pb-4 space-y-2">
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                        Политика конфиденциальности
                    </h1>
                    <p className="text-[11px] text-slate-400 font-medium">Последнее обновление: Май 2026 г.</p>
                </div>

                <section className="space-y-2">
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">1. Общие положения</h2>
                    <p>
                        Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных физических лиц (пациентов и посетителей сайта) многопрофильного медицинского центра Клиника Вербенкина (ООО «ВЕРБМЕД», ИНН 8603243520, ОГРН 1218600004510).
                    </p>
                    <p>
                        Мы обеспечиваем полную конфиденциальность ваших персональных и медицинских данных в соответствии с Федеральным законом РФ № 152-ФЗ «О персональных данных» и нормами врачебной тайны.
                    </p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">2. Какие данные мы обрабатываем</h2>
                    <p>При использовании форм записи на сайте или обращении в регистратуру мы можем запрашивать:</p>
                    <ul className="list-disc pl-5 space-y-1 font-medium text-slate-800 text-xs">
                        <li>• Фамилию, Имя и Отчество пациента;</li>
                        <li>• Контактный номер телефона;</li>
                        <li>• Адрес электронной почты (Email);</li>
                        <li>• Желаемую тему обращения или выбранного специалиста.</li>
                    </ul>
                </section>

                <section className="space-y-2">
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">3. Цели сбора информации</h2>
                    <p>Ваши данные используются исключительно для:</p>
                    <ul className="list-disc pl-5 space-y-1 font-medium text-slate-800 text-xs">
                        <li>• Предварительной записи на приемы врачей, УЗИ и лабораторные анализы;</li>
                        <li>• Оперативной связи администраторов регистратуры для подтверждения записи;</li>
                        <li>• Предоставления ответов на вопросы через интерактивные формы обратной связи.</li>
                    </ul>
                </section>

                <section className="space-y-2">
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">4. Защита и передача данных</h2>
                    <p>
                        ООО «ВЕРБМЕД» принимает необходимые организационные и технические меры для защиты персональной информации от неправомерного или случайного доступа, уничтожения, изменения, блокирования или копирования. Передача данных третьим лицам категорически исключена, за исключением случаев, прямо предусмотренных действующим законодательством РФ.
                    </p>
                </section>
            </div>

            <MedicalDisclaimer />
        </main>
    );
}
