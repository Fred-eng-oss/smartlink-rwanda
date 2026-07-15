import React from "react";
import { Settings } from "lucide-react";
import { getServices } from "@/lib/data";
import RequestServiceForm from "./RequestServiceForm";

export const metadata = {
    title: "Request a Service",
    description: "Submit a service request to SmartLink Rwanda for web development, custom software, hosting, IT consulting, and other professional ICT services.",
};

export default async function RequestServicePage() {
    const services = await getServices();

    return (
        <div className="space-y-24 py-12 pb-20">
            {/* HERO */}
            <section className="bg-gradient-to-br from-[#071A35] via-[#0D2847] to-[#0F62FE] text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">Request a Service</h1>
                    <p className="text-white/70 text-sm sm:text-base mt-3 max-w-xl mx-auto font-sans">
                        Tell us about your project and our team will create a customized proposal tailored to your needs.
                    </p>
                </div>
            </section>

            {/* FORM */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-[#0D2847] rounded-2xl border border-[#E2E8F0] dark:border-slate-700/50 shadow-sm p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-[#0F62FE]/10 rounded-xl text-[#0F62FE]">
                            <Settings className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
                            Service Request Form
                        </h2>
                    </div>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 mb-8 ml-12 font-sans">
                        Fill in the details below and we&apos;ll get back to you within 24-48 hours with a customized proposal.
                    </p>
                    <RequestServiceForm services={services} />
                </div>
            </section>
        </div>
    );
}
