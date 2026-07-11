"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, LogIn, Laptop, Globe, Phone } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Programs", href: "/programs" },
        { name: "News", href: "/news" },
        { name: "Contact", href: "/contact" },
    ];

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-800/50 py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-10 h-10 overflow-hidden rounded bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                            <Image
                                src="/assets/logo.png"
                                alt="SmartLink Rwanda Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div>
                            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                SmartLink
                            </span>
                            <span className="text-xs block font-semibold text-slate-500 dark:text-slate-400 tracking-wider -mt-1 uppercase">
                                Rwanda
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive =
                                pathname === link.href ||
                                (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${isActive
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-inner"
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <Moon className="w-4 h-4" />
                            ) : (
                                <Sun className="w-4 h-4" />
                            )}
                        </button>

                        {/* E-Learning Portal Portal */}
                        <Link
                            href="/e-learning/login"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-slate-350 dark:border-slate-700 px-4 py-2 rounded-full"
                        >
                            <LogIn className="w-3.5 h-3.5" />
                            Student Portal
                        </Link>

                        {/* Request service button */}
                        <Link
                            href="/request-service"
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Buttons */}
                    <div className="flex lg:hidden items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-705 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-inner"
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
                            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-3">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={handleLinkClick}
                                        className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-all ${isActive
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                                : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <hr className="border-slate-200 dark:border-slate-800 my-4" />
                            <div className="grid grid-cols-2 gap-3 px-3">
                                <Link
                                    href="/e-learning/login"
                                    onClick={handleLinkClick}
                                    className="flex items-center justify-center gap-2 text-center text-sm font-bold text-slate-700 dark:text-slate-205 py-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Portal
                                </Link>
                                <Link
                                    href="/request-service"
                                    onClick={handleLinkClick}
                                    className="flex items-center justify-center gap-2 text-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 py-3 rounded-lg shadow-md transition-all"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
