import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Briefcase,
  Globe,
  Shield,
  Zap,
  Rocket,
  HeadphonesIcon,
  Lightbulb,
  Cpu,
  Clock,
  Calendar,
  Code,
  Wifi,
  Palette,
  Megaphone,
  Monitor,
  Users,
} from "lucide-react";
import {
  getSettings,
  getServices,
  getPrograms,
  getNews,
  getTestimonials,
} from "@/lib/data";
import type { Service, Program, NewsArticle } from "@//lib/types";
import StatsCounter from "@/components/StatsCounter";
import TestimonialsSlider from "@/components/TestimonialsSlider";

const whyChooseUs = [
  {
    icon: Shield,
    title: "Reliability",
    description:
      "Dependable IT infrastructure and support systems built for 99.9% uptime and mission-critical operations.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We leverage cutting-edge frameworks and emerging technologies to deliver future-proof solutions.",
  },
  {
    icon: Zap,
    title: "Expertise",
    description:
      "Over 8 years of hands-on experience delivering enterprise software, training, and consultancy across East Africa.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support",
    description:
      "Dedicated post-deployment assistance with responsive technical teams available whenever you need us.",
  },
];

const serviceIcons = [Globe, Cpu, Globe, Shield, Briefcase, Users, Rocket];
function getServiceIcon(index: number) {
  return serviceIcons[index % serviceIcons.length];
}

const programIcons = [Code, Wifi, Shield, Palette, Megaphone, Monitor];

