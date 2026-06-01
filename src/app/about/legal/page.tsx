import Link from "next/link";
import Breadcrumbs from "~/components/shared/breadcrumbs";

export default function LegalPage() {
    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "О клинике", href: "/about" },
        { label: "Юридическая информация" }
    ];

    return (
        <main className="container mx-auto max-w-4xl px-4 py-16 text-center">
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-3xl font-bold text-slate-900 mt-6 mb-4">
                Юридические документы
            </h1>
            <p className="text-slate-500 mb-8">
                Раздел находится в процессе наполнения. Все официальные документы вы можете найти на странице правовой информации.
            </p>
            <Link
                href="/about/pravovaya-informaciya"
                className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition"
            >
                Перейти к правовой информации
            </Link>
        </main>
    );
}
