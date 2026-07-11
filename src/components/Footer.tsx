"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, MessageSquare, Shield, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        toast.success("Thank you for subscribing to our newsletter! 🚀");
        setEmail("");
    };

    const services = [
        { name: "Web Development", href: "/services/website-design-development" },
        { name: "Custom Systems", href: "/services/custom-business-management-systems" },
        { name: "Web Hosting", href: "/services/web-hosting" },
        { name: "Business Email", href: "/services/professional-business-email-setup" },
        { name: "Computer Repair", href: "/services/computer-laptop-repair" },
        { name: "IT Consulting", href: "/services/it-support-consulting" },
    ];

    const programs = [
        { name: "Programming", href: "/programs/programming" },
        { name: "Networking", href: "/programs/networking" },
        { name: "Cyber Security", href: "/programs/cyber-security" },
        { name: "Graphic Design", href: "/programs/graphic-design" },
        { name: "Digital Marketing", href: "/programs/digital-marketing" },
        { name: "Computer Basics", href: "/programs/computer-basics" },
    ];

    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 shadow-2xl relative overflow-hidden mt-auto">
            {/* Subtle glowing elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

            {/* Top Newsletter banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-slate-800 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                            Stay ahead in the digital world.
                        </h3>
                        <p className="mt-2 text-slate-400 max-w-xl text-sm">
                            Subscribe to SmartLink Rwanda's newsletter for updates on professional trainings, ICT insights, and corporate software discounts.
                        </p>
                    </div>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your corporate email address"
                            className="bg-slate-800/80 border border-slate-700/60 rounded-full px-5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[240px] flex-grow transition-all"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide rounded-full px-6 py-3 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-550/20 hover:-translate-y-0.5 transition-all outline-none"
                        >
                            Subscribe
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {/* Brand Column */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-9 h-9 overflow-hidden rounded bg-blue-600 flex items-center justify-center">
                            <Image
                                src="/assets/logo.png"
                                alt="SmartLink logo"
                                width={36}
                                height={36}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <span className="font-extrabold text-lg text-white tracking-wider">
                                SmartLink
                            </span>
                            <span className="text-[10px] block font-bold text-slate-500 tracking-widest -mt-1 uppercase">
                                Rwanda
                            </span>
                        </div>
                    </Link>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Bridging the technology gap in the digital economy through professional IT services, training, certifications, and technical consultancy.
                    </p>
                    <div className="flex gap-4">
                        {/* WhatsApp Direct Link */}
                        <a
                            href="https://wa.me/250781899755"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-green-500 hover:bg-green-500/10 transition-colors"
                        >
                            <MessageSquare className="w-4 h-4" />
                        </a>
                        <a
                            href="mailto:elysecag@gmail.com"
                            className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Services Column */}
                <div>
                    <h4 className="text-white text-base font-bold tracking-wider mb-6 uppercase border-l-2 border-blue-600 pl-3">
                        Our Services
                    </h4>
                    <ul className="space-y-3">
                        {services.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-sm text-slate-405 hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Programs Column */}
                <div>
                    <h4 className="text-white text-base font-bold tracking-wider mb-6 uppercase border-l-2 border-indigo-650 pl-3">
                        IT Programs
                    </h4>
                    <ul className="space-y-3">
                        {programs.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-sm text-slate-405 hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="text-white text-base font-bold tracking-wider mb-6 uppercase border-l-2 border-emerald-500 pl-3">
                        Smart Office
                    </h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-400">
                                Gisozi, Kigali, Rwanda
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                            <div className="text-sm text-slate-400">
                                <a href="tel:0781899755" className="block hover:text-white">
                                    0781899755
                                </a>
                                <a href="tel:0736691969" className="block hover:text-white mt-1">
                                    0736691969
                                </a>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <div className="text-sm text-slate-400">
                                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                                <p className="mt-1">Sat: 9:00 AM - 1:00 PM</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-slate-950/80 py-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} SmartLink Rwanda. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/about" className="hover:text-slate-450 transition-colors">
                            Core Values
                        </Link>
                        <Link href="/services" className="hover:text-slate-450 transition-colors">
                            Consultancy
                        </Link>
                        <Link
                            href="/admin/login"
                            className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                        >
                            <Shield className="w-3.5 h-3.5" />
                            Admin Access
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