export default async function HomePage() {
  const settings = await getSettings();
  const allServices = await getServices();
  const allPrograms = await getPrograms();
  const newsList = await getNews();
  const testimonials = await getTestimonials();

  const featuredServices = allServices.slice(0, 4);
  const featuredPrograms = allPrograms.slice(0, 4);
  const recentNews = newsList.slice(0, 2);

  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-500 text-white select-none">
        {/* Decorative floating shapes */}
        <div className="absolute top-10 left-[10%] w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-[15%] w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        {/* Geometric accents */}
        <div className="absolute top-20 right-[20%] w-16 h-16 border border-white/10 rounded-2xl rotate-45" />
        <div className="absolute bottom-32 left-[12%] w-10 h-10 border border-white/10 rounded-xl rotate-12" />
        <div className="absolute top-1/3 right-[8%] w-6 h-6 bg-white/10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
          <div className="max-w-3xl text-center mx-auto space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-display">
              Bridging the{" "}
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-2xl">
                Digital Divide
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed font-medium">
              Professional ICT consulting, custom software engineering, reliable
              web hosting, and accredited training certifications — empowering
              Rwanda&apos;s digital economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="/services"
                className="bg-white text-blue-700 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-0.5 transition-all text-center"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white/40 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white/10 transition-all text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — COMPANY INTRO
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block text-xs font-bold bg-blue-50 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] leading-tight font-display">
                Empowering individuals and businesses with innovative technology.
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-[#0F62FE] to-[#00A86B] rounded-full" />
            </div>
            <div className="lg:col-span-6 space-y-6 text-[#6B7280] text-sm leading-relaxed">
              <p className="text-base font-medium">
                {settings.about_overview}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-semibold text-[#1F2937]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#00A86B] shrink-0" />
                  Empowering Regional Tech Talents
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#00A86B] shrink-0" />
                  Robust Core Platform Architectures
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#00A86B] shrink-0" />
                  High Uptime Cloud Servers
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#00A86B] shrink-0" />
                  Professional Corporate Support
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[#0F62FE] hover:text-[#00A86B] font-bold uppercase text-sm tracking-wider transition-colors"
                >
                  Learn More About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — WHY CHOOSE US
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-bold bg-blue-50 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
              Our Value Proposition
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] font-display">
              Why Corporate Clients Choose Us
            </h2>
            <p className="text-sm text-[#6B7280]">
              We deliver high-standards service, robust solutions, and practical
              engineering results for every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm shadow-slate-100 card-hover hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-3 bg-blue-50 rounded-xl w-fit text-[#0F62FE] mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[#1F2937] mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — FEATURED SERVICES
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold bg-blue-50 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] font-display">
                Our Services
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-[#0F62FE] font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-full transition-all"
            >
              All Services{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service: Service, index: number) => {
              const Icon = getServiceIcon(index);
              return (
                <div
                  key={service.slug}
                  className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden card-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col p-6"
                >
                  <div className="p-3 bg-blue-50 rounded-xl w-fit text-[#0F62FE] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F2937] font-display mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-3 mb-6">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-bold text-xs uppercase tracking-wider text-[#0F62FE] hover:text-[#00A86B] flex items-center gap-1.5 transition-colors"
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — STATS
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-blue-600 to-emerald-500 py-20 sm:py-28 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — FEATURED PROGRAMS
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold bg-blue-50 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                Training &amp; Certification
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] font-display">
                Professional IT Academy Programs
              </h2>
            </div>
            <Link
              href="/programs"
              className="group inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-[#0F62FE] font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-full transition-all"
            >
              All Programs{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPrograms.map((prog: Program, idx: number) => {
              const PIcon = programIcons[idx % programIcons.length];
              return (
                <div
                  key={prog.slug}
                  className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden card-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="p-6 space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-blue-50 rounded-xl text-[#0F62FE]">
                        <PIcon className="w-6 h-6" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#F8FAFC] text-[#6B7280] border border-[#E5E7EB]">
                        <Clock className="w-3 h-3" />
                        {prog.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937] font-display">
                      {prog.name}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-3">
                      {prog.description}
                    </p>
                    <ul className="space-y-2 text-xs text-[#6B7280]">
                      {prog.learningOutcomes.slice(0, 3).map((out: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00A86B] shrink-0" />
                          {out}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/programs#${prog.slug}`}
                      className="font-bold text-xs uppercase tracking-wider text-[#0F62FE] hover:text-[#00A86B] flex items-center gap-1.5 transition-colors"
                    >
                      View Program <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — TESTIMONIALS
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-6">
              <span className="inline-block text-xs font-bold bg-blue-50 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] leading-tight font-display">
                What Our Clients Say
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                SmartLink Rwanda collaborates with leading companies and
                organizations across Rwanda to facilitate smooth digital
                growth.
              </p>
            </div>
            <div className="lg:col-span-8">
              <TestimonialsSlider testimonials={testimonials} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — LATEST NEWS
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold bg-blue-50 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                News &amp; Updates
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] font-display">
                Latest Corporate Tech Insights
              </h2>
            </div>
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-[#0F62FE] font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-full transition-all"
            >
              All Articles{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentNews.map((article: NewsArticle) => (
              <div
                key={article.slug}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden card-hover hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row"
              >
                {/* Image area */}
                <div className="md:w-2/5 min-h-[180px] bg-gradient-to-br from-[#0F62FE] to-[#00A86B] relative flex items-center justify-center p-6 shrink-0">
                  <span className="font-extrabold text-white/20 uppercase tracking-wider text-lg select-none font-display">
                    SmartLink News
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between space-y-3 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937] leading-tight font-display">
                      <Link
                        href={`/news/${article.slug}`}
                        className="hover:text-[#0F62FE] transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                  <Link
                    href={`/news/${article.slug}`}
                    className="font-bold text-xs uppercase tracking-wider text-[#0F62FE] hover:text-[#00A86B] flex items-center gap-1.5 transition-colors"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9 — CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0B1F3A] py-20 sm:py-28 select-none">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Get in touch with our team to map your digital requirements or
              enroll in specialized international IT certifications at our
              Gisozi training center.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/request-service"
                className="bg-[#0F62FE] hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all text-center"
              >
                Hire SmartLink
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white/10 transition-all text-center"
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
