import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { readCollection } from "@/lib/store";
import {
  Briefcase,
  GraduationCap,
  Newspaper,
  MessageSquare,
  ClipboardList,
  Send,
  Star,
  Users,
  FileText,
  Settings,
  ArrowRight,
  BarChart3,
} from "lucide-react";

export const metadata = {
  title: "Admin Dashboard — SmartLink",
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
    {
      label: "Services",
      value: counts.services,
      icon: Briefcase,
      color: "text-[#0F62FE]",
      bg: "bg-[#0F62FE]/10",
      gradient: "from-[#0F62FE]/20 to-[#0F62FE]/5",
    },
    {
      label: "Programs",
      value: counts.programs,
      icon: GraduationCap,
      color: "text-[#00A86B]",
      bg: "bg-[#00A86B]/10",
      gradient: "from-[#00A86B]/20 to-[#00A86B]/5",
    },
    {
      label: "News Articles",
      value: counts.news,
      icon: Newspaper,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      gradient: "from-indigo-500/20 to-indigo-500/5",
    },
    {
      label: "Messages",
      value: counts.messages,
      icon: MessageSquare,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      gradient: "from-amber-500/20 to-amber-500/5",
    },
    {
      label: "Registrations",
      value: counts.registrations,
      icon: ClipboardList,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      gradient: "from-purple-500/20 to-purple-500/5",
    },
    {
      label: "Service Requests",
      value: counts.serviceRequests,
      icon: Send,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      gradient: "from-cyan-500/20 to-cyan-500/5",
    },
    {
      label: "Testimonials",
      value: counts.testimonials,
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      gradient: "from-yellow-500/20 to-yellow-500/5",
    },
    {
      label: "Team Members",
      value: counts.team,
      icon: Users,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      gradient: "from-rose-500/20 to-rose-500/5",
    },
  ];

  const quickActions = [
    {
      label: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      description: "Read and manage contact form submissions",
      color: "bg-[#0F62FE]/10 text-[#0F62FE]",
      hoverBorder: "hover:border-[#0F62FE]/30",
    },
    {
      label: "Registrations",
      href: "/admin/registrations",
      icon: ClipboardList,
      description: "Review and approve student applications",
      color: "bg-[#00A86B]/10 text-[#00A86B]",
      hoverBorder: "hover:border-[#00A86B]/30",
    },
    {
      label: "Service Requests",
      href: "/admin/service-requests",
      icon: FileText,
      description: "Track and complete client service requests",
      color: "bg-purple-500/10 text-purple-500",
      hoverBorder: "hover:border-purple-500/30",
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      description: "Configure site content and contact info",
      color: "bg-amber-500/10 text-amber-500",
      hoverBorder: "hover:border-amber-500/30",
    },
  ];

  const userName = session.user.name || "Admin";

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#0F62FE] to-[#00A86B] shadow-lg shadow-[#0F62FE]/20">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937] font-display tracking-tight">
              Welcome back, {userName}
            </h1>
            <p className="text-sm text-[#6B7280] font-sans mt-0.5">
              Manage your SmartLink Rwanda platform from this central dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid — 2 rows x 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient}`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1F2937] font-display tracking-tight">
              {stat.value.toLocaleString()}
            </p>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mt-1.5 font-sans">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#1F2937] font-display tracking-tight">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`group bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${action.hoverBorder}`}
            >
              <div
                className={`p-2.5 rounded-xl w-fit mb-4 ${action.color}`}
              >
                <action.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1F2937] mb-1 font-display">
                {action.label}
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed font-sans">
                {action.description}
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#0F62FE] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">
                View
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
