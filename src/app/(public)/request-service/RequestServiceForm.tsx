"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Suspense } from "react";

type Service = {
    slug: string;
    name: string;
};

function FormInner({ services }: { services: Service[] }) {
    const searchParams = useSearchParams();
    const preselectedService = searchParams.get("service") || "";

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        serviceId: preselectedService,
        projectDescription: "",
        budget: "",
        preferredDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.fullName || !form.email || !form.phone || !form.serviceId || !form.projectDescription) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/service-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Service request submitted! We'll contact you shortly.");
                setSubmitted(true);
            } else {
                toast.error(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            toast.error("Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-16 space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Request Submitted!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Thank you for your interest. Our team will review your request and contact you within 24-48 hours with a detailed proposal.
                </p>
                <button
                    onClick={() => { setSubmitted(false); setForm({ fullName: "", companyName: "", email: "", phone: "", serviceId: "", projectDescription: "", budget: "", preferredDate: "" }); }}
                    className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="Your organization (optional)"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+250 7XX XXX XXX"
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                        Service Required *
                    </label>
                    <select
                        name="serviceId"
                        value={form.serviceId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                            <option key={s.slug} value={s.slug}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                        Estimated Budget (RWF)
                    </label>
                    <input
                        type="text"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        placeholder="e.g. 500,000 - 1,000,000"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Preferred Start Date
                </label>
                <input
                    type="date"
                    name="preferredDate"
                    value={form.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Project Description *
                </label>
                <textarea
                    name="projectDescription"
                    value={form.projectDescription}
                    onChange={handleChange}
                    placeholder="Describe your project requirements, goals, timeline, and any specific technical needs..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/20 transition-all"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        Submit Request
                        <Send className="w-4 h-4" />
                    </>
                )}
            </button>
        </form>
    );
}

export default function RequestServiceFormWrapper({ services }: { services: Service[] }) {
    return (
        <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading form...</div>}>
            <FormInner services={services} />
        </Suspense>
    );
}
