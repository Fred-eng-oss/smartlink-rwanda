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
            accent: "bg-blue-50 text-[#0F62FE]",
            ring: "ring-blue-100",
        },
        {
            label: "Systems Developed",
            value: "100+",
            icon: Code,
            accent: "bg-blue-50 text-[#0F62FE]",
            ring: "ring-blue-100",
        },
        {
            label: "Years Experience",
            value: "8+",
            icon: Award,
            accent: "bg-emerald-50 text-[#00A86B]",
            ring: "ring-emerald-100",
        },
        {
            label: "Satisfaction Rate",
            value: "99%",
            icon: Smile,
            accent: "bg-amber-50 text-[#F59E0B]",
            ring: "ring-amber-100",
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
                    className="bg-white rounded-2xl p-6 shadow-md shadow-slate-100 flex flex-col items-center text-center card-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div
                        className={`p-4 rounded-2xl mb-4 ring-1 ${stat.ring} ${stat.accent}`}
                    >
                        <stat.icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1F2937] font-display">
                        {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-[#6B7280] mt-1.5">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
