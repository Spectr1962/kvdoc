import Link from "next/link";

export default function CareersPage() {
    return (
        <main className="container mx-auto px-4 py-16 text-center max-w-2xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Вакансии клиники
            </h1>
            <p className="text-slate-500 mb-8">
                В данный момент у нас нет открытых вакансий. Вы можете связаться с нами через страницу контактов.
            </p>
            <Link
                href="/contacts"
                className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition"
            >
                Перейти в контакты
            </Link>
        </main>
    );
}
