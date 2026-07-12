import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Newspaper, ArrowRight } from "lucide-react";
import Image from "next/image";
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
        <div className="space-y-0">
            {/* Article Header */}
            <section className="relative bg-gradient-to-br from-[#0F62FE] via-[#0B4FD1] to-[#00A86B] text-white py-20 sm:py-28 overflow-hidden select-none">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00A86B]/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/news" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-bold text-xs uppercase tracking-wider mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> All Articles
                    </Link>
                    <div className="flex items-center gap-4 text-xs font-bold text-white/60 uppercase tracking-widest mb-4">
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
                    <p className="text-sm text-white/70 mt-4 max-w-2xl leading-relaxed">
                        {article.summary}
                    </p>
                </div>
            </section>

            {/* Article Content */}
            <section className="bg-[#F8FAFC] py-20 sm:py-28">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <article className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E5E7EB]/60 shadow-sm">
                        {/* Featured Image */}
                        <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-[#0F62FE] to-[#00A86B] rounded-xl mb-8 flex items-center justify-center overflow-hidden">
                            {article.featuredImageUrl ? (
                                <Image
                                    src={article.featuredImageUrl}
                                    alt={article.title}
                                    width={800}
                                    height={400}
                                    className="w-full h-full object-cover rounded-xl"
                                    unoptimized
                                />
                            ) : (
                                <span className="font-extrabold text-white/15 uppercase tracking-wider text-2xl select-none font-display">
                                    SmartLink News
                                </span>
                            )}
                        </div>

                        <div
                            className="prose prose-slate max-w-none text-sm leading-relaxed prose-headings:text-[#1F2937] prose-a:text-[#0F62FE] prose-strong:text-[#1F2937]"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </article>
                </div>
            </section>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="bg-white py-20 sm:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-extrabold text-[#1F2937] font-display mb-8">
                            More Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArticles.map((a: NewsArticle) => (
                                <Link
                                    key={a.slug}
                                    href={`/news/${a.slug}`}
                                    className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]/60 shadow-sm card-hover group"
                                >
                                    <div className="h-32 bg-gradient-to-br from-[#0F62FE] to-[#00A86B] flex items-center justify-center">
                                        <span className="font-extrabold text-white/20 uppercase tracking-wider text-sm select-none font-display">SmartLink</span>
                                    </div>
                                    <div className="p-6 space-y-2">
                                        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">
                                            {new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                        </span>
                                        <h3 className="font-bold text-sm text-[#1F2937] font-display leading-tight line-clamp-2 group-hover:text-[#0F62FE] transition-colors">
                                            {a.title}
                                        </h3>
                                        <span className="text-xs font-bold text-[#0F62FE] flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
