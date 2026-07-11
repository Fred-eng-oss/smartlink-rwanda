import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, ArrowRight, Laptop, Globe, Mail, Shield, Settings, ShoppingCart } from "lucide-react";
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
        <div className="space-y-24 py-12 pb-20">
            {/* 1. HERO */}
            <section className="bg-slate-900 text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.3),transparent)]" />
                <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/services" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-bold text-xs uppercase tracking-wider mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> All Services
                    </Link>
                    <div className="max-w-3xl space-y-6">
                        <div className="p-3 bg-blue-500/10 rounded-xl w-fit">
                            <Icon className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
                            {service.name}
                        </h1>
                        <p className="text-base text-slate-300 leading-relaxed font-medium max-w-2xl">
                            {service.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. SERVICE DETAILS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        {/* Benefits */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8">
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display mb-6 flex items-center gap-3">
                                <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle className="w-5 h-5" />
                                </span>
                                Key Benefits
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.benefits.map((b: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">{b}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8">
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display mb-6 flex items-center gap-3">
                                <span className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Settings className="w-5 h-5" />
                                </span>
                                Our Process
                            </h2>
                            <div className="space-y-4">
                                {service.process.map((step: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                        <span className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center shrink-0 font-display">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8">
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display mb-6 flex items-center gap-3">
                                <span className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                                    <Shield className="w-5 h-5" />
                                </span>
                                Features Included
                            </h2>
                            <ul className="space-y-3">
                                {service.features.map((f: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 sticky top-28 space-y-6">
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                                Ready to Get Started?
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Request this service and our team will schedule a consultation to discuss your specific requirements.
                            </p>
                            <Link
                                href={`/request-service?service=${service.slug}`}
                                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-blue-500/20 transition-all"
                            >
                                Order This Service
                            </Link>
                            <Link
                                href="/contact"
                                className="block w-full text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* Other Services */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 space-y-4">
                            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display uppercase tracking-wider">
                                Other Services
                            </h3>
                            <ul className="space-y-2">
                                {services.filter((s: Service) => s.slug !== slug).slice(0, 5).map((s: Service) => (
                                    <li key={s.slug}>
                                        <Link
                                            href={`/services/${s.slug}`}
                                            className="text-xs text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                                        >
                                            <ArrowRight className="w-3 h-3" />
                                            {s.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
