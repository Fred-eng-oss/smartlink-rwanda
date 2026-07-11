"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Loader2, User, Mail, Shield, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

interface AccountInfo {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function AdminAccountPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [account, setAccount] = useState<AccountInfo | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/admin/account");
                if (!res.ok) throw new Error();
                const data: AccountInfo = await res.json();
                setAccount(data);
                setName(data.name);
                setEmail(data.email);
            } catch {
                toast.error("Failed to load account info");
                router.push("/admin");
            } finally {
                setLoading(false);
            }
        })();
    }, [router]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) { toast.error("Name is required"); return; }
        if (!email.trim()) { toast.error("Email is required"); return; }

        setSaving(true);
        try {
            const res = await fetch("/api/admin/account", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), email: email.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            toast.success("Profile updated successfully");
            if (data.name) setAccount((prev) => prev ? { ...prev, name: data.name, email: data.email } : prev);
        } catch (err: any) {
            toast.error(err.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPassword) { toast.error("Current password is required"); return; }
        if (!newPassword) { toast.error("New password is required"); return; }
        if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
        if (newPassword.length < 8) { toast.error("Password must be at least 8 characters"); return; }

        setChangingPassword(true);
        try {
            const res = await fetch("/api/admin/account", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            toast.success("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            toast.error(err.message || "Failed to change password");
        } finally {
            setChangingPassword(false);
        }
    };

    const passwordStrength = (pw: string) => {
        let score = 0;
        if (pw.length >= 8) score++;
        if (pw.length >= 12) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[a-z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    };

    const strengthLabel = (score: number) => {
        if (score <= 2) return { text: "Weak", color: "bg-red-500" };
        if (score <= 4) return { text: "Fair", color: "bg-amber-500" };
        return { text: "Strong", color: "bg-emerald-500" };
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500 dark:border-slate-700 dark:border-t-blue-500" />
            </div>
        );
    }

    const strength = passwordStrength(newPassword);
    const strengthInfo = strengthLabel(strength);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
            <div className="mx-auto max-w-3xl space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                            <User className="h-5 w-5 text-blue-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Account Settings
                        </h1>
                    </div>
                </div>

                {/* Account Info Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                            {account?.name?.charAt(0)?.toUpperCase() || "A"}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{account?.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{account?.email}</p>
                        </div>
                        <div className="ml-auto">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
                                <Shield className="w-3 h-3" />
                                {account?.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Edit Profile */}
                <form onSubmit={handleProfileUpdate} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 space-y-5">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Profile Information
                    </h2>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-600 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Save Profile
                        </button>
                    </div>
                </form>

                {/* Change Password */}
                <form onSubmit={handlePasswordChange} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 space-y-5">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Change Password
                    </h2>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type={showCurrent ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {newPassword && (
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className={`h-full ${strengthInfo.color} transition-all duration-300 rounded-full`} style={{ width: `${(strength / 6) * 100}%` }} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{strengthInfo.text}</span>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {["8+ chars", "Uppercase", "Lowercase", "Number"].map((req) => {
                                const met =
                                    (req === "8+ chars" && newPassword.length >= 8) ||
                                    (req === "Uppercase" && /[A-Z]/.test(newPassword)) ||
                                    (req === "Lowercase" && /[a-z]/.test(newPassword)) ||
                                    (req === "Number" && /[0-9]/.test(newPassword));
                                return (
                                    <span key={req} className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${met ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                                        {met && <CheckCircle className="w-3 h-3" />}
                                        {req}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {confirmPassword && confirmPassword === newPassword && (
                            <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1 mt-1">
                                <CheckCircle className="w-3 h-3" /> Passwords match
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={changingPassword}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-600 disabled:opacity-50"
                        >
                            {changingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
