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
            {/* 1. PAGE HEADER */}
            <section className="bg-slate-900 text-white py-16 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.3),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl font-extrabold font-display">Request a Service</h1>
                    <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto font-medium">
                        Tell us about your project and our team will create a customized proposal tailored to your needs.
                    </p>
                </div>
            </section>

            {/* 2. FORM */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                            <Settings className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                            Service Request Form
                        </h2>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 ml-12">
                        Fill in the details below and we&apos;ll get back to you within 24-48 hours with a customized proposal.
                    </p>
                    <RequestServiceForm services={services} />
                </div>
            </section>
        </div>
    );
}
