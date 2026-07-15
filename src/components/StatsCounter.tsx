"use client";
import React from "react";
import { Users, Code, Award, Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsCounter() {
    const stats = [
        {
            label: "Students Trained",
            value: "500+",
            icon: Users,
            accent: "bg-[#0F62FE]/10 text-[#0F62FE]",
            ring: "ring-[#0F62FE]/10",
        },
        {
            label: "Systems Developed",
            value: "100+",
            icon: Code,
            accent: "bg-[#00A86B]/10 text-[#00A86B]",
            ring: "ring-[#00A86B]/10",
        },
        {
            label: "Years Experience",
            value: "8+",
            icon: Award,
            accent: "bg-[#F59E0B]/10 text-[#F59E0B]",
            ring: "ring-[#F59E0B]/10",
        },
        {
            label: "Satisfaction Rate",
            value: "99%",
            icon: Smile,
            accent: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
            ring: "ring-[#8B5CF6]/10",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="bg-white dark:bg-[#0D2847] rounded-2xl p-6 shadow-md flex flex-col items-center text-center card-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div
                        className={`p-4 rounded-2xl mb-4 ring-1 ${stat.ring} ${stat.accent}`}
                    >
                        <stat.icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#F1F5F9] font-display">
                        {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-[#64748B] dark:text-slate-400 mt-1.5">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
