"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

type Service = {
    slug: string;
    name: string;
};

function FormInner({ services }: { services: Service[] }) {
    const searchParams = useSearchParams();
    const preselectedService = searchParams.get("service") || "";

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [fetchedServices, setFetchedServices] = useState<Service[]>(services);
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

    useEffect(() => {
        if (services.length === 0) {
            fetch("/api/admin/services")
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setFetchedServices(data);
                    }
                })
                .catch(() => {});
        }
    }, [services.length]);

    const activeServices = services.length > 0 ? services : fetchedServices;

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
                <CheckCircle className="w-16 h-16 text-[#00A86B] mx-auto" />
                <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F8FAFC] font-display">Request Submitted!</h3>
                <p className="text-sm text-[#6B7280] dark:text-slate-400 max-w-md mx-auto font-sans">
                    Thank you for your interest. Our team will review your request and contact you within 24-48 hours with a detailed proposal.
                </p>
                <button
                    onClick={() => { setSubmitted(false); setForm({ fullName: "", companyName: "", email: "", phone: "", serviceId: "", projectDescription: "", budget: "", preferredDate: "" }); }}
                    className="text-sm font-bold text-[#0F62FE] hover:underline"
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
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] placeholder-[#6B7280] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="Your organization (optional)"
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] placeholder-[#6B7280] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] placeholder-[#6B7280] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+250 7XX XXX XXX"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] placeholder-[#6B7280] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Service Required *
                    </label>
                    <select
                        name="serviceId"
                        value={form.serviceId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    >
                        <option value="">Select a service</option>
                        {activeServices.map((s) => (
                            <option key={s.slug} value={s.slug}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Estimated Budget (RWF)
                    </label>
                    <input
                        type="text"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        placeholder="e.g. 500,000 - 1,000,000"
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] placeholder-[#6B7280] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                    Preferred Start Date
                </label>
                <input
                    type="date"
                    name="preferredDate"
                    value={form.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                    Project Description *
                </label>
                <textarea
                    name="projectDescription"
                    value={form.projectDescription}
                    onChange={handleChange}
                    placeholder="Describe your project requirements, goals, timeline, and any specific technical needs..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] placeholder-[#6B7280] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all resize-none font-sans"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-[#00A86B] hover:bg-[#008F5B] disabled:bg-[#00A86B]/50 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg shadow-[#00A86B]/20 transition-all font-sans"
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
        <Suspense fallback={<div className="text-center py-12 text-[#6B7280] dark:text-slate-400 font-sans">Loading form...</div>}>
            <FormInner services={services} />
        </Suspense>
    );
}
