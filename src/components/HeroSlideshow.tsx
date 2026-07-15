"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/uploads/1783800552711-tdsh6x.jpeg",
    fallbackGradient: "from-[#071A35] via-[#0F62FE] to-[#00A86B]",
  },
  {
    image: "/assets/logo.png",
    fallbackGradient: "from-[#071A35] via-[#132D52] to-[#0F62FE]",
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 1000);
    },
    [isAnimating]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden select-none">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-[1]" : "opacity-0 z-0"
          }`}
        >
          {/* Image with zoom */}
          <div className={`absolute inset-0 ${index === currentSlide ? "animate-hero-zoom" : ""}`}>
            <Image
              src={slide.image}
              alt="SmartLink Rwanda ICT Training"
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
              sizes="100vw"
            />
          </div>
          {/* Fallback gradient if image fails */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.fallbackGradient} -z-[1]`} />
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071A35]/80 via-[#071A35]/60 to-[#071A35]/90 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071A35]/50 to-transparent z-[2]" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-[#0F62FE]/10 rounded-full blur-3xl animate-pulse z-[2] pointer-events-none" />
      <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-[#00A86B]/8 rounded-full blur-3xl z-[2] pointer-events-none" />
      <div className="absolute top-1/3 right-[8%] w-16 h-16 border border-white/10 rounded-2xl rotate-45 z-[2] pointer-events-none" />
      <div className="absolute bottom-1/3 left-[5%] w-10 h-10 border border-white/8 rounded-xl rotate-12 z-[2] pointer-events-none" />

      {/* Content */}
      <div className="relative z-[3] h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
              <span className="text-xs font-bold text-white/90 uppercase tracking-widest">
                Welcome to SmartLink Rwanda
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              Empowering Rwanda&apos;s{" "}
              <span className="relative inline-block">
                <span className="gradient-text">Digital Future</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#0F62FE" />
                      <stop offset="100%" stopColor="#00A86B" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Sub Heading */}
            <p className="text-base sm:text-lg lg:text-xl text-white/75 max-w-2xl leading-relaxed font-medium">
              We provide professional ICT solutions, IT training, certifications,
              web development, hosting, business systems, and technology
              consulting services.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/services"
                className="group bg-gradient-to-r from-[#0F62FE] to-[#0A55D4] hover:from-[#0A55D4] hover:to-[#0844B0] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-xl shadow-[#0F62FE]/30 hover:shadow-[#0F62FE]/50 hover:-translate-y-0.5 transition-all duration-300 text-center inline-flex items-center justify-center gap-2.5"
              >
                Our Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/25 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-center inline-flex items-center justify-center gap-2.5"
              >
                Contact Us
                <Phone className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <div className="absolute bottom-24 left-0 right-0 z-[3] flex justify-center gap-3 px-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full outline-none ${
              index === currentSlide
                ? "w-10 h-2.5 bg-gradient-to-r from-[#0F62FE] to-[#00A86B]"
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[3] p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 outline-none hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[3] p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 outline-none hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
