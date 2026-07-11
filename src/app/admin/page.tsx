import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { readCollection } from "@/lib/store";
import {
    LayoutDashboard,
    Users,
    FileText,
    MessageSquare,
    Settings,
    LogOut,
    BookOpen,
    Briefcase,
    Newspaper,
    Star,
    ClipboardList,
    Send,
} from "lucide-react";

export const metadata = {
    title: "Admin Dashboard",
};

interface CollectionItem {
    id: string;
}

function countCollection(name: string): number {
    try {
        return readCollection<CollectionItem>(name).length;
    } catch {
        return 0;
    }
}

export default async function AdminPage() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        redirect("/admin/login");
    }

    const counts = {
        services: countCollection("services"),
        programs: countCollection("programs"),
        news: countCollection("news"),
        messages: countCollection("messages"),
        registrations: countCollection("registrations"),
        serviceRequests: countCollection("serviceRequests"),
        testimonials: countCollection("testimonials"),
        team: countCollection("team"),
    };

    const stats = [
        { label: "Services", value: counts.services, icon: Briefcase, color: "text-emerald-500 bg-emerald-500/10" },
        { label: "Programs", value: counts.programs, icon: BookOpen, color: "text-indigo-500 bg-indigo-500/10" },
        { label: "News Articles", value: counts.news, icon: Newspaper, color: "text-blue-500 bg-blue-500/10" },
        { label: "Messages", value: counts.messages, icon: MessageSquare, color: "text-amber-500 bg-amber-500/10" },
        { label: "Registrations", value: counts.registrations, icon: ClipboardList, color: "text-purple-500 bg-purple-500/10" },
        { label: "Service Requests", value: counts.serviceRequests, icon: Send, color: "text-cyan-500 bg-cyan-500/10" },
        { label: "Testimonials", value: counts.testimonials, icon: Star, color: "text-yellow-500 bg-yellow-500/10" },
        { label: "Team Members", value: counts.team, icon: Users, color: "text-rose-500 bg-rose-500/10" },
    ];

    const quickActions = [
        { label: "Messages", href: "/admin/messages", icon: MessageSquare, description: "Read and manage contact form submissions" },
        { label: "Registrations", href: "/admin/registrations", icon: ClipboardList, description: "Review and approve student applications" },
        { label: "Service Requests", href: "/admin/service-requests", icon: FileText, description: "Track and complete client service requests" },
        { label: "Settings", href: "/admin/settings", icon: Settings, description: "Configure site content and contact info" },
    ];

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                    Welcome back, {session.user.name || "Admin"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage your SmartLink Rwanda platform from this central dashboard.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                            {stat.value}
                        </p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit mb-4">
                                <action.icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 font-display">
                                {action.label}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {action.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
