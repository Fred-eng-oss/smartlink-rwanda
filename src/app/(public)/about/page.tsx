import React from "react";
import Image from "next/image";
import { getSettings, getTeamMembers } from "@/lib/data";
import { Target, Eye, Sparkles, Award, Users, History, Calendar, CheckSquare } from "lucide-react";
import type { TeamMember } from "@/lib/types";

export const metadata = {
    title: "About Us",
    description: "Learn more about SmartLink Rwanda, our core mission, vision, corporate values, leadership team, and company history.",
};

export default async function AboutPage() {
    const settings = await getSettings();
    const team = await getTeamMembers();

    const values = [
        {
            title: "Innovation",
            desc: "Constantly pushing tech boundaries and adopting state-of-the-art frameworks to deliver premium assets.",
            icon: Sparkles,
            color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40",
        },
        {
            title: "Excellence",
            desc: "Committed to delivering pristine coding quality, high server uptimes, and professional certification trainings.",
            icon: Award,
            color: "text-indigo-650 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40",
        },
        {
            title: "Integrity",
            desc: "Operating with absolute transparency, honesty, and corporate accountability in all consulting and systems.",
            icon: CheckSquare,
            color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40",
        },
    ];

    const history = [
        { year: "2018", title: "Inception & Consulting", desc: "Started as a small ICT consulting group advising local SMEs in Kigali." },
        { year: "2020", title: "Academy & Core Systems Development", desc: "Launched IT certifications classes and custom business platform codebases." },
        { year: "2023", title: "Enterprise Scaling & Hosting Hub", desc: "Registered SmartLink Rwanda, expanded laboratories in Gisozi, and enabled high-availability local server hosting." },
        { year: "2026", title: "Advanced Corporate Web Applications", desc: "Unifying Web, SMS, email gateways, and student e-learning portals under one cloud framework." },
    ];

    return (
        <div className="space-y-24 py-12 pb-20">
            {/* 1. PAGE HEADER */}
            <section className="bg-slate-900 text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.3),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">About SmartLink Rwanda</h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto font-medium">
                        Bridging the technology gap through education, consulting, software engineering, and premium infrastructure.
                    </p>
                </div>
            </section>

            {/* 2. OVERVIEW + MISSION & VISION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Overview */}
                    <div className="lg:col-span-6 space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-905 dark:text-white font-display">
                            Empowering Rwanda's Digital Future
                        </h2>
                        <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 rounded-full" />
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                            {settings.about_overview}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            SmartLink Rwanda was founded to address the critical shortage of high-standard digital tools and practical tech curriculums in East Africa. Our certified professionals assist corporate clients to scope requirements, engineer solutions, and train manpower.
                        </p>
                    </div>

                    {/* Right: Mission & Vision */}
                    <div className="lg:col-span-6 space-y-8">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 flex gap-6 hover:shadow-lg transition-shadow">
                            <div className="p-3.5 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 shrink-0 w-fit h-fit">
                                <Target className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white font-display">Our Mission</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    To empower individuals and businesses with state-of-the-art software systems, high-quality trainings, and expert digital auditing, fostering growth in East Africa's digital economy.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 flex gap-6 hover:shadow-lg transition-shadow">
                            <div className="p-3.5 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0 w-fit h-fit">
                                <Eye className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white font-display">Our Vision</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    To be Rwanda's leading hub for digital acceleration, recognized for elite engineering frameworks, certified education modules, and trusted software reliability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE VALUES */}
            <section className="bg-slate-50/50 dark:bg-slate-900/10 py-16 border-y border-Slate-200/50 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">Our Core Values</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            The fundamental guidelines guiding our everyday consultation operations and certification student classrooms.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((v) => (
                            <div key={v.title} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                                <div className={`p-4 rounded-full mb-6 ${v.color}`}>
                                    <v.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 font-display">{v.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. COMPANY HISTORY TIMELINE */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">Our Journey</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        A brief chronological walkthrough of our corporate development in Kigali.
                    </p>
                </div>

                <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-32 space-y-12">
                    {history.map((h, i) => (
                        <div key={i} className="relative pl-8 md:pl-12">
                            {/* Year badge left */}
                            <div className="absolute -left-4 md:-left-36 top-1.5 md:w-28 text-left md:text-right font-extrabold text-blue-600 dark:text-blue-400 text-lg flex items-center md:justify-end gap-2 md:gap-0">
                                <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 md:hidden">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                </span>
                                {h.year}
                            </div>

                            {/* Timeline dot */}
                            <div className="absolute -left-[5px] top-3.5 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-450 border border-white dark:border-slate-950" />

                            {/* Timeline Card */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">{h.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">{h.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. TEAM MEMBERS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
                    <span className="text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-650 dark:text-blue-400 rounded-full px-3 py-1.5 uppercase tracking-widest border border-blue-100 dark:border-blue-900/30">
                        Our People
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">Leadership Team</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Meet the experienced leaders steering SmartLink Rwanda's educational and technical offerings.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {team.map((member: TeamMember) => (
                        <div key={member.id} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col sm:flex-row">
                            {/* Fake avatar badge for team photo placeholder */}
                            <div className="sm:w-2/5 min-h-[160px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 relative">
                                <Users className="w-12 h-12 stroke-[1]" />
                                <span className="absolute bottom-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">SmartLink Leader</span>
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white font-display">{member.name}</h3>
                                    <p className="text-xs font-bold text-blue-600 dark:text-blue-450 uppercase tracking-wider">{member.role}</p>
                                    <p className="text-xs text-slate-505 dark:text-slate-405 leading-relaxed pt-2">{member.bio}</p>
                                </div>
                                {(member.email || member.phone) && (
                                    <div className="text-[10px] font-medium text-slate-400 border-t border-slate-100 dark:border-slate-800/60 pt-3 space-y-0.5">
                                        {member.email && <p>Email: {member.email}</p>}
                                        {member.phone && <p>Phone: {member.phone}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. STRATEGIC COMPANY GOALS */}
            <section className="bg-slate-50/50 dark:bg-slate-900/10 py-16 border-y border-slate-205/50 dark:border-slate-800/50 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">Company Goals</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                            <span className="text-blue-600 text-3xl font-extrabold font-display">01.</span>
                            <h3 className="font-bold text-slate-900 dark:text-white mt-2 mb-1.5 font-display">Tech Enablement</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Provide 10,000+ youth with digital skills training in programming and networking by 2030.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                            <span className="text-indigo-650 text-3xl font-extrabold font-display">02.</span>
                            <h3 className="font-bold text-slate-900 dark:text-white mt-2 mb-1.5 font-display">Enterprise Automation</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Deploy secure, custom ERP systems to help 500+ regional SMEs digitally automate operations.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                            <span className="text-emerald-600 text-3xl font-extrabold font-display">03.</span>
                            <h3 className="font-bold text-slate-900 dark:text-white mt-2 mb-1.5 font-display">Local Infrastructure</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Support Rwanda's digital strategy by offering affordable local server hosting and DNS nodes.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
