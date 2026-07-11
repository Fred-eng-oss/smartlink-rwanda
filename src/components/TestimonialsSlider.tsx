"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
};

export default function TestimonialsSlider({
    testimonials,
}: {
    testimonials: Testimonial[];
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (testimonials.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    if (!testimonials || testimonials.length === 0) return null;

    const current = testimonials[activeIndex];

    return (
        <div className="relative max-w-4xl mx-auto px-4 py-8">
            {/* Quote Symbol background decoration */}
            <div className="absolute top-0 left-0 text-slate-200/40 dark:text-slate-800/30 select-none pointer-events-none">
                <Quote className="w-24 h-24 stroke-[0.5]" />
            </div>

            <div className="min-h-[220px] flex flex-col justify-between relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Rating Stars */}
                        <div className="flex gap-1 justify-center lg:justify-start">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 fill-current ${i < current.rating
                                            ? "text-amber-500"
                                            : "text-slate-205 dark:text-slate-800"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Testimonial Quote Text */}
                        <p className="text-lg sm:text-xl font-medium italic text-slate-700 dark:text-slate-200 leading-relaxed text-center lg:text-left">
                            "{current.content}"
                        </p>

                        {/* Client Bio */}
                        <div className="flex flex-col items-center lg:items-start">
                            <h4 className="font-bold text-base text-slate-900 dark:text-white font-display">
                                {current.name}
                            </h4>
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                                {current.role} at <span className="text-blue-600 dark:text-blue-400">{current.company}</span>
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Nav Controls */}
            <div className="flex justify-center lg:justify-start items-center gap-4 mt-8 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                <button
                    onClick={handlePrev}
                    className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-55 dark:hover:bg-slate-800 transition-colors shadow-sm outline-none"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Carousel Dots indicator */}
                <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all outline-none ${i === activeIndex
                                    ? "bg-blue-600 dark:bg-blue-400 w-5"
                                    : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-55 dark:hover:bg-slate-800 transition-colors shadow-sm outline-none"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
