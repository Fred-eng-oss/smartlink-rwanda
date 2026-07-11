import React from "react";
import { GraduationCap } from "lucide-react";
import { getPrograms } from "@/lib/data";
import RegisterForm from "./RegisterForm";

export const metadata = {
    title: "Register for a Program",
    description: "Enroll in professional IT training programs at SmartLink Rwanda. Choose from Programming, Networking, Cyber Security, Graphic Design, Digital Marketing, and Computer Basics.",
};

export default async function RegisterPage() {
    const programs = await getPrograms();

    return (
        <div className="space-y-24 py-12 pb-20">
            {/* 1. PAGE HEADER */}
            <section className="bg-slate-900 text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.3),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">Program Registration</h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto font-medium">
                        Take the first step in your IT career. Complete the form below to register for one of our professional training programs.
                    </p>
                </div>
            </section>

            {/* 2. FORM */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                            Student Registration Form
                        </h2>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 ml-12">
                        All fields marked with * are required. Submit your application and our admissions team will review it within 48 hours.
                    </p>
                    <RegisterForm programs={programs} />
                </div>
            </section>
        </div>
    );
}
