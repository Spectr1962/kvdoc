import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "~/server/db";
import Breadcrumbs from "~/components/shared/Breadcrumbs";
import MedicalDisclaimer from "~/components/shared/MedicalDisclaimer";
import { type Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ postSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const postSlug = resolvedParams?.postSlug;

    if (!postSlug) return {};

    const post = await db.post.findUnique({
        where: { slug: postSlug },
        select: { title: true, seoDescription: true }
    });

    if (!post) return {};

    return {
        title: post.title,
        description: post.seoDescription,
        alternates: {
            canonical: `https://kvdoc.ru{postSlug}`,
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const resolvedParams = await params;
    const postSlug = resolvedParams?.postSlug;

    if (!postSlug) notFound();

    const post = await db.post.findUnique({
        where: { slug: postSlug },
        include: {
            author: {
                include: {
                    directions: { select: { slug: true }, take: 1 }
                }
            }
        }
    });

    if (!post) notFound();

    const firstDirection = post.author?.directions?.[0];
    const authorDirectionSlug = firstDirection ? firstDirection.slug : "ginekologiya";

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Журнал", href: "/blog" },
        { label: post.title }
    ];

    return (
        <main className="container mx-auto px-4 py-10 space-y-12">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Левая колонка (2/3): Текст статьи (ИСПРАВЛЕНО — убрана border, заменена на shadow-xs) */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
                    <div className="space-y-2 border-b border-slate-100 pb-4">
                        <div className="text-xs text-slate-400 font-semibold">
                            Опубликовано: {new Date(post.createdAt).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })}
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-light">
                        {post.content}
                    </div>
                </div>

                {/* Правая колонка (1/3): Карточка автора статьи (ИСПРАВЛЕНО — убрана border) */}
                {post.author && (
                    <div className="lg:col-span-1 space-y-6">
                        <div
                            className="p-6 rounded-2xl space-y-4 shadow-md text-white"
                            style={{
                                background: 'linear-gradient(to bottom, #0f172a, #172554, #0f172a)',
                                color: '#ffffff'
                            }}
                        >
                            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">Автор материала</h3>

                            <div className="space-y-4 pt-1">
                                <div className="space-y-1">
                                    <h4 className="text-base font-bold text-white">{post.author.name}</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-light">{post.author.specialty}</p>
                                </div>

                                <p className="text-xs text-slate-300 leading-relaxed line-clamp-4 font-light">
                                    {post.author.biography}
                                </p>

                                <div className="pt-4 border-t border-white/10 space-y-2.5">
                                    <Link
                                        href={`/doctors/${authorDirectionSlug}/${post.author.slug}`}
                                        className="block w-full text-center px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition"
                                    >
                                        Профиль и дипломы врача →
                                    </Link>
                                    <a
                                        href="#contacts"
                                        className="block w-full text-center px-4 py-2.5 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-500 transition shadow-xs"
                                    >
                                        Записаться на прием
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <MedicalDisclaimer />
        </main>
    );
}
