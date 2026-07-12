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
        setActiveIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    if (!testimonials || testimonials.length === 0) return null;

    const current = testimonials[activeIndex];

    return (
        <div className="relative max-w-3xl mx-auto px-4 py-8">
            {/* Quote watermark */}
            <div className="absolute -top-4 left-4 text-blue-100 select-none pointer-events-none">
                <Quote className="w-28 h-28 stroke-[0.5]" />
            </div>

            <div className="min-h-[240px] flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="space-y-6"
                    >
                        {/* Star rating */}
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i < current.rating
                                            ? "fill-[#F59E0B] text-[#F59E0B]"
                                            : "fill-slate-200 text-slate-200"
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Quote text */}
                        <p className="text-lg sm:text-xl font-medium italic text-[#1F2937] leading-relaxed">
                            &ldquo;{current.content}&rdquo;
                        </p>

                        {/* Author */}
                        <div className="pt-2">
                            <h4 className="font-bold text-base text-[#1F2937] font-display">
                                {current.name}
                            </h4>
                            <p className="text-sm text-[#6B7280] mt-0.5">
                                {current.role} at{" "}
                                <span className="font-semibold text-[#0F62FE]">
                                    {current.company}
                                </span>
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation controls */}
            <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-[#E5E7EB]">
                <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-[#00A86B] text-white hover:bg-[#00A86B]/90 transition-colors shadow-sm outline-none"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-2.5 rounded-full transition-all duration-300 outline-none ${
                                i === activeIndex
                                    ? "bg-[#0F62FE] w-6"
                                    : "bg-[#E5E7EB] hover:bg-[#D1D5DB]"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-[#00A86B] text-white hover:bg-[#00A86B]/90 transition-colors shadow-sm outline-none"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
