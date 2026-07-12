"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        content: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.fullName || !form.email || !form.subject || !form.content) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Message sent successfully! We'll get back to you soon.");
                setSubmitted(true);
                setForm({ fullName: "", email: "", phone: "", subject: "", content: "" });
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
            <div className="text-center py-12 space-y-4">
                <CheckCircle className="w-16 h-16 text-[#00A86B] mx-auto" />
                <h3 className="text-xl font-bold text-[#1F2937] font-display">Thank You!</h3>
                <p className="text-sm text-[#6B7280] font-sans">
                    Your message has been received. Our team will get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-bold text-[#0F62FE] hover:underline"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1.5 uppercase tracking-wider font-sans">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1.5 uppercase tracking-wider font-sans">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1.5 uppercase tracking-wider font-sans">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+250 7XX XXX XXX"
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1.5 uppercase tracking-wider font-sans">
                        Subject *
                    </label>
                    <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all font-sans"
                    >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Service Request">Service Request</option>
                        <option value="Training Programs">Training Programs</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-[#1F2937] mb-1.5 uppercase tracking-wider font-sans">
                    Message *
                </label>
                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Describe your inquiry or project details..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all resize-none font-sans"
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
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message
                        <Send className="w-4 h-4" />
                    </>
                )}
            </button>
        </form>
    );
}
