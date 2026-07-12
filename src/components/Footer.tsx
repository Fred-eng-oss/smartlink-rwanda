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
    toast.success("Thank you for subscribing to our newsletter!");
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
    <footer className="bg-[#0B1F3A] text-slate-300 relative overflow-hidden mt-auto">
      {/* Subtle gradient decorations */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0F62FE]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00A86B]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Newsletter Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-white/[0.06] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-display font-bold tracking-tight text-white sm:text-2xl">
              Stay ahead in the digital world.
            </h3>
            <p className="mt-2 text-[#94A3B8] max-w-xl text-sm font-sans leading-relaxed">
              Subscribe to SmartLink Rwanda&apos;s newsletter for updates on
              professional trainings, ICT insights, and corporate software
              discounts.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your corporate email address"
              className="bg-white/[0.06] border border-white/[0.08] rounded-2xl px-5 py-3 text-sm font-sans text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/50 focus:border-[#0F62FE]/40 min-w-[240px] flex-grow transition-all duration-300"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#0F62FE] to-[#0A55D4] hover:from-[#0A55D4] hover:to-[#0844B0] text-white font-bold font-sans text-sm tracking-wide rounded-2xl px-6 py-3 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#0F62FE]/25 hover:-translate-y-0.5 transition-all duration-300 outline-none"
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
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-xl bg-gradient-to-br from-[#0F62FE] to-[#00A86B] flex items-center justify-center shadow-lg shadow-[#0F62FE]/20">
              <Image
                src="/assets/logo.png"
                alt="SmartLink logo"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-white tracking-wider">
                SmartLink
              </span>
              <span className="text-[10px] block font-bold text-slate-500 tracking-[0.2em] -mt-0.5 uppercase font-sans">
                Rwanda
              </span>
            </div>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Bridging the technology gap in the digital economy through
            professional IT services, training, certifications, and technical
            consultancy.
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/250781899755"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.06] text-slate-400 hover:text-[#00A86B] hover:bg-[#00A86B]/10 border border-white/[0.06] transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href="mailto:elysecag@gmail.com"
              className="p-2.5 rounded-xl bg-white/[0.06] text-slate-400 hover:text-[#F59E0B] hover:bg-[#F59E0B]/10 border border-white/[0.06] transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-white text-sm font-display font-bold tracking-widest mb-6 uppercase border-l-2 border-[#0F62FE] pl-4">
            Our Services
          </h4>
          <ul className="space-y-3">
            {services.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-slate-400 hover:text-[#00A86B] transition-colors duration-300 flex items-center gap-2 font-sans group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]/60 group-hover:bg-[#00A86B] transition-colors duration-300 shrink-0" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Programs Column */}
        <div>
          <h4 className="text-white text-sm font-display font-bold tracking-widest mb-6 uppercase border-l-2 border-[#00A86B] pl-4">
            IT Programs
          </h4>
          <ul className="space-y-3">
            {programs.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-slate-400 hover:text-[#00A86B] transition-colors duration-300 flex items-center gap-2 font-sans group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]/60 group-hover:bg-[#00A86B] transition-colors duration-300 shrink-0" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-white text-sm font-display font-bold tracking-widest mb-6 uppercase border-l-2 border-[#F59E0B] pl-4">
            Smart Office
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#0F62FE]/10 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#0F62FE]" />
              </div>
              <span className="text-sm text-slate-400 font-sans pt-1.5">
                Gisozi, Kigali, Rwanda
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#00A86B]/10 shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-[#00A86B]" />
              </div>
              <div className="text-sm text-slate-400 font-sans">
                <a
                  href="tel:0781899755"
                  className="block hover:text-white transition-colors duration-300"
                >
                  0781899755
                </a>
                <a
                  href="tel:0736691969"
                  className="block hover:text-white transition-colors duration-300 mt-1"
                >
                  0736691969
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#F59E0B]/10 shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div className="text-sm text-slate-400 font-sans">
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p className="mt-1">Sat: 9:00 AM - 1:00 PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-sans font-medium">
            &copy; {new Date().getFullYear()} SmartLink Rwanda. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-xs text-slate-500 font-sans font-medium hover:text-slate-300 transition-colors duration-300"
            >
              Core Values
            </Link>
            <Link
              href="/services"
              className="text-xs text-slate-500 font-sans font-medium hover:text-slate-300 transition-colors duration-300"
            >
              Consultancy
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 text-xs text-slate-500 font-sans font-medium hover:text-[#0F62FE] transition-colors duration-300"
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
