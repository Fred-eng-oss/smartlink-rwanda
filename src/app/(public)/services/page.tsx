import React from "react";
import Link from "next/link";
import { ArrowRight, Laptop, Globe, Mail, Shield, Settings, Users, ShoppingCart } from "lucide-react";
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
        return <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />;
    }

    return (
        <div className="space-y-24 py-12 pb-20">
            {/* 1. PAGE HEADER */}
            <section className="bg-slate-900 text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.3),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">Professional ICT Services</h1>
                    <p className="text-slate-404 text-sm sm:text-base mt-3 max-w-xl mx-auto font-medium">
                        Discover modern technology solutions tailored to scale business operations, improve network productivity, and grow brand presence.
                    </p>
                </div>
            </section>

            {/* 2. SERVICES GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s: Service, index: number) => (
                        <div
                            key={s.slug}
                            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-8"
                        >
                            <div className="space-y-6">
                                <div className="p-4 bg-blue-50 dark:bg-blue-956/40 rounded-2xl w-fit">
                                    {getServiceIcon(index)}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                                    {s.name}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                                    {s.description}
                                </p>
                                <div className="space-y-2.5 pt-2">
                                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Features included:</h4>
                                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-350 font-medium">
                                        {s.features.slice(0, 3).map((feat: string, idx: number) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 mt-8 flex justify-between items-center">
                                <Link
                                    href={`/services/${s.slug}`}
                                    className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-750 dark:hover:text-blue-300 flex items-center gap-1.5"
                                >
                                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <Link
                                    href={`/request-service?service=${s.slug}`}
                                    className="text-xs font-bold bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-500 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full transition-all"
                                >
                                    Order
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. BUSINESS CONSULTANCY CTA BANNER */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
                    <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                            Need a Custom System or Unique Project?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                            Our engineering team specializes in mapping unique operations and building tailored web databases, SMS gateways, and custom workflow modules. Set up a free consultation table.
                        </p>
                        <div className="pt-4">
                            <Link
                                href="/request-service"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-750 text-white font-bold text-sm uppercase tracking-wide px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/20 transition-all font-display"
                            >
                                Start Scoping Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
