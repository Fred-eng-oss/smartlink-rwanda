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

    return (
        <div className="space-y-0 pb-20">
            {/* 1. HERO */}
            <section className="relative bg-navy py-20 sm:py-28 overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,98,254,0.25),transparent)]" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link
                        href="/programs"
                        className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-bold text-xs uppercase tracking-wider mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> All Programs
                    </Link>
                    <div className="max-w-3xl space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/15 rounded-2xl backdrop-blur-sm">
                                <BookOpen className="w-8 h-8 text-primary-light" />
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-accent-gold/20 border border-accent-gold/30 text-accent-gold uppercase tracking-wider">
                                <Clock className="w-3.5 h-3.5" /> {program.duration}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white leading-tight">
                            {program.name} Academy
                        </h1>
                        <p className="text-base text-slate-300 leading-relaxed font-medium max-w-2xl">
                            {program.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. PROGRAM DETAILS */}
            <section className="bg-white dark:bg-[#132D52] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* Requirements */}
                            <div className="bg-surface rounded-2xl p-8 border border-light-gray/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-accent-gold/10 rounded-xl">
                                        <Award className="w-5 h-5 text-accent-gold" />
                                    </div>
                                    <h2 className="text-xl font-extrabold text-dark-text dark:text-[#F8FAFC] font-display">
                                        Program Requirements
                                    </h2>
                                </div>
                                <ul className="space-y-3">
                                    {program.requirements.map((req: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-light-gray/50">
                                            <CheckCircle className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-sm text-dark-text font-medium">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Learning Outcomes */}
                            <div className="bg-surface rounded-2xl p-8 border border-light-gray/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-secondary/10 rounded-xl">
                                        <GraduationCap className="w-5 h-5 text-secondary" />
                                    </div>
                                    <h2 className="text-xl font-extrabold text-dark-text font-display">
                                        What You&apos;ll Learn
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    {program.learningOutcomes.map((out: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-light-gray/50">
                                            <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary font-bold text-sm flex items-center justify-center shrink-0 font-display">
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-sm text-dark-text font-medium pt-2">{out}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-surface rounded-2xl p-8 border border-light-gray/50 sticky top-28 space-y-6">
                                <h3 className="text-lg font-extrabold text-dark-text font-display">
                                    Quick Info
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-light-gray/50">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-[10px] font-bold text-secondary-text uppercase tracking-wider">Duration</p>
                                            <p className="text-sm font-bold text-dark-text">{program.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-light-gray/50">
                                        <Users className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-[10px] font-bold text-secondary-text uppercase tracking-wider">Class Size</p>
                                            <p className="text-sm font-bold text-dark-text">15-20 Students</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-light-gray/50">
                                        <GraduationCap className="w-5 h-5 text-secondary" />
                                        <div>
                                            <p className="text-[10px] font-bold text-secondary-text uppercase tracking-wider">Certification</p>
                                            <p className="text-sm font-bold text-dark-text">SmartLink Certified</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-light-gray/60 space-y-3">
                                    <Link
                                        href="/register"
                                        className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-primary/20 transition-all duration-300"
                                    >
                                        Register for This Program
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="block w-full text-center bg-white hover:bg-surface text-dark-text font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-light-gray/50 transition-all"
                                    >
                                        Ask a Question
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CTA */}
            <section className="bg-surface dark:bg-[#0B1F3A] py-20 sm:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-gradient-to-br from-navy to-primary-dark rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/10 rounded-full -ml-10 -mb-10 blur-2xl" />
                        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                Ready to Begin Your Journey?
                            </h2>
                            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                                Join the next cohort and gain the skills to thrive in Rwanda&apos;s growing tech industry.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 bg-white hover:bg-surface text-navy font-bold text-sm uppercase tracking-wide px-8 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 duration-200"
                                >
                                    Register Now <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wide px-8 py-3.5 rounded-full border border-white/20 transition-colors"
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
