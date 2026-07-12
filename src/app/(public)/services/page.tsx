import React from "react";
import Link from "next/link";
import { ArrowRight, Laptop, Globe, Mail, Shield, Settings, Users, ShoppingCart, Sparkles } from "lucide-react";
import { getServices } from "@/lib/data";
import type { Service } from "@/lib/types";

export const metadata = {
    title: "Professional IT Services",
    description: "Explore our premium ICT services: Web Design & Development, Custom ERP Systems, SSD Web Hosting, Domain Email configuration, Computer Repair, and IT Consultancy in Kigali.",
};

export default async function ServicesPage() {
    const services = await getServices();

    const serviceIcons = [Laptop, Settings, Globe, Mail, Laptop, Shield, ShoppingCart];
    function getServiceIcon(index: number) {
        const Icon = serviceIcons[index % serviceIcons.length];
        return <Icon className="w-7 h-7 text-primary" />;
    }

    return (
        <div className="space-y-0 pb-20">
            {/* 1. HERO BANNER */}
            <section className="relative bg-navy py-20 sm:py-28 overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,98,254,0.25),transparent)]" />
                <div className="absolute top-1/3 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block text-xs font-bold bg-primary/15 text-primary-light rounded-full px-4 py-2 uppercase tracking-widest border border-primary/20 mb-6">
                        What We Offer
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-tight">
                        Professional ICT Services
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-5 max-w-2xl mx-auto leading-relaxed">
                        Discover modern technology solutions tailored to scale business operations, improve network productivity, and grow brand presence.
                    </p>
                </div>
            </section>

            {/* 2. SERVICES GRID */}
            <section className="bg-white py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((s: Service, index: number) => (
                            <div
                                key={s.slug}
                                className="bg-surface rounded-2xl border border-light-gray/50 overflow-hidden card-hover flex flex-col justify-between p-8 group"
                            >
                                <div className="space-y-6">
                                    <div className="p-4 bg-primary/10 rounded-2xl w-fit transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                        <span className="text-primary group-hover:text-white transition-colors duration-300">
                                            {getServiceIcon(index)}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-dark-text font-display group-hover:text-primary transition-colors">
                                        {s.name}
                                    </h3>
                                    <p className="text-sm text-secondary-text leading-relaxed line-clamp-3">
                                        {s.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                                            <Sparkles className="w-3 h-3" />
                                            {s.features.length} Features
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-6 mt-6 border-t border-light-gray/60 flex justify-between items-center">
                                    <Link
                                        href={`/services/${s.slug}`}
                                        className="font-bold text-xs uppercase tracking-wider text-primary hover:text-primary-dark flex items-center gap-1.5 transition-colors"
                                    >
                                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <Link
                                        href={`/request-service?service=${s.slug}`}
                                        className="text-xs font-bold bg-navy hover:bg-primary text-white px-5 py-2 rounded-full transition-all duration-300"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CTA */}
            <section className="bg-surface py-20 sm:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-gradient-to-br from-navy to-primary-dark rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/10 rounded-full -ml-10 -mb-10 blur-2xl" />
                        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                Need a Custom System or Unique Project?
                            </h2>
                            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                                Our engineering team specializes in mapping unique operations and building tailored web databases, SMS gateways, and custom workflow modules. Set up a free consultation today.
                            </p>
                            <div className="pt-4">
                                <Link
                                    href="/request-service"
                                    className="inline-flex items-center gap-2 bg-white hover:bg-surface text-navy font-bold text-sm uppercase tracking-wide px-8 py-3.5 rounded-full shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Start Scoping Today <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
