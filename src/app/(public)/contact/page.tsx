import React from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with SmartLink Rwanda for ICT services, training programs, consulting, or general inquiries. Visit our office in Gisozi, Kigali.",
};

const infoCards = [
    {
        icon: MapPin,
        label: "Office Location",
        lines: ["Gisozi, Kigali, Rwanda"],
    },
    {
        icon: Phone,
        label: "Phone Numbers",
        lines: ["0781899755", "0736691969"],
    },
    {
        icon: Mail,
        label: "Email",
        lines: ["elysecag@gmail.com"],
    },
    {
        icon: Clock,
        label: "Business Hours",
        lines: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 1:00 PM"],
    },
];

export default function ContactPage() {
    return (
        <div className="space-y-24 py-12 pb-20">
            {/* HERO */}
            <section className="bg-gradient-to-br from-[#0F62FE] via-[#0B4FC4] to-[#00A86B] text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">Contact Us</h1>
                    <p className="text-white/70 text-sm sm:text-base mt-3 max-w-xl mx-auto font-sans">
                        Have a question or need a custom solution? Our team is ready to assist you with professional ICT services.
                    </p>
                </div>
            </section>

            {/* INFO + FORM */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-extrabold text-[#1F2937] font-display">
                                Get In Touch
                            </h2>
                            <div className="w-12 h-1 bg-[#0F62FE] rounded-full" />
                            <p className="text-sm text-[#6B7280] leading-relaxed font-sans">
                                Reach out to us for any inquiries about our services, training programs, or partnership opportunities.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {infoCards.map((card) => (
                                <div
                                    key={card.label}
                                    className="bg-white rounded-2xl border border-[#E5E7EB] p-6 flex gap-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="p-3 bg-[#0F62FE]/10 rounded-xl text-[#0F62FE] shrink-0 h-fit">
                                        <card.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-[#1F2937] mb-1 font-display">
                                            {card.label}
                                        </h3>
                                        {card.lines.map((line, i) => (
                                            <p key={i} className="text-xs text-[#6B7280] font-sans">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <a
                                href="https://wa.me/250781899755"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-[#00A86B] hover:bg-[#008F5B] text-white font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-lg shadow-[#00A86B]/20 transition-all w-full"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8 sm:p-10">
                            <h2 className="text-xl font-extrabold text-[#1F2937] font-display mb-2">
                                Send Us a Message
                            </h2>
                            <p className="text-xs text-[#6B7280] mb-8 font-sans">
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
