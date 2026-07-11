"use client";

import { useEffect, useState } from "react";
import { ClipboardList, CheckCircle, XCircle, Search, UserCheck } from "lucide-react";
import toast from "react-hot-toast";

interface Registration {
    id: string;
    fullName: string;
    email: string;
    program: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    PENDING: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", label: "Pending" },
    APPROVED: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", label: "Approved" },
    REJECTED: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", label: "Rejected" },
};

export default function AdminRegistrationsPage() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [updating, setUpdating] = useState<string | null>(null);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    async function fetchRegistrations() {
        try {
            const res = await fetch("/api/admin/registrations");
            const data = await res.json();
            setRegistrations(Array.isArray(data) ? data : []);
        } catch {
            toast.error("Failed to load registrations.");
        } finally {
            setLoading(false);
        }
    }

    async function handleStatusUpdate(id: string, status: "APPROVED" | "REJECTED") {
        setUpdating(id);
        try {
            const res = await fetch("/api/admin/registrations", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (!res.ok) throw new Error();
            setRegistrations((prev) =>
                prev.map((r) => (r.id === id ? { ...r, status } : r))
            );
            toast.success(`Registration ${status.toLowerCase()}.`);
        } catch {
            toast.error("Failed to update registration.");
        } finally {
            setUpdating(null);
        }
    }

    const filtered = registrations.filter(
        (r) =>
            r.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            r.email?.toLowerCase().includes(search.toLowerCase()) ||
            r.program?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl text-indigo-500 bg-indigo-500/10">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                            Registrations
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {registrations.length} total registration{registrations.length !== 1 && "s"}
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search registrations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 w-64"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                            <UserCheck className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                            {registrations.length === 0
                                ? "No registrations yet."
                                : "No registrations match your search."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Full Name
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Program
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="text-right px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filtered.map((reg) => {
                                    const sc = statusConfig[reg.status] || statusConfig.PENDING;
                                    return (
                                        <tr
                                            key={reg.id}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                                {reg.fullName}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                                {reg.email}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                                {reg.program}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${sc.bg} ${sc.text}`}
                                                >
                                                    {sc.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                                                {reg.createdAt
                                                    ? new Date(reg.createdAt).toLocaleDateString()
                                                    : "—"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    {reg.status !== "APPROVED" && (
                                                        <button
                                                            onClick={() =>
                                                                handleStatusUpdate(reg.id, "APPROVED")
                                                            }
                                                            disabled={updating === reg.id}
                                                            className="p-2 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors disabled:opacity-50"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {reg.status !== "REJECTED" && (
                                                        <button
                                                            onClick={() =>
                                                                handleStatusUpdate(reg.id, "REJECTED")
                                                            }
                                                            disabled={updating === reg.id}
                                                            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
