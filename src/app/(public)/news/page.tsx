import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Newspaper } from "lucide-react";
import Image from "next/image";
import { getNews } from "@/lib/data";
import type { NewsArticle } from "@/lib/types";

export const metadata = {
    title: "News & Articles",
    description: "Stay up to date with the latest news, insights, and updates from SmartLink Rwanda about ICT services, training programs, and digital transformation.",
};

export default async function NewsPage() {
    const newsList = await getNews();

    return (
        <div className="space-y-0">
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-[#071A35] via-[#0D2847] to-[#0F62FE] text-white py-20 sm:py-28 overflow-hidden select-none">
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00A86B]/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                        <Newspaper className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Latest Updates</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight">
                        News & Articles
                    </h1>
                    <p className="text-white/80 text-sm sm:text-base mt-4 max-w-xl mx-auto font-medium leading-relaxed">
                        Stay informed with the latest updates from SmartLink Rwanda on ICT developments, industry trends, and company milestones.
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {newsList.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-[#0D2847] rounded-2xl border border-[#E2E8F0] dark:border-slate-700/50">
                            <Newspaper className="w-12 h-12 text-[#E2E8F0] mx-auto mb-4" />
                            <p className="text-[#64748B] dark:text-slate-400 text-sm font-semibold">No articles published yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsList.map((article: NewsArticle) => (
                                <Link
                                    key={article.slug}
                                    href={`/news/${article.slug}`}
                                    className="bg-white dark:bg-[#0D2847] rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-slate-700/50 shadow-sm card-hover flex flex-col group"
                                >
                                    {/* Image */}
                                    <div className="h-48 bg-gradient-to-br from-[#0F62FE] to-[#00A86B] relative flex items-center justify-center overflow-hidden">
                                        {article.featuredImageUrl ? (
                                            <Image
                                                src={article.featuredImageUrl}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <span className="font-extrabold text-white/15 uppercase tracking-wider text-lg select-none font-display">
                                                SmartLink News
                                            </span>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow space-y-3">
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-[#0F62FE]" />
                                                {new Date(article.createdAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3 text-[#00A86B]" />
                                                {article.author}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9] leading-tight font-display group-hover:text-[#0F62FE] dark:group-hover:text-[#3D8BFF] transition-colors">
                                            {article.title}
                                        </h3>

                                        <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed line-clamp-3 flex-grow">
                                            {article.summary}
                                        </p>

                                        <span className="font-bold text-xs uppercase tracking-wider text-[#0F62FE] flex items-center gap-1.5 pt-3 border-t border-[#E2E8F0] dark:border-slate-700/50 group-hover:text-[#0B4FD1] transition-colors">
                                            Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
