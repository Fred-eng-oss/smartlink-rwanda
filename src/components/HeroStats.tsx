"use client";
import React, { useState, useEffect, useRef } from "react";
import { Users, FolderCheck, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";

function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = Date.now();
          const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress >= 1) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { count, ref };
}

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Trained Students",
    color: "from-[#0F62FE] to-[#3D8BFF]",
    bgColor: "bg-[#0F62FE]/10",
    textColor: "text-[#0F62FE]",
  },
  {
    icon: FolderCheck,
    value: 100,
    suffix: "+",
    label: "Projects Completed",
    color: "from-[#00A86B] to-[#00CC82]",
    bgColor: "bg-[#00A86B]/10",
    textColor: "text-[#00A86B]",
  },
  {
    icon: Heart,
    value: 200,
    suffix: "+",
    label: "Happy Clients",
    color: "from-[#F59E0B] to-[#FBBF24]",
    bgColor: "bg-[#F59E0B]/10",
    textColor: "text-[#F59E0B]",
  },
  {
    icon: Award,
    value: 6,
    suffix: "+",
    label: "Certified Programs",
    color: "from-[#8B5CF6] to-[#A78BFA]",
    bgColor: "bg-[#8B5CF6]/10",
    textColor: "text-[#8B5CF6]",
  },
];

export default function HeroStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, i) => {
        const { count, ref } = useCountUp(stat.value, 2000);
        return (
          <motion.div
            key={i}
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 text-center hover:bg-white/15 hover:border-white/25 transition-all duration-300 group"
          >
            <div className={`p-3 ${stat.bgColor} rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {count}
              {stat.suffix}
            </div>
            <div className="text-xs font-semibold text-white/60 mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
