import React from "react";
import Link from "next/link";
import { CheckCircle, Clock, ArrowRight, BookOpen, Award } from "lucide-react";
import { getPrograms } from "@/lib/data";
import type { Program } from "@/lib/types";

export const metadata = {
    title: "IT Training Programs",
    description: "Explore professional IT certification programs at SmartLink Rwanda: Programming, Networking, Cyber Security, Graphic Design, Digital Marketing, and Computer Basics.",
};

export default async function ProgramsPage() {
    const programs = await getPrograms();

    const programColors = [
        "from-blue-600 to-blue-800",
        "from-indigo-600 to-indigo-800",
        "from-emerald-600 to-emerald-800",
        "from-purple-600 to-purple-800",
        "from-amber-600 to-amber-800",
        "from-slate-600 to-slate-800",
    ];

    return (
        <div className="space-y-24 py-12 pb-20">
            {/* 1. PAGE HEADER */}
            <section className="bg-slate-900 text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.3),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">IT Training Academy</h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto font-medium">
                        Advance your career with industry-mapped certification programs designed for the East African digital economy.
                    </p>
                </div>
            </section>

            {/* 2. PROGRAMS LISTING */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full px-3 py-1.5 uppercase tracking-widest border border-indigo-100 dark:border-indigo-900/30">
                        Professional Certification Tracks
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                        Explore Our Programs
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Each program combines theory with practical labs, led by certified industry instructors at our Gisozi training center.
                    </p>
                </div>

                <div className="space-y-8">
                    {programs.map((prog: Program, index: number) => (
                        <div
                            key={prog.slug}
                            id={prog.slug}
                            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                {/* Color Banner */}
                                <div className={`lg:col-span-3 bg-gradient-to-br ${programColors[index % programColors.length]} p-8 flex flex-col justify-center items-center text-white text-center`}>
                                    <BookOpen className="w-12 h-12 mb-4 opacity-80" />
                                    <h3 className="text-xl font-extrabold font-display">{prog.name}</h3>
                                    <div className="flex items-center gap-1.5 mt-3 text-sm font-semibold">
                                        <Clock className="w-4 h-4" />
                                        {prog.duration}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="lg:col-span-9 p-8 space-y-6">
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {prog.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Requirements */}
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                                <Award className="w-3.5 h-3.5" />
                                                Requirements
                                            </h4>
                                            <ul className="space-y-2">
                                                {prog.requirements.map((req: string, idx: number) => (
                                                    <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Learning Outcomes */}
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                What You&apos;ll Learn
                                            </h4>
                                            <ul className="space-y-2">
                                                {prog.learningOutcomes.map((out: string, idx: number) => (
                                                    <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                                        {out}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href={`/programs/${prog.slug}`}
                                            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md shadow-blue-500/20 transition-all"
                                        >
                                            View Full Details <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/30 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border border-indigo-100 dark:border-indigo-900/20 transition-all"
                                        >
                                            Register Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. CTA */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-indigo-700 to-blue-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-indigo-500/10 select-none">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full -ml-20 -mb-20 blur-2xl" />
                    <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
                            Ready to Start Your IT Career?
                        </h2>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                            Secure your spot in our next cohort. Limited seats available for all programs at our Gisozi training center.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link
                                href="/register"
                                className="bg-white hover:bg-slate-100 text-indigo-900 font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 duration-200"
                            >
                                Register Now
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-transparent hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full border border-white/30 transition-colors"
                            >
                                Ask a Question
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
