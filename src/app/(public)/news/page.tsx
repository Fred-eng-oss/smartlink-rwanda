import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getNews } from "@/lib/data";
import type { NewsArticle } from "@/lib/types";

export const metadata = {
    title: "News & Articles",
    description: "Stay up to date with the latest news, insights, and updates from SmartLink Rwanda about ICT services, training programs, and digital transformation.",
};

export default async function NewsPage() {
    const newsList = await getNews();

    return (
        <div className="space-y-24 py-12 pb-20">
            {/* 1. PAGE HEADER */}
            <section className="bg-slate-900 text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.2),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">News & Articles</h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto font-medium">
                        Stay informed with the latest updates from SmartLink Rwanda on ICT developments, industry trends, and company milestones.
                    </p>
                </div>
            </section>

            {/* 2. ARTICLES GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {newsList.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 dark:text-slate-500 text-sm font-semibold">No articles published yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsList.map((article: NewsArticle) => (
                            <div
                                key={article.slug}
                                className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                {/* Placeholder Image */}
                                <div className="h-48 bg-gradient-to-br from-blue-700 to-indigo-900 relative flex items-center justify-center">
                                    <span className="font-extrabold text-white/20 uppercase tracking-wider text-lg select-none font-display">
                                        SmartLink News
                                    </span>
                                </div>

                                <div className="p-6 flex flex-col flex-grow space-y-4">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(article.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {article.author}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight font-display">
                                        <Link href={`/news/${article.slug}`} className="hover:text-blue-500 transition-colors">
                                            {article.title}
                                        </Link>
                                    </h3>

                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-grow">
                                        {article.summary}
                                    </p>

                                    <Link
                                        href={`/news/${article.slug}`}
                                        className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800/80"
                                    >
                                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
