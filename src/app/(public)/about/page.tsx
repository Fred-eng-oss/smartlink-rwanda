import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSettings, getTeamMembers } from "@/lib/data";
import { Target, Eye, Sparkles, Award, Users, CheckSquare, ArrowRight, Heart, Lightbulb, Handshake, BookOpen, Building2 } from "lucide-react";
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
            title: "Integrity",
            desc: "Operating with absolute transparency, honesty, and corporate accountability in all consulting engagements and software deployments.",
            icon: CheckSquare,
            color: "bg-[#0F62FE]/10 text-[#0F62FE]",
        },
        {
            title: "Innovation",
            desc: "Constantly pushing tech boundaries and adopting state-of-the-art frameworks to deliver premium digital assets that outperform expectations.",
            icon: Lightbulb,
            color: "bg-[#00A86B]/10 text-[#00A86B]",
        },
        {
            title: "Excellence",
            desc: "Committed to delivering pristine coding quality, high server uptimes, and professional certification training that sets industry benchmarks.",
            icon: Award,
            color: "bg-[#F59E0B]/10 text-[#F59E0B]",
        },
        {
            title: "Community",
            desc: "Empowering Rwanda's youth with practical digital skills, fostering local tech ecosystems, and driving inclusive economic growth across East Africa.",
            icon: Heart,
            color: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
        },
    ];

    const milestones = [
        { year: "2018", title: "Founded", desc: "SmartLink Rwanda established in Gisozi, Kigali to bridge the digital divide." },
        { year: "2019", title: "First 100 Students", desc: "Trained our first cohort of 100 students in web development and networking." },
        { year: "2021", title: "Corporate Expansion", desc: "Expanded into enterprise software development and IT consulting services." },
        { year: "2023", title: "500+ Graduates", desc: "Reached milestone of training over 500 professionals across East Africa." },
        { year: "2025", title: "E-Learning Launch", desc: "Launched online learning platform for remote IT education and certifications." },
    ];

    return (
        <div className="space-y-0 pb-20">
            {/* 1. HERO BANNER */}
            <section className="relative bg-gradient-to-br from-[#071A35] via-[#0D2847] to-[#0F62FE] py-20 sm:py-28 overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,98,254,0.25),transparent)]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A86B]/10 rounded-full blur-3xl -ml-20 -mb-20" />
                <div className="absolute top-20 right-[20%] w-16 h-16 border border-white/10 rounded-2xl rotate-45" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block text-xs font-bold bg-white/10 text-white rounded-full px-4 py-2 uppercase tracking-widest border border-white/20 mb-6">
                        Who We Are
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-tight">
                        About SmartLink Rwanda
                    </h1>
                    <p className="text-white/60 text-sm sm:text-base mt-5 max-w-2xl mx-auto leading-relaxed">
                        Bridging the technology gap through education, consulting, software engineering, and premium digital infrastructure.
                    </p>
                </div>
            </section>

            {/* 2. COMPANY OVERVIEW */}
            <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <span className="text-xs font-bold text-[#0F62FE] uppercase tracking-widest">Our Story</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display leading-tight">
                                Empowering Rwanda&apos;s Digital Future
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-[#0F62FE] to-[#00A86B] rounded-full" />
                            <p className="text-[#64748B] dark:text-slate-400 leading-relaxed font-medium">
                                {settings.about_overview}
                            </p>
                            <p className="text-[#64748B]/70 dark:text-slate-400/70 leading-relaxed">
                                SmartLink Rwanda was founded to address the critical shortage of high-standard digital tools and practical tech curriculums in East Africa. Our certified professionals assist corporate clients to scope requirements, engineer solutions, and train manpower for the evolving digital economy.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-[#071A35] px-5 py-3 rounded-2xl border border-[#E2E8F0] dark:border-slate-700/50">
                                    <div className="p-2 bg-[#0F62FE]/10 rounded-xl">
                                        <Users className="w-5 h-5 text-[#0F62FE]" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">200+</p>
                                        <p className="text-xs text-[#64748B] dark:text-slate-400">Clients Served</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-[#071A35] px-5 py-3 rounded-2xl border border-[#E2E8F0] dark:border-slate-700/50">
                                    <div className="p-2 bg-[#00A86B]/10 rounded-xl">
                                        <Award className="w-5 h-5 text-[#00A86B]" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">8+</p>
                                        <p className="text-xs text-[#64748B] dark:text-slate-400">Years Experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-[#071A35] to-[#0F62FE] rounded-3xl p-10 text-white space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00A86B]/10 rounded-full -ml-8 -mb-8 blur-xl" />
                                <div className="relative z-10 space-y-6">
                                    <div className="p-3 bg-white/10 rounded-xl w-fit backdrop-blur-sm">
                                        <Target className="w-8 h-8 text-[#3D8BFF]" />
                                    </div>
                                    <h3 className="text-xl font-extrabold font-display">Our Purpose</h3>
                                    <p className="text-sm text-white/70 leading-relaxed">
                                        To bridge the digital divide in East Africa by providing world-class IT services, hands-on training, and enterprise-grade software solutions that transform how businesses operate.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                                            <p className="text-2xl font-extrabold font-display text-[#3D8BFF]">6+</p>
                                            <p className="text-xs text-white/50 mt-1">IT Services</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                                            <p className="text-2xl font-extrabold font-display text-[#00CC82]">6+</p>
                                            <p className="text-xs text-white/50 mt-1">Training Programs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MISSION & VISION */}
            <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-[#0D2847] rounded-2xl p-10 border border-[#E2E8F0] dark:border-slate-700/50 hover-glow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0F62FE]/5 rounded-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />
                            <div className="relative z-10 space-y-6">
                                <div className="p-4 bg-[#0F62FE]/10 rounded-2xl w-fit">
                                    <Target className="w-7 h-7 text-[#0F62FE]" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">Our Mission</h3>
                                <p className="text-[#64748B] dark:text-slate-400 leading-relaxed">
                                    To empower individuals and businesses with state-of-the-art software systems, high-quality trainings, and expert digital auditing, fostering sustainable growth in East Africa&apos;s digital economy.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#0D2847] rounded-2xl p-10 border border-[#E2E8F0] dark:border-slate-700/50 hover-glow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A86B]/5 rounded-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />
                            <div className="relative z-10 space-y-6">
                                <div className="p-4 bg-[#00A86B]/10 rounded-2xl w-fit">
                                    <Eye className="w-7 h-7 text-[#00A86B]" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">Our Vision</h3>
                                <p className="text-[#64748B] dark:text-slate-400 leading-relaxed">
                                    To be Rwanda&apos;s leading hub for digital acceleration, recognized for elite engineering frameworks, certified education modules, and trusted software reliability across the region.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CORE VALUES */}
            <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                        <span className="text-xs font-bold text-[#0F62FE] uppercase tracking-widest">What Drives Us</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                            Our Core Values
                        </h2>
                        <p className="text-[#64748B] dark:text-slate-400 leading-relaxed">
                            The fundamental principles guiding our everyday consultation operations and training programs.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v) => (
                            <div
                                key={v.title}
                                className="bg-[#F8FAFC] dark:bg-[#071A35] rounded-2xl p-8 border border-[#E2E8F0] dark:border-slate-700/50 card-hover text-center group"
                            >
                                <div className={`p-4 rounded-2xl w-fit mx-auto mb-6 ${v.color} transition-transform duration-300 group-hover:scale-110`}>
                                    <v.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-[#0F172A] dark:text-[#F1F5F9] mb-3 font-display">{v.title}</h3>
                                <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. COMPANY HISTORY / TIMELINE */}
            <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                        <span className="text-xs font-bold text-[#00A86B] uppercase tracking-widest">Our Journey</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                            Company History
                        </h2>
                    </div>
                    <div className="relative max-w-3xl mx-auto">
                        {/* Timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0F62FE] to-[#00A86B]" />
                        <div className="space-y-10">
                            {milestones.map((m, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="relative z-10 shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F62FE] to-[#00A86B] flex items-center justify-center text-white font-bold text-xs font-display shadow-lg shadow-[#0F62FE]/20">
                                            {m.year}
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-[#0D2847] rounded-2xl p-6 border border-[#E2E8F0] dark:border-slate-700/50 flex-grow">
                                        <h3 className="font-bold text-lg text-[#0F172A] dark:text-[#F1F5F9] font-display mb-1">{m.title}</h3>
                                        <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">{m.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. TEAM SECTION */}
            <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                        <span className="text-xs font-bold text-[#0F62FE] uppercase tracking-widest">Our People</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                            Leadership Team
                        </h2>
                        <p className="text-[#64748B] dark:text-slate-400 leading-relaxed">
                            Meet the experienced leaders steering SmartLink Rwanda&apos;s educational and technical offerings.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {team.map((member: TeamMember) => (
                            <div
                                key={member.id}
                                className="bg-[#F8FAFC] dark:bg-[#071A35] rounded-2xl border border-[#E2E8F0] dark:border-slate-700/50 overflow-hidden card-hover flex flex-col sm:flex-row"
                            >
                                <div className="sm:w-2/5 min-h-[180px] bg-gradient-to-br from-[#071A35] to-[#0F62FE] flex items-center justify-center relative">
                                    <Users className="w-14 h-14 text-white/30" />
                                    <span className="absolute bottom-3 text-[9px] font-bold text-white/40 uppercase tracking-widest">SmartLink</span>
                                </div>
                                <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-xl text-[#0F172A] dark:text-[#F1F5F9] font-display">{member.name}</h3>
                                        <p className="text-xs font-bold text-[#0F62FE] uppercase tracking-wider">{member.role}</p>
                                        <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed pt-1">{member.bio}</p>
                                    </div>
                                    {(member.email || member.phone) && (
                                        <div className="text-xs text-[#64748B]/60 dark:text-slate-400/60 border-t border-[#E2E8F0] dark:border-slate-700/50 pt-3 space-y-1">
                                            {member.email && <p>{member.email}</p>}
                                            {member.phone && <p>{member.phone}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. CTA */}
            <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-gradient-to-br from-[#071A35] to-[#0F62FE] rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#00A86B]/10 rounded-full -ml-10 -mb-10 blur-2xl" />
                        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                Partner With Us
                            </h2>
                            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                                Whether you need enterprise software, IT consulting, or professional training, our team is ready to deliver results.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#071A35] font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 duration-200"
                                >
                                    Contact Us <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full border border-white/20 transition-colors"
                                >
                                    View Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
