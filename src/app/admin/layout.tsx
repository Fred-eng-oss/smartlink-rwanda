"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Newspaper,
  Star,
  Users,
  Mail,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
} from "lucide-react";

const AUTH_FREE_PAGES = ["/admin/login", "/admin/forgot-password"];

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Programs", href: "/admin/programs", icon: GraduationCap },
  { label: "News", href: "/admin/news", icon: Newspaper },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Registrations", href: "/admin/registrations", icon: ClipboardList },
  { label: "Service Requests", href: "/admin/service-requests", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Account", href: "/admin/account", icon: User },
];

function AuthenticatedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#0F62FE]" />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-[#0F62FE]" />
          <p className="text-sm font-medium text-[#6B7280] font-sans">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A86B] to-[#00CC82] shadow-lg shadow-[#00A86B]/25">
          <span className="text-white font-bold text-sm tracking-tight font-display">
            SL
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-white tracking-tight leading-none font-display">
            SmartLink
          </span>
          <span className="text-[11px] text-slate-400 mt-1 leading-none font-sans">
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium
                transition-all duration-200 font-sans
                ${
                  active
                    ? "bg-[#0F62FE] text-white shadow-md shadow-[#0F62FE]/25"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-200"
                }
              `}
            >
              <item.icon
                className={`w-[18px] h-[18px] shrink-0 transition-colors duration-200 ${
                  active
                    ? "text-white"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
              <span className="flex-1 truncate">{item.label}</span>
              {active && (
                <ChevronRight className="w-3.5 h-3.5 text-white/60" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.06] p-4">
        <button
          onClick={async () => {
            await fetch("/api/admin/signout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 font-sans"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[260px] shrink-0 bg-[#0B1F3A]">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0B1F3A] flex flex-col
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="absolute top-4 right-3">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80 shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-lg text-[#6B7280] hover:text-[#1F2937] hover:bg-slate-100 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-[#1F2937] leading-none font-sans">
                {session?.user?.name || "Admin"}
              </span>
              <span className="text-xs text-[#6B7280] mt-1 leading-none font-sans">
                {session?.user?.email || "admin@smartlink.rw"}
              </span>
            </div>
            <Link
              href="/admin/account"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0F62FE] to-[#3D8BFF] text-white text-sm font-bold shadow-md shadow-[#0F62FE]/20 hover:shadow-lg hover:shadow-[#0F62FE]/30 transition-all font-display"
            >
              {(session?.user?.name || "A").charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthFree = AUTH_FREE_PAGES.some((p) => pathname === p);

  if (isAuthFree) {
    return <>{children}</>;
  }

  return (
    <SessionProvider>
      <AuthenticatedShell>{children}</AuthenticatedShell>
    </SessionProvider>
  );
}
