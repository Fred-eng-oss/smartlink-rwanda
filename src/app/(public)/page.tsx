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
  Award,
  Star,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import {
  getSettings,
  getServices,
  getPrograms,
  getNews,
  getTestimonials,
} from "@/lib/data";
import type { Service, Program, NewsArticle } from "@/lib/types";
import HeroSlideshow from "@/components/HeroSlideshow";
import HeroStats from "@/components/HeroStats";
import StatsCounter from "@/components/StatsCounter";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import PartnersMarquee from "@/components/PartnersMarquee";

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
  const recentNews = newsList.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO SLIDESHOW
      ═══════════════════════════════════════════════════════════ */}
      <HeroSlideshow />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — ABOUT SMARTLINK RWANDA
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block text-xs font-bold bg-[#0F62FE]/10 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] leading-tight font-display">
                Empowering individuals and businesses with innovative technology.
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-[#0F62FE] to-[#00A86B] rounded-full" />
            </div>
            <div className="lg:col-span-6 space-y-6 text-[#64748B] dark:text-slate-400 text-sm leading-relaxed">
              <p className="text-base font-medium">
                {settings.about_overview}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
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
          SECTION 3 — FEATURED SERVICES
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold bg-[#0F62FE]/10 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                Our Services
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 bg-[#0F62FE]/10 hover:bg-[#0F62FE]/20 text-[#0F62FE] font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-full transition-all"
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
                  className="bg-white dark:bg-[#0D2847] border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl overflow-hidden card-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col p-6 group"
                >
                  <div className="p-3 bg-[#0F62FE]/10 rounded-xl w-fit text-[#0F62FE] mb-5 group-hover:bg-[#0F62FE] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9] font-display mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed line-clamp-3 mb-6">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#E2E8F0] dark:border-slate-700/50">
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
          SECTION 4 — FEATURED PROGRAMS
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold bg-[#F59E0B]/10 text-[#F59E0B] rounded-full px-4 py-1.5 uppercase tracking-widest">
                Training &amp; Certification
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                Professional IT Academy Programs
              </h2>
            </div>
            <Link
              href="/programs"
              className="group inline-flex items-center gap-2 bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 text-[#F59E0B] font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-full transition-all"
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
                  className="bg-[#F8FAFC] dark:bg-[#071A35] border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl overflow-hidden card-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="p-6 space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-[#F59E0B]/10 rounded-xl text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-white transition-all duration-300">
                        <PIcon className="w-6 h-6" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-[#0D2847] text-[#64748B] dark:text-slate-400 border border-[#E2E8F0] dark:border-slate-700/50">
                        <Clock className="w-3 h-3" />
                        {prog.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                      {prog.name}
                    </h3>
                    <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed line-clamp-3">
                      {prog.description}
                    </p>
                    <ul className="space-y-2 text-xs text-[#64748B] dark:text-slate-400">
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
                      className="font-bold text-xs uppercase tracking-wider text-[#F59E0B] hover:text-[#0F62FE] flex items-center gap-1.5 transition-colors"
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
          SECTION 5 — WHY CHOOSE US
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-bold bg-[#00A86B]/10 text-[#00A86B] rounded-full px-4 py-1.5 uppercase tracking-widest">
              Our Value Proposition
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
              Why Corporate Clients Choose Us
            </h2>
            <p className="text-sm text-[#64748B] dark:text-slate-400">
              We deliver high-standards service, robust solutions, and practical
              engineering results for every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0D2847] rounded-2xl p-6 border border-[#E2E8F0] dark:border-slate-700/50 card-hover hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="p-3 bg-[#0F62FE]/10 rounded-xl w-fit text-[#0F62FE] mb-5 group-hover:bg-[#0F62FE] group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[#0F172A] dark:text-[#F1F5F9] mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — STATISTICS COUNTER
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#071A35] via-[#0F62FE] to-[#00A86B] py-20 sm:py-28 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — TESTIMONIALS
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-6">
              <span className="inline-block text-xs font-bold bg-[#0F62FE]/10 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] leading-tight font-display">
                What Our Clients Say
              </h2>
              <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
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
          SECTION 8 — NEWS & UPDATES PREVIEW
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold bg-[#0F62FE]/10 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                News &amp; Updates
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                Latest Corporate Tech Insights
              </h2>
            </div>
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 bg-[#0F62FE]/10 hover:bg-[#0F62FE]/20 text-[#0F62FE] font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-full transition-all"
            >
              All Articles{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentNews.map((article: NewsArticle) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="bg-white dark:bg-[#0D2847] border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl overflow-hidden card-hover hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="h-48 bg-gradient-to-br from-[#0F62FE] to-[#00A86B] relative flex items-center justify-center p-6 shrink-0 overflow-hidden">
                  <span className="font-extrabold text-white/15 uppercase tracking-wider text-lg select-none font-display">
                    SmartLink News
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-6 flex flex-col justify-between space-y-3 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9] leading-tight font-display group-hover:text-[#0F62FE] dark:group-hover:text-[#3D8BFF] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider text-[#0F62FE] flex items-center gap-1.5 pt-3 border-t border-[#E2E8F0] dark:border-slate-700/50">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9 — PARTNERS
      ═══════════════════════════════════════════════════════════ */}
      <PartnersMarquee />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10 — CONTACT CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#071A35] py-20 sm:py-28 select-none">
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
                className="bg-[#0F62FE] hover:bg-[#0A55D4] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[#0F62FE]/30 hover:shadow-[#0F62FE]/50 hover:-translate-y-0.5 transition-all text-center inline-flex items-center justify-center gap-2"
              >
                Hire SmartLink <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white/25 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white/10 transition-all text-center"
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
