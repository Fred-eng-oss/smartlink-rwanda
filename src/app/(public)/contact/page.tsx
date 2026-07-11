import React from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with SmartLink Rwanda for ICT services, training programs, consulting, or general inquiries. Visit our office in Gisozi, Kigali.",
};

export default function ContactPage() {
    return (
        <div className="space-y-24 py-12 pb-20">
            {/* 1. PAGE HEADER */}
            <section className="bg-slate-900 text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.3),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">Contact Us</h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto font-medium">
                        Have a question or need a custom solution? Our team is ready to assist you with professional ICT services.
                    </p>
                </div>
            </section>

            {/* 2. CONTACT INFO + FORM */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                                Get In Touch
                            </h2>
                            <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 rounded-full" />
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                Reach out to us for any inquiries about our services, training programs, or partnership opportunities.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 flex gap-4 hover:shadow-md transition-shadow">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 shrink-0 h-fit">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 font-display">Office Location</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Gisozi, Kigali, Rwanda</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 flex gap-4 hover:shadow-md transition-shadow">
                                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0 h-fit">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 font-display">Phone Numbers</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">0781899755</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">0736691969</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 flex gap-4 hover:shadow-md transition-shadow">
                                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0 h-fit">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 font-display">Email</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">elysecag@gmail.com</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 flex gap-4 hover:shadow-md transition-shadow">
                                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600 dark:text-amber-400 shrink-0 h-fit">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 font-display">Business Hours</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Mon - Fri: 8:00 AM - 6:00 PM</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Sat: 9:00 AM - 1:00 PM</p>
                                </div>
                            </div>

                            <a
                                href="https://wa.me/250781899755"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-green-500/20 transition-all w-full"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 sm:p-10">
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display mb-2">
                                Send Us a Message
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">
                                Fill out the form below and our team will respond within 24 hours.
                            </p>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
