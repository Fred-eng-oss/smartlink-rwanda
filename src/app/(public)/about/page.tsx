import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSettings, getTeamMembers } from "@/lib/data";
import { Target, Eye, Sparkles, Award, Users, CheckSquare, ArrowRight, Heart, Lightbulb, Handshake } from "lucide-react";
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
            color: "bg-primary/10 text-primary",
        },
        {
            title: "Innovation",
            desc: "Constantly pushing tech boundaries and adopting state-of-the-art frameworks to deliver premium digital assets that outperform expectations.",
            icon: Lightbulb,
            color: "bg-secondary/10 text-secondary",
        },
        {
            title: "Excellence",
            desc: "Committed to delivering pristine coding quality, high server uptimes, and professional certification training that sets industry benchmarks.",
            icon: Award,
            color: "bg-accent-gold/10 text-accent-gold",
        },
        {
            title: "Community",
            desc: "Empowering Rwanda's youth with practical digital skills, fostering local tech ecosystems, and driving inclusive economic growth across East Africa.",
            icon: Heart,
            color: "bg-primary/10 text-primary",
        },
    ];

    return (
        <div className="space-y-0 pb-20">
            {/* 1. HERO BANNER */}
            <section className="relative bg-navy py-20 sm:py-28 overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,98,254,0.25),transparent)]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block text-xs font-bold bg-primary/15 text-primary-light rounded-full px-4 py-2 uppercase tracking-widest border border-primary/20 mb-6">
                        Who We Are
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-tight">
                        About SmartLink Rwanda
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-5 max-w-2xl mx-auto leading-relaxed">
                        Bridging the technology gap through education, consulting, software engineering, and premium digital infrastructure.
                    </p>
                </div>
            </section>

            {/* 2. COMPANY OVERVIEW */}
            <section className="bg-white py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Our Story</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text font-display leading-tight">
                                Empowering Rwanda&apos;s Digital Future
                            </h2>
                            <div className="w-16 h-1 bg-primary rounded-full" />
                            <p className="text-secondary-text leading-relaxed font-medium">
                                {settings.about_overview}
                            </p>
                            <p className="text-secondary-text/70 leading-relaxed">
                                SmartLink Rwanda was founded to address the critical shortage of high-standard digital tools and practical tech curriculums in East Africa. Our certified professionals assist corporate clients to scope requirements, engineer solutions, and train manpower for the evolving digital economy.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-3 bg-surface px-5 py-3 rounded-2xl border border-light-gray">
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-extrabold text-dark-text font-display">200+</p>
                                        <p className="text-xs text-secondary-text">Clients Served</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-surface px-5 py-3 rounded-2xl border border-light-gray">
                                    <div className="p-2 bg-secondary/10 rounded-xl">
                                        <Award className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-extrabold text-dark-text font-display">8+</p>
                                        <p className="text-xs text-secondary-text">Years Experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-navy to-primary-dark rounded-3xl p-10 text-white space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full -ml-8 -mb-8 blur-xl" />
                                <div className="relative z-10 space-y-6">
                                    <div className="p-3 bg-white/10 rounded-xl w-fit backdrop-blur-sm">
                                        <Target className="w-8 h-8 text-primary-light" />
                                    </div>
                                    <h3 className="text-xl font-extrabold font-display">Our Purpose</h3>
                                    <p className="text-sm text-white/70 leading-relaxed">
                                        To bridge the digital divide in East Africa by providing world-class IT services, hands-on training, and enterprise-grade software solutions that transform how businesses operate.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                                            <p className="text-2xl font-extrabold font-display text-primary-light">6+</p>
                                            <p className="text-xs text-white/50 mt-1">IT Services</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                                            <p className="text-2xl font-extrabold font-display text-secondary-light">6+</p>
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
            <section className="bg-surface py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-10 border border-light-gray/50 hover-glow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />
                            <div className="relative z-10 space-y-6">
                                <div className="p-4 bg-primary/10 rounded-2xl w-fit">
                                    <Target className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-dark-text font-display">Our Mission</h3>
                                <p className="text-secondary-text leading-relaxed">
                                    To empower individuals and businesses with state-of-the-art software systems, high-quality trainings, and expert digital auditing, fostering sustainable growth in East Africa&apos;s digital economy.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-10 border border-light-gray/50 hover-glow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />
                            <div className="relative z-10 space-y-6">
                                <div className="p-4 bg-secondary/10 rounded-2xl w-fit">
                                    <Eye className="w-7 h-7 text-secondary" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-dark-text font-display">Our Vision</h3>
                                <p className="text-secondary-text leading-relaxed">
                                    To be Rwanda&apos;s leading hub for digital acceleration, recognized for elite engineering frameworks, certified education modules, and trusted software reliability across the region.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CORE VALUES */}
            <section className="bg-white py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">What Drives Us</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text font-display">
                            Our Core Values
                        </h2>
                        <p className="text-secondary-text leading-relaxed">
                            The fundamental principles guiding our everyday consultation operations and training programs.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v) => (
                            <div
                                key={v.title}
                                className="bg-surface rounded-2xl p-8 border border-light-gray/50 card-hover text-center group"
                            >
                                <div className={`p-4 rounded-2xl w-fit mx-auto mb-6 ${v.color} transition-transform duration-300 group-hover:scale-110`}>
                                    <v.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-dark-text mb-3 font-display">{v.title}</h3>
                                <p className="text-sm text-secondary-text leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. TEAM SECTION */}
            <section className="bg-surface py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Our People</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text font-display">
                            Leadership Team
                        </h2>
                        <p className="text-secondary-text leading-relaxed">
                            Meet the experienced leaders steering SmartLink Rwanda&apos;s educational and technical offerings.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {team.map((member: TeamMember) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-2xl border border-light-gray/50 overflow-hidden card-hover flex flex-col sm:flex-row"
                            >
                                <div className="sm:w-2/5 min-h-[180px] bg-gradient-to-br from-navy to-primary-dark flex items-center justify-center relative">
                                    <Users className="w-14 h-14 text-white/30" />
                                    <span className="absolute bottom-3 text-[9px] font-bold text-white/40 uppercase tracking-widest">SmartLink</span>
                                </div>
                                <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-xl text-dark-text font-display">{member.name}</h3>
                                        <p className="text-xs font-bold text-primary uppercase tracking-wider">{member.role}</p>
                                        <p className="text-sm text-secondary-text leading-relaxed pt-1">{member.bio}</p>
                                    </div>
                                    {(member.email || member.phone) && (
                                        <div className="text-xs text-secondary-text/60 border-t border-light-gray pt-3 space-y-1">
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

            {/* 6. CTA */}
            <section className="bg-white py-20 sm:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-gradient-to-br from-navy to-primary-dark rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/10 rounded-full -ml-10 -mb-10 blur-2xl" />
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
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-surface text-navy font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 duration-200"
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
