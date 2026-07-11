import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getNews } from "@/lib/data";
import type { NewsArticle } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const newsList = await getNews();
    const article = newsList.find((n: NewsArticle) => n.slug === slug);
    if (!article) return { title: "Article Not Found" };
    return {
        title: article.title,
        description: article.summary,
    };
}

export default async function NewsArticlePage({ params }: Props) {
    const { slug } = await params;
    const newsList = await getNews();
    const article = newsList.find((n: NewsArticle) => n.slug === slug);

    if (!article) notFound();

    const relatedArticles = newsList
        .filter((n: NewsArticle) => n.slug !== slug)
        .slice(0, 3);

    return (
        <div className="space-y-24 py-12 pb-20">
            {/* 1. ARTICLE HEADER */}
            <section className="bg-slate-900 text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.3),transparent)]" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/news" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-bold text-xs uppercase tracking-wider mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> All Articles
                    </Link>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(article.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {article.author}
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight max-w-3xl">
                        {article.title}
                    </h1>
                    <p className="text-sm text-slate-400 mt-4 max-w-2xl leading-relaxed">
                        {article.summary}
                    </p>
                </div>
            </section>

            {/* 2. ARTICLE CONTENT */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <article className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 sm:p-12">
                    {/* Featured Image Placeholder */}
                    <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-xl mb-8 flex items-center justify-center">
                        <span className="font-extrabold text-white/15 uppercase tracking-wider text-2xl select-none font-display">
                            SmartLink News
                        </span>
                    </div>

                    <div
                        className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>
            </section>

            {/* 3. RELATED ARTICLES */}
            {relatedArticles.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display mb-8">
                        More Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedArticles.map((a: NewsArticle) => (
                            <Link
                                key={a.slug}
                                href={`/news/${a.slug}`}
                                className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="h-32 bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center">
                                    <span className="font-extrabold text-white/20 uppercase tracking-wider text-sm select-none font-display">SmartLink</span>
                                </div>
                                <div className="p-6 space-y-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                    </span>
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display leading-tight line-clamp-2">
                                        {a.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
