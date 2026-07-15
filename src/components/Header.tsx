"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Globe,
  Cpu,
  Shield,
  Mail,
  Wrench,
  HeadphonesIcon,
  ShoppingBag,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

const serviceIcons: Record<string, React.ElementType> = {
  "website-design-development": Globe,
  "custom-business-management-systems": Cpu,
  "web-hosting": Globe,
  "professional-business-email-setup": Mail,
  "computer-laptop-repair": Wrench,
  "it-support-consulting": HeadphonesIcon,
  "tech-accessories-sales": ShoppingBag,
};

const serviceLinks = [
  { name: "Website Design & Development", slug: "website-design-development" },
  { name: "Custom Business Systems", slug: "custom-business-management-systems" },
  { name: "Web Hosting", slug: "web-hosting" },
  { name: "Professional Business Email", slug: "professional-business-email-setup" },
  { name: "Computer & Laptop Repair", slug: "computer-laptop-repair" },
  { name: "IT Support & Consulting", slug: "it-support-consulting" },
  { name: "Tech Accessories Sales", slug: "tech-accessories-sales" },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Programs", href: "/programs" },
    { name: "E-Learning", href: "/e-learning/login" },
    { name: "News & Updates", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const isHome = pathname === "/";
  const showSolid = scrolled || !isHome;

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid
          ? "bg-white/80 dark:bg-[#071A35]/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)] border-b border-[#E2E8F0]/60 dark:border-slate-700/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F62FE] to-[#00A86B] flex items-center justify-center shadow-lg shadow-[#0F62FE]/20 group-hover:shadow-[#0F62FE]/40 transition-shadow duration-300">
              <Image
                src="/assets/logo.png"
                alt="SmartLink Rwanda Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#0F62FE] to-[#00A86B] bg-clip-text text-transparent">
                SmartLink
              </span>
              <span className="text-[10px] block font-semibold text-[#64748B] dark:text-slate-400 tracking-[0.2em] -mt-0.5 uppercase font-sans">
                Rwanda
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1 px-3 py-2 text-[13px] font-semibold font-sans tracking-wide rounded-xl transition-all duration-300 ${
                        isServicesActive
                          ? "text-[#0F62FE]"
                          : "text-[#0F172A] dark:text-[#F1F5F9] hover:text-[#0F62FE] dark:hover:text-[#3D8BFF] hover:bg-[#0F62FE]/5"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setServicesOpen(!servicesOpen);
                      }}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                      {isServicesActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0.5 left-3 right-3 h-[2.5px] bg-gradient-to-r from-[#0F62FE] to-[#00A86B] rounded-full"
                          transition={{ type: "spring", stiffness: 420, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Services Dropdown */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-[#0D2847] border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50"
                          onMouseEnter={handleServicesEnter}
                          onMouseLeave={handleServicesLeave}
                        >
                          <div className="p-2">
                            <Link
                              href="/services"
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#0F62FE] hover:bg-[#0F62FE]/5 transition-all"
                            >
                              View All Services
                            </Link>
                            <div className="h-px bg-[#E2E8F0] dark:bg-slate-700/50 mx-2 my-1" />
                            {serviceLinks.map((svc) => {
                              const Icon = serviceIcons[svc.slug] || Cpu;
                              return (
                                <Link
                                  key={svc.slug}
                                  href={`/services/${svc.slug}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#0F172A] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#071A35] hover:text-[#0F62FE] dark:hover:text-[#3D8BFF] transition-all group"
                                >
                                  <span className="p-1.5 bg-[#0F62FE]/10 rounded-lg text-[#0F62FE] group-hover:bg-[#0F62FE] group-hover:text-white transition-all">
                                    <Icon className="w-3.5 h-3.5" />
                                  </span>
                                  {svc.name}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-[13px] font-semibold font-sans tracking-wide rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-[#0F62FE]"
                      : "text-[#0F172A] dark:text-[#F1F5F9] hover:text-[#0F62FE] dark:hover:text-[#3D8BFF] hover:bg-[#0F62FE]/5"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0.5 left-3 right-3 h-[2.5px] bg-gradient-to-r from-[#0F62FE] to-[#00A86B] rounded-full"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-400 bg-white dark:bg-[#0D2847] hover:bg-[#F8FAFC] dark:hover:bg-[#071A35] hover:text-[#0F62FE] dark:hover:text-[#3D8BFF] hover:border-[#0F62FE]/30 transition-all duration-300 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {/* Registration */}
            <Link
              href="/register"
              className="flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wider text-[#0F172A] dark:text-[#F1F5F9] hover:text-[#0F62FE] dark:hover:text-[#3D8BFF] border-2 border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F62FE]/40 px-4 py-2.5 rounded-2xl transition-all duration-300 hover:shadow-md"
            >
              Registration
            </Link>

            {/* Service Request CTA */}
            <Link
              href="/request-service"
              className="bg-gradient-to-r from-[#0F62FE] to-[#0A55D4] hover:from-[#0A55D4] hover:to-[#0844B0] text-white text-xs font-bold font-sans uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-[#0F62FE]/25 hover:shadow-[#0F62FE]/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Service Request
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl text-[#64748B] dark:text-slate-400 bg-white dark:bg-[#0D2847] border border-[#E2E8F0] dark:border-slate-700 hover:bg-[#F8FAFC] dark:hover:bg-[#071A35] hover:text-[#0F62FE] dark:hover:text-[#3D8BFF] transition-all duration-300 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-[#0F172A] dark:text-[#F1F5F9] bg-white dark:bg-[#0D2847] border border-[#E2E8F0] dark:border-slate-700 hover:bg-[#F8FAFC] dark:hover:bg-[#071A35] hover:text-[#0F62FE] dark:hover:text-[#3D8BFF] transition-all duration-300 shadow-sm"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="xl:hidden bg-white/95 dark:bg-[#071A35]/95 backdrop-blur-xl border-b border-[#E2E8F0] dark:border-slate-700 overflow-hidden shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navLinks.map((link, i) => {
                if (link.hasDropdown) {
                  const isSubActive = serviceLinks.some(
                    (s) => pathname === `/services/${s.slug}`
                  );
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <div className="flex items-center">
                        <Link
                          href={link.href}
                          onClick={handleLinkClick}
                          className={`flex-1 px-4 py-3 rounded-2xl text-base font-semibold font-sans transition-all duration-300 ${
                            isServicesActive && !isSubActive
                              ? "bg-[#0F62FE]/10 text-[#0F62FE] border-l-4 border-[#0F62FE]"
                              : "text-[#0F172A] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#071A35] hover:text-[#0F62FE] dark:hover:text-[#3D8BFF]"
                          }`}
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="px-3 py-3 text-[#64748B] dark:text-slate-400"
                          aria-label="Toggle services submenu"
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 space-y-0.5 pb-2">
                              {serviceLinks.map((svc) => (
                                <Link
                                  key={svc.slug}
                                  href={`/services/${svc.slug}`}
                                  onClick={handleLinkClick}
                                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    pathname === `/services/${svc.slug}`
                                      ? "text-[#0F62FE] bg-[#0F62FE]/5"
                                      : "text-[#64748B] dark:text-slate-400 hover:text-[#0F62FE] dark:hover:text-[#3D8BFF]"
                                  }`}
                                >
                                  {svc.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`block px-4 py-3 rounded-2xl text-base font-semibold font-sans transition-all duration-300 ${
                        isActive
                          ? "bg-[#0F62FE]/10 text-[#0F62FE] border-l-4 border-[#0F62FE]"
                          : "text-[#0F172A] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#071A35] hover:text-[#0F62FE] dark:hover:text-[#3D8BFF]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-700 mt-4 space-y-3">
                <Link
                  href="/register"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full text-center text-sm font-bold font-sans text-[#0F172A] dark:text-[#F1F5F9] py-3 rounded-2xl border-2 border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F62FE]/40 hover:text-[#0F62FE] dark:hover:text-[#3D8BFF] transition-all duration-300"
                >
                  Registration
                </Link>
                <Link
                  href="/request-service"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full text-center text-sm font-bold font-sans text-white bg-gradient-to-r from-[#0F62FE] to-[#0A55D4] py-3 rounded-2xl shadow-lg shadow-[#0F62FE]/25 transition-all duration-300"
                >
                  Service Request
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
