import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Globe,
  Settings,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import {
  getSettings,
  getServices,
  getPrograms,
  getNews,
  getTestimonials,
} from "@/lib/data";
import type { Service, Program, NewsArticle } from "@/lib/types";
import StatsCounter from "@/components/StatsCounter";
import TestimonialsSlider from "@/components/TestimonialsSlider";

export default async function HomePage() {
  const settings = await getSettings();
  const allServices = await getServices();
  const allPrograms = await getPrograms();
  const newsList = await getNews();
  const testimonials = await getTestimonials();

  // Slice featured content
  const featuredServices = allServices.slice(0, 3);
  const featuredPrograms = allPrograms.slice(0, 3);
  const recentNews = newsList.slice(0, 2);

  // Icons catalog helper
  const serviceIcons = [LaptopIcon, GlobeIcon, MailIcon, ShieldIcon, DesktopIcon, UsersIcon, CartIcon];
  function getServiceIcon(index: number) {
    const Icon = serviceIcons[index % serviceIcons.length];
    return <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
  }

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 sm:pb-32 bg-slate-900 text-white select-none">
        {/* Background Gradients & Shapes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.4),transparent)]" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-450 border border-blue-500/20 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-450 animate-pulse" />
                Bridging The Digital Divide
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-display">
                Empowering Rwanda's <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Digital Economy
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Professional ICT Consulting, custom software engineering, solid web hosting, and fully accredited training certifications to grow your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/request-service"
                  className="bg-blue-600 hover:bg-blue-750 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all text-center"
                >
                  Request Service
                </Link>
                <Link
                  href="/programs"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full hover:-translate-y-0.5 transition-all text-center"
                >
                  Explore Academy
                </Link>
              </div>

              {/* Inline mini stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-extrabold text-blue-400 font-display">500+</p>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-indigo-400 font-display">100+</p>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Systems</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-emerald-400 font-display">8+ Yrs</p>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Experience</p>
                </div>
              </div>
            </div>

            {/* Right Abstract Card Grid */}
            <div className="lg:col-span-5 hidden lg:block relative">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/40 rounded-2xl p-6 hover:-translate-y-1 transition-all">
                    <LaptopIcon className="w-8 h-8 text-blue-450 mb-3" />
                    <h3 className="font-bold text-white text-base">Development</h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Web apps, ERPs, CRM platforms designed specifically for local corporate needs.</p>
                  </div>
                  <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/40 rounded-2xl p-6 hover:-translate-y-1 transition-all">
                    <GraduationCap className="w-8 h-8 text-indigo-455 mb-3" />
                    <h3 className="font-bold text-white text-base">Trainings</h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Certified technology curriculum tracks led by experienced industry instructors.</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/40 rounded-2xl p-6 hover:-translate-y-1 transition-all">
                    <Shield className="w-8 h-8 text-emerald-450 mb-3" />
                    <h3 className="font-bold text-white text-base">Consultancy</h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Enterprise networks audits, cyber protections, and digital blueprints.</p>
                  </div>
                  <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/40 rounded-2xl p-6 hover:-translate-y-1 transition-all">
                    <Globe className="w-8 h-8 text-amber-450 mb-3" />
                    <h3 className="font-bold text-white text-base">Web Solutions</h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">SSL encrypted solid servers hosting and corporate secure email systems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-650 dark:text-blue-400 rounded-full px-3 py-1.5 uppercase tracking-widest border border-blue-100 dark:border-blue-900/30">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight font-display">
              Empowering individuals and businesses with innovative tech.
            </h2>
            <div className="w-16 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full" />
          </div>
          <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            <p className="text-base font-medium">
              {settings.about_overview}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-bold text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Empowering Regional Tech Talents
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Robust Core Platform Architectures
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                High Uptime Cloud Servers
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Professional Corporate Support
              </div>
            </div>
            <div className="pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold uppercase text-xs tracking-wider"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="bg-slate-50/50 dark:bg-slate-900/20 py-20 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 rounded-full px-3 py-1.5 uppercase tracking-widest border border-indigo-100 dark:border-indigo-900/30">
              Our Value Proposition
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              Why Corporate Clients Choose Us
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We focus on delivering high-standards service, robust solutions, and practical engineering results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all">
              <div className="p-3 bg-blue-500/10 rounded-xl w-fit text-blue-600 dark:text-blue-452 mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 font-display">Professional IT Services</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Dedicated Web development and custom business management software designed for performance and conversion.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all">
              <div className="p-3 bg-indigo-500/10 rounded-xl w-fit text-indigo-600 dark:text-indigo-452 mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 font-display">Accredited Academy</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Industry-mapped digital classes (Programming, Network, Security) focused on yielding employability.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all">
              <div className="p-3 bg-emerald-500/10 rounded-xl w-fit text-emerald-600 dark:text-emerald-452 mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 font-display">Technical Consultancy</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Empower your infrastructure with expert enterprise audits, network mappings, and custom tech consultancies.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all">
              <div className="p-3 bg-amber-500/10 rounded-xl w-fit text-amber-600 dark:text-amber-452 mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 font-display">Optimal Loading Speed</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Deploying cloud structures on premium hosting backbones to ensure high access speed and security standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-650 dark:text-blue-400 rounded-full px-3 py-1.5 uppercase tracking-widest border border-blue-100 dark:border-blue-900/30">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              Advanced ICT Business Services
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-105 active:bg-blue-105 text-blue-600 dark:bg-blue-950/40 dark:hover:bg-blue-900/30 dark:text-blue-400 font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-full border border-blue-100 dark:border-blue-900/20 transition-all font-display"
          >
            All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service: Service, index: number) => (
            <div
              key={service.slug}
              className="bg-white dark:bg-slate-900 border border-slate-205/50 dark:border-slate-800/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-8"
            >
              <div className="space-y-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl w-fit">
                  {getServiceIcon(index)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                <ul className="space-y-2 text-[11px] font-semibold text-slate-650 dark:text-slate-300">
                  {service.features.slice(0, 3).map((feat: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 mt-6">
                <Link
                  href={`/services/${service.slug}`}
                  className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-750 dark:hover:text-blue-300 flex items-center gap-1.5"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STATISTICS COUNTER SECTION */}
      <section className="bg-slate-50/50 dark:bg-slate-900/10 py-16 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* 6. FEATURED PROGRAMS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 rounded-full px-3 py-1.5 uppercase tracking-widest border border-indigo-100 dark:border-indigo-900/30">
              Training & Certification
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              Professional IT Academy Programs
            </h2>
          </div>
          <Link
            href="/programs"
            className="group inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/30 dark:text-indigo-400 font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-full border border-indigo-105 dark:border-indigo-900/20 transition-all font-display"
          >
            All Programs <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPrograms.map((prog: Program) => (
            <div
              key={prog.slug}
              className="bg-white dark:bg-slate-900 border border-slate-205/50 dark:border-slate-800/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-8 space-y-5">
                <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/20 uppercase tracking-wider">
                  Duration: {prog.duration}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  {prog.name} Academy
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {prog.description}
                </p>
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Key outcomes:</h4>
                  <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-350">
                    {prog.learningOutcomes.slice(0, 3).map((out: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {out}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-8 pb-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex justify-between items-center">
                <Link
                  href={`/programs#${prog.slug}`}
                  className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Overview
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full shadow transition-all"
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="bg-slate-900 text-white py-24 select-none relative overflow-hidden">
        {/* Subtle decorative items */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-bold bg-blue-500/10 text-blue-400 rounded-full px-3 py-1.5 uppercase tracking-widest border border-blue-500/20">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight font-display">
                What Our Clients Say About Us
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                SmartLink Rwanda collaborates with top companies and organizations in Rwanda to facilitate smooth digital growth.
              </p>
            </div>
            <div className="lg:col-span-8">
              <TestimonialsSlider testimonials={testimonials} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. LATEST NEWS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-650 dark:text-emerald-400 rounded-full px-3 py-1.5 uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/30">
              News & Updates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              Latest Corporate Tech Insights
            </h2>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-100 text-emerald-650 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/30 dark:text-emerald-400 font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-full border border-emerald-105 dark:border-emerald-900/20 transition-all font-display"
          >
            All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentNews.map((article: NewsArticle) => (
            <div
              key={article.slug}
              className="bg-white dark:bg-slate-900 border border-slate-205/50 dark:border-slate-800/50 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Fake news image place holder */}
              <div className="md:w-2/5 min-h-[180px] bg-gradient-to-br from-blue-700 to-indigo-900 relative flex items-center justify-center text-white p-6 shrink-0">
                <span className="font-extrabold text-white/25 uppercase tracking-wider text-xl select-none font-display">SmartLink News</span>
              </div>
              <div className="p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight font-display hover:text-blue-500 transition-colors">
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
                <Link
                  href={`/news/${article.slug}`}
                  className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-750 dark:hover:text-blue-300 flex items-center gap-1 mt-2"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. PARTNERS SECTION */}
      <section className="bg-slate-50/50 dark:bg-slate-900/10 py-16 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-center text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">
            Working Alongside Ecosystem Leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            <span className="text-sm font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase font-display border border-slate-200 dark:border-slate-800 px-4 py-2 rounded">
              RURA Rwanda
            </span>
            <span className="text-sm font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase font-display border border-slate-200 dark:border-slate-800 px-4 py-2 rounded">
              MINICT
            </span>
            <span className="text-sm font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase font-display border border-slate-200 dark:border-slate-800 px-4 py-2 rounded">
              ICT Chamber
            </span>
            <span className="text-sm font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase font-display border border-slate-200 dark:border-slate-800 px-4 py-2 rounded">
              Kigali Innovation Hub
            </span>
          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-blue-500/10 select-none">
          {/* Subtle decor circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full -ml-20 -mb-20 blur-2xl" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
              Ready to Accelerate Your Digital Transformation?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              Get in touch with our team today map your digital requirements or enroll for specialized international IT certifications in Gisozi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/request-service"
                className="bg-white hover:bg-slate-100 text-blue-900 font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 duration-200"
              >
                Hire SmartLink
              </Link>
              <Link
                href="/contact"
                className="bg-transparent hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full border border-white/30 transition-colors"
              >
                Contact Us Direct
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Icon Components (Simple SVG wrapper helpers for pure TSX reliability)
function LaptopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
      <line x1="2" x2="22" y1="20" y2="20" />
      <line x1="5" x2="19" y1="16" y2="16" />
    </svg>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2050/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2a1 1 0 0 1 .76.97z" />
    </svg>
  );
}

function DesktopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
