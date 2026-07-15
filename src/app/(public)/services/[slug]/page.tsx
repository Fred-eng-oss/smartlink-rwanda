import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, ArrowRight, Laptop, Globe, Mail, Shield, Settings, ShoppingCart, Zap } from "lucide-react";
import { getServices } from "@/lib/data";
import type { Service } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const services = await getServices();
    const service = services.find((s: Service) => s.slug === slug);
    if (!service) return { title: "Service Not Found" };
    return {
        title: service.name,
        description: service.description,
    };
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;
    const services = await getServices();
    const service = services.find((s: Service) => s.slug === slug);

    if (!service) notFound();

    const serviceIcons = [Laptop, Settings, Globe, Mail, Laptop, Shield, ShoppingCart];
    const Icon = serviceIcons[services.indexOf(service) % serviceIcons.length] || Laptop;

    return (
        <div className="space-y-0 pb-20">
            {/* 1. HERO */}
            <section className="relative bg-navy py-20 sm:py-28 overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,98,254,0.25),transparent)]" />
                <div className="absolute top-1/3 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-bold text-xs uppercase tracking-wider mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> All Services
                    </Link>
                    <div className="max-w-3xl space-y-6">
                        <div className="p-3 bg-primary/15 rounded-2xl w-fit backdrop-blur-sm">
                            <Icon className="w-8 h-8 text-primary-light" />
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white leading-tight">
                            {service.name}
                        </h1>
                        <p className="text-base text-slate-300 leading-relaxed font-medium max-w-2xl">
                            {service.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. SERVICE DETAILS */}
            <section className="bg-white dark:bg-[#132D52] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-10">
                            {/* Benefits */}
                            <div className="bg-surface rounded-2xl p-8 border border-light-gray/50">
                                <h2 className="text-xl font-extrabold text-dark-text font-display mb-6 flex items-center gap-3">
                                    <span className="p-2.5 bg-secondary/10 rounded-xl">
                                        <CheckCircle className="w-5 h-5 text-secondary" />
                                    </span>
                                    Key Benefits
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {service.benefits.map((b: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 bg-white dark:bg-[#132D52] rounded-xl border border-light-gray/50 dark:border-slate-700">
                                            <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                            <span className="text-sm text-dark-text dark:text-[#F8FAFC] font-medium">{b}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Process */}
                            <div className="bg-surface rounded-2xl p-8 border border-light-gray/50">
                                <h2 className="text-xl font-extrabold text-dark-text dark:text-[#F8FAFC] font-display mb-6 flex items-center gap-3">
                                    <span className="p-2.5 bg-primary/10 rounded-xl">
                                        <Settings className="w-5 h-5 text-primary" />
                                    </span>
                                    Our Process
                                </h2>
                                <div className="space-y-4">
                                    {service.process.map((step: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-[#132D52] rounded-xl border border-light-gray/50 dark:border-slate-700">
                                            <span className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0 font-display">
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-sm text-dark-text dark:text-[#F8FAFC] font-medium">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="bg-surface rounded-2xl p-8 border border-light-gray/50">
                                <h2 className="text-xl font-extrabold text-dark-text dark:text-[#F8FAFC] font-display mb-6 flex items-center gap-3">
                                    <span className="p-2.5 bg-primary/10 rounded-xl">
                                        <Zap className="w-5 h-5 text-primary" />
                                    </span>
                                    Features Included
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {service.features.map((f: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center gap-2 text-sm text-dark-text dark:text-[#F8FAFC] bg-white dark:bg-[#132D52] px-4 py-2.5 rounded-full border border-light-gray/50 dark:border-slate-700 font-medium"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-surface rounded-2xl p-8 border border-light-gray/50 sticky top-28 space-y-6">
                                <h3 className="text-lg font-extrabold text-dark-text dark:text-[#F8FAFC] font-display">
                                    Ready to Get Started?
                                </h3>
                                <p className="text-sm text-secondary-text dark:text-slate-400 leading-relaxed">
                                    Request this service and our team will schedule a consultation to discuss your specific requirements.
                                </p>
                                <Link
                                    href={`/request-service?service=${service.slug}`}
                                    className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-primary/20 transition-all duration-300"
                                >
                                    Order This Service
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block w-full text-center bg-white dark:bg-[#132D52] hover:bg-surface dark:hover:bg-[#0B1F3A] text-dark-text dark:text-[#F8FAFC] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-light-gray/50 dark:border-slate-700 transition-all"
                                >
                                    Contact Us
                                </Link>
                            </div>

                            {/* Other Services */}
                            <div className="bg-surface rounded-2xl p-8 border border-light-gray/50 space-y-4">
                                <h3 className="text-sm font-extrabold text-dark-text dark:text-[#F8FAFC] font-display uppercase tracking-wider">
                                    Other Services
                                </h3>
                                <ul className="space-y-3">
                                    {services
                                        .filter((s: Service) => s.slug !== slug)
                                        .slice(0, 5)
                                        .map((s: Service) => (
                                            <li key={s.slug}>
                                                <Link
                                                    href={`/services/${s.slug}`}
                                                    className="text-sm text-secondary-text dark:text-slate-400 hover:text-primary dark:hover:text-[#3D8BFF] transition-colors flex items-center gap-2"
                                                >
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                    {s.name}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
