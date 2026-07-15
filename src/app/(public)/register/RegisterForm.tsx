"use client";

import React, { useState, useEffect } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

type Program = {
    slug: string;
    name: string;
};

export default function RegisterForm({ programs }: { programs: Program[] }) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [fetchedPrograms, setFetchedPrograms] = useState<Program[]>(programs);
    const [form, setForm] = useState({
        fullName: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        address: "",
        programId: "",
    });

    useEffect(() => {
        if (programs.length === 0) {
            fetch("/api/admin/programs")
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setFetchedPrograms(data);
                    }
                })
                .catch(() => {});
        }
    }, [programs.length]);

    const activePrograms = programs.length > 0 ? programs : fetchedPrograms;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.fullName || !form.gender || !form.dob || !form.email || !form.phone || !form.address || !form.programId) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Registration submitted! Check your email for confirmation.");
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
                <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F8FAFC] font-display">Registration Submitted!</h3>
                <p className="text-sm text-[#6B7280] dark:text-slate-400 max-w-md mx-auto font-sans">
                    Thank you for applying. Our admissions team will review your application and contact you within 48 hours with next steps.
                </p>
                <button
                    onClick={() => { setSubmitted(false); setForm({ fullName: "", gender: "", dob: "", email: "", phone: "", address: "", programId: "" }); }}
                    className="text-sm font-bold text-[#0F62FE] hover:underline"
                >
                    Register Another Student
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
                        placeholder="Student's full name"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] placeholder-[#6B7280] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Gender *
                    </label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Date of Birth *
                    </label>
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="student@email.com"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] placeholder-[#6B7280] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                        Program *
                    </label>
                    <select
                        name="programId"
                        value={form.programId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    >
                        <option value="">Select a program</option>
                        {activePrograms.map((p) => (
                            <option key={p.slug} value={p.slug}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC] mb-1.5 uppercase tracking-wider font-sans">
                    Home Address *
                </label>
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Your residential address"
                    required
                    className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl text-sm text-[#1F2937] dark:text-[#F8FAFC] placeholder-[#6B7280] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                />
            </div>

            <div className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700 rounded-2xl p-4 text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed font-sans">
                By submitting this form, you confirm that the information provided is accurate. Our admissions team will contact you via email or phone within 48 hours with enrollment details.
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
                        Submit Registration
                        <Send className="w-4 h-4" />
                    </>
                )}
            </button>
        </form>
    );
}
