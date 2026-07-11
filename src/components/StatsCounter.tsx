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
            color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
        },
        {
            label: "Systems Developed",
            value: "100+",
            icon: Code,
            color: "text-indigo-650 dark:text-indigo-400 bg-indigo-500/10",
        },
        {
            label: "Years Experience",
            value: "8+",
            icon: Award,
            color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
        },
        {
            label: "Satisfaction Rate",
            value: "99%",
            icon: Smile,
            color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-md shadow-slate-100 dark:shadow-none flex flex-col items-center text-center hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className={`p-3.5 rounded-xl mb-4 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                            {stat.value}
                        </div>
                        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">
                            {stat.label}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
