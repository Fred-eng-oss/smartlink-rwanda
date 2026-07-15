import React from "react";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen, Award, CheckCircle } from "lucide-react";
import { getPrograms } from "@/lib/data";
import type { Program } from "@/lib/types";

export const metadata = {
    title: "IT Training Programs",
    description: "Explore professional IT certification programs at SmartLink Rwanda: Programming, Networking, Cyber Security, Graphic Design, Digital Marketing, and Computer Basics.",
};

export default async function ProgramsPage() {
    const programs = await getPrograms();

    return (
        <div className="space-y-0 pb-20">
            {/* 1. HERO BANNER */}
            <section className="relative bg-gradient-to-br from-[#071A35] via-[#0D2847] to-[#F59E0B] py-20 sm:py-28 overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.2),transparent)]" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#00A86B]/10 rounded-full blur-3xl -mr-20 -mb-20" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block text-xs font-bold bg-white/10 text-white rounded-full px-4 py-2 uppercase tracking-widest border border-white/20 mb-6">
                        Professional Certification Tracks
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-tight">
                        IT Training Academy
                    </h1>
                    <p className="text-white/60 text-sm sm:text-base mt-5 max-w-2xl mx-auto leading-relaxed">
                        Advance your career with industry-mapped certification programs designed for the East African digital economy.
                    </p>
                </div>
            </section>

            {/* 2. PROGRAMS LISTING */}
            <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {programs.map((prog: Program) => (
                            <div
                                key={prog.slug}
                                id={prog.slug}
                                className="bg-[#F8FAFC] dark:bg-[#071A35] rounded-2xl border border-[#E2E8F0] dark:border-slate-700/50 overflow-hidden card-hover group"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                    {/* Left accent bar */}
                                    <div className="lg:col-span-3 bg-gradient-to-br from-[#071A35] to-[#0F62FE] p-8 flex flex-col justify-center items-center text-white text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,168,107,0.15),transparent)]" />
                                        <div className="relative z-10 space-y-3">
                                            <BookOpen className="w-10 h-10 opacity-70 mx-auto" />
                                            <h3 className="text-xl font-extrabold font-display">{prog.name}</h3>
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B]">
                                                <Clock className="w-3.5 h-3.5" />
                                                {prog.duration}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:col-span-9 p-8 space-y-6">
                                        <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                                            {prog.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Requirements */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                                    <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                                                    Requirements ({prog.requirements.length})
                                                </h4>
                                                <ul className="space-y-2">
                                                    {prog.requirements.map((req: string, idx: number) => (
                                                        <li key={idx} className="text-sm text-[#0F172A]/70 dark:text-[#F1F5F9]/70 flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 mt-2" />
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Learning Outcomes */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                                    <CheckCircle className="w-3.5 h-3.5 text-[#00A86B]" />
                                                    What You&apos;ll Learn
                                                </h4>
                                                <ul className="space-y-2">
                                                    {prog.learningOutcomes.map((out: string, idx: number) => (
                                                        <li key={idx} className="text-sm text-[#0F172A]/70 dark:text-[#F1F5F9]/70 flex items-start gap-2">
                                                            <CheckCircle className="w-3.5 h-3.5 text-[#00A86B] shrink-0 mt-0.5" />
                                                            {out}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-700/50 flex flex-col sm:flex-row gap-4">
                                            <Link
                                                href={`/programs/${prog.slug}`}
                                                className="inline-flex items-center gap-1.5 bg-[#0F62FE] hover:bg-[#0B4FD1] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md shadow-[#0F62FE]/20 transition-all duration-300"
                                            >
                                                View Full Details <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="inline-flex items-center gap-1.5 bg-white dark:bg-[#071A35] hover:bg-[#F8FAFC] dark:hover:bg-[#0D2847] text-[#0F172A] dark:text-[#F1F5F9] font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border border-[#E2E8F0] dark:border-slate-700/50 transition-all duration-300"
                                            >
                                                Register Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CTA */}
            <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-gradient-to-br from-[#071A35] to-[#0F62FE] rounded-3xl p-10 sm:p-14 text-center text-white overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#00A86B]/10 rounded-full -ml-10 -mb-10 blur-2xl" />
                        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
                                Ready to Start Your IT Career?
                            </h2>
                            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                                Secure your spot in our next cohort. Limited seats available for all programs at our Gisozi training center.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link
                                    href="/register"
                                    className="bg-white hover:bg-[#F8FAFC] text-[#071A35] font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 duration-200"
                                >
                                    Register Now
                                </Link>
                                <Link
                                    href="/contact"
                                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full border border-white/20 transition-colors"
                                >
                                    Ask a Question
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
