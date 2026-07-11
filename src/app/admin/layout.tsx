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

  if (status === "unauthenticated" || status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-700/50">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
          <span className="text-white font-bold text-sm tracking-tight">SL</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white tracking-tight leading-none">
            SmartLink
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 leading-none">
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
                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  active
                    ? "bg-emerald-500/10 text-emerald-400 shadow-sm"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }
              `}
            >
              <item.icon
                className={`w-[18px] h-[18px] shrink-0 transition-colors duration-200 ${
                  active
                    ? "text-emerald-400"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
              <span className="flex-1 truncate">{item.label}</span>
              {active && (
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400/60" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-700/50 p-4">
        <button
          onClick={async () => {
            await fetch("/api/admin/signout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-900 border-r border-slate-800">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800
          flex flex-col transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="absolute top-4 right-3">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 sm:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-none">
                {session?.user?.name || "Admin"}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-none">
                {session?.user?.email || "admin@smartlink.rw"}
              </span>
            </div>
            <Link href="/admin/account" className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
              {(session?.user?.name || "A").charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
