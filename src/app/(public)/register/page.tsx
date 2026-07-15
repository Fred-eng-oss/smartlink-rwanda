import React from "react";
import { GraduationCap } from "lucide-react";
import { getPrograms } from "@/lib/data";
import RegisterForm from "./RegisterForm";

export const metadata = {
    title: "Register for Training",
    description: "Enroll in professional IT training programs at SmartLink Rwanda. Choose from Programming, Networking, Cyber Security, Graphic Design, Digital Marketing, and Computer Basics.",
};

export default async function RegisterPage() {
    const programs = await getPrograms();

    return (
        <div className="space-y-24 py-12 pb-20">
            {/* HERO */}
            <section className="bg-gradient-to-br from-[#071A35] via-[#0D2847] to-[#0F62FE] text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">Register for Training</h1>
                    <p className="text-white/70 text-sm sm:text-base mt-3 max-w-xl mx-auto font-sans">
                        Take the first step in your IT career. Complete the form below to register for one of our professional training programs.
                    </p>
                </div>
            </section>

            {/* FORM */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-[#0D2847] rounded-2xl border border-[#E2E8F0] dark:border-slate-700/50 shadow-sm p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-[#0F62FE]/10 rounded-xl text-[#0F62FE]">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                            Student Registration Form
                        </h2>
                    </div>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 mb-8 ml-12 font-sans">
                        All fields marked with * are required. Submit your application and our admissions team will review it within 48 hours.
                    </p>
                    <RegisterForm programs={programs} />
                </div>
            </section>
        </div>
    );
}
