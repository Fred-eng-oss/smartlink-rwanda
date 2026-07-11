import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Clock, ArrowLeft, ArrowRight, Award, BookOpen, Users, GraduationCap } from "lucide-react";
import { getPrograms } from "@/lib/data";
import type { Program } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const programs = await getPrograms();
    const program = programs.find((p: Program) => p.slug === slug);
    if (!program) return { title: "Program Not Found" };
    return {
        title: `${program.name} Program`,
        description: program.description,
    };
}

export default async function ProgramDetailPage({ params }: Props) {
    const { slug } = await params;
    const programs = await getPrograms();
    const program = programs.find((p: Program) => p.slug === slug);

    if (!program) notFound();

    const programColors = [
        "from-blue-600 to-blue-800",
        "from-indigo-600 to-indigo-800",
        "from-emerald-600 to-emerald-800",
        "from-purple-600 to-purple-800",
        "from-amber-600 to-amber-800",
        "from-slate-600 to-slate-800",
    ];
    const colorIndex = programs.findIndex((p: Program) => p.slug === slug);

    return (
        <div className="space-y-24 py-12 pb-20">
            {/* 1. HERO */}
            <section className={`bg-gradient-to-br ${programColors[colorIndex >= 0 ? colorIndex : 0]} text-white py-16 relative overflow-hidden select-none`}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/programs" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-bold text-xs uppercase tracking-wider mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> All Programs
                    </Link>
                    <div className="max-w-3xl space-y-6">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-8 h-8 opacity-80" />
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 border border-white/20 uppercase tracking-wider">
                                <Clock className="w-3.5 h-3.5" /> {program.duration}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight">
                            {program.name} Academy
                        </h1>
                        <p className="text-base text-white/80 leading-relaxed font-medium max-w-2xl">
                            {program.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. PROGRAM DETAILS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Requirements */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600 dark:text-amber-400">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                                    Program Requirements
                                </h2>
                            </div>
                            <ul className="space-y-3">
                                {program.requirements.map((req: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Learning Outcomes */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                                    What You&apos;ll Learn
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {program.learningOutcomes.map((out: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                                            {out}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Course Structure (Mock) */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                                    Course Structure
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {["Introduction & Fundamentals", "Core Concepts & Practical Labs", "Advanced Topics & Real-world Projects", "Capstone Project & Assessment", "Certification Preparation"].map((module, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                        <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 font-display">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">{module}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 sticky top-28 space-y-6">
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                                Quick Info
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{program.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                    <Users className="w-5 h-5 text-indigo-500" />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Class Size</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">15-20 Students</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                    <GraduationCap className="w-5 h-5 text-emerald-500" />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certification</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">SmartLink Certified</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                                <Link
                                    href="/register"
                                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-blue-500/20 transition-all"
                                >
                                    Register for This Program
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block w-full text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all"
                                >
                                    Ask a Question
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CTA */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
                    <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                            Ready to Begin Your Journey?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                            Join the next cohort and gain the skills to thrive in Rwanda&apos;s growing tech industry.
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wide px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/20 transition-all font-display"
                            >
                                Register Now <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
