import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  User,
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
import StatsCounter from "@/components/StatsCounter";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import PartnersMarquee from "@/components/PartnersMarquee";

const whyChooseUs = [
  {
    icon: Award,
    title: "Experience",
    description:
      "Over 8 years of hands-on experience delivering enterprise software, training, and consultancy across East Africa.",
  },
  {
    icon: Shield,
    title: "Certified Experts",
    description:
      "Our team holds international certifications from Cisco, Microsoft, Google, and CompTIA.",
  },
  {
    icon: Zap,
    title: "Quality Services",
    description:
      "We deliver high-standards service, robust solutions, and practical engineering results for every engagement.",
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Support",
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

  const featuredPrograms = allPrograms.slice(0, 4);
  const recentNews = newsList.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO SLIDESHOW (100vh, rotating photos, feature cards)
      ═══════════════════════════════════════════════════════════ */}
      <HeroSlideshow />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — ABOUT PREVIEW
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-xs font-bold bg-[#0F62FE]/10 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                About SmartLink Rwanda
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] leading-tight font-display">
                Bridging the Digital Divide in East Africa
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-[#0F62FE] to-[#00A86B] rounded-full" />
              <p className="text-base text-[#64748B] dark:text-slate-400 leading-relaxed font-medium">
                {settings.about_overview}
              </p>
              <p className="text-sm text-[#64748B]/70 dark:text-slate-400/70 leading-relaxed">
                Our mission is to empower individuals and businesses with
                state-of-the-art software systems, high-quality trainings, and
                expert digital auditing, fostering sustainable growth in East
                Africa&apos;s digital economy.
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#0F62FE] hover:bg-[#0B4FD1] text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-full shadow-lg shadow-[#0F62FE]/20 hover:shadow-[#0F62FE]/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Students Trained", icon: Users, color: "from-[#0F62FE] to-[#3D8BFF]" },
                { value: "200+", label: "Projects Completed", icon: Briefcase, color: "from-[#00A86B] to-[#00CC82]" },
                { value: "100+", label: "Happy Clients", icon: Star, color: "from-[#F59E0B] to-[#FBBF24]" },
                { value: "20+", label: "Certified Programs", icon: Award, color: "from-[#8B5CF6] to-[#A78BFA]" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#F8FAFC] dark:bg-[#071A35] rounded-2xl p-6 border border-[#E2E8F0] dark:border-slate-700/50 card-hover text-center group"
                >
                  <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl w-fit mx-auto mb-3 text-white group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-[#64748B] dark:text-slate-400 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — SERVICES PREVIEW (all 7)
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-bold bg-[#0F62FE]/10 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allServices.map((service: Service, index: number) => {
              const Icon = getServiceIcon(index);
              return (
                <div
                  key={service.slug}
                  className="bg-white dark:bg-[#0D2847] border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl p-6 card-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="p-3 bg-[#0F62FE]/10 rounded-xl w-fit text-[#0F62FE] mb-4 group-hover:bg-[#0F62FE] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9] font-display mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-bold text-xs uppercase tracking-wider text-[#0F62FE] hover:text-[#00A86B] flex items-center gap-1.5 transition-colors mt-auto"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — WHY CHOOSE US
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-bold bg-[#00A86B]/10 text-[#00A86B] rounded-full px-4 py-1.5 uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
              Your Trusted ICT Partner
            </h2>
            <p className="text-sm text-[#64748B] dark:text-slate-400">
              We deliver excellence in every engagement with proven expertise and
              unwavering commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] dark:bg-[#071A35] rounded-2xl p-6 border border-[#E2E8F0] dark:border-slate-700/50 card-hover hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-center"
              >
                <div className="p-4 bg-[#0F62FE]/10 rounded-2xl w-fit mx-auto mb-5 group-hover:bg-[#0F62FE] group-hover:text-white transition-all duration-300 text-[#0F62FE]">
                  <item.icon className="w-7 h-7" />
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
          SECTION 5 — STATISTICS COUNTER
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#071A35] via-[#0F62FE] to-[#00A86B] py-20 sm:py-28 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — PROGRAMS
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold bg-[#F59E0B]/10 text-[#F59E0B] rounded-full px-4 py-1.5 uppercase tracking-widest">
                Training &amp; Certification
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                Our Programs
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
                  className="bg-white dark:bg-[#0D2847] border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl overflow-hidden card-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Image placeholder */}
                  <div className="h-40 bg-gradient-to-br from-[#071A35] to-[#0F62FE] relative flex items-center justify-center overflow-hidden">
                    <PIcon className="w-12 h-12 text-white/20" />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-[#F59E0B] text-white shadow-lg">
                      <Clock className="w-3 h-3" />
                      {prog.duration}
                    </span>
                  </div>
                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                      {prog.name}
                    </h3>
                    <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed line-clamp-2 flex-grow">
                      {prog.description}
                    </p>
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#0F62FE] hover:bg-[#0B4FD1] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md shadow-[#0F62FE]/20 transition-all duration-300 mt-auto"
                    >
                      Register Now <ArrowRight className="w-3.5 h-3.5" />
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
      <section className="bg-white dark:bg-[#0D2847] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-bold bg-[#0F62FE]/10 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
              What Our Clients Say
            </h2>
          </div>
          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — NEWS & UPDATES
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] dark:bg-[#071A35] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold bg-[#0F62FE]/10 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest">
                News &amp; Updates
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                Latest News
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
                <div className="h-48 bg-gradient-to-br from-[#0F62FE] to-[#00A86B] relative flex items-center justify-center overflow-hidden">
                  {article.featuredImageUrl ? (
                    <Image
                      src={article.featuredImageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="font-extrabold text-white/15 uppercase tracking-wider text-lg select-none font-display">
                      SmartLink News
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
                    Read More <ArrowRight className="w-3.5 h-3.5" />
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
          SECTION 10 — CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#071A35] py-20 sm:py-28 select-none">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
              Ready to Transform Your{" "}
              <span className="gradient-text">Digital Future</span>?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Get in touch with our team to map your digital requirements or
              enroll in specialized international IT certifications at our
              Gisozi training center.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/register"
                className="bg-[#0F62FE] hover:bg-[#0A55D4] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[#0F62FE]/30 hover:shadow-[#0F62FE]/50 hover:-translate-y-0.5 transition-all text-center inline-flex items-center justify-center gap-2"
              >
                Register Today <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/request-service"
                className="bg-transparent border-2 border-white/25 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white/10 transition-all text-center inline-flex items-center justify-center gap-2"
              >
                Request Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
