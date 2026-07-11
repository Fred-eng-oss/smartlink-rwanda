"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, Lock, Loader2, Eye, EyeOff, CheckCircle, Shield } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<"email" | "reset">("email");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) { toast.error("Email is required"); return; }
        setStep("reset");
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPassword) { toast.error("New password is required"); return; }
        if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
        if (newPassword.length < 8) { toast.error("Password must be at least 8 characters"); return; }

        setLoading(true);
        try {
            const res = await fetch("/api/admin/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword, confirmPassword }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            toast.success("Password reset successfully!");
            setTimeout(() => { window.location.href = "/admin/login"; }, 1500);
        } catch (err: any) {
            toast.error(err.message || "Failed to reset password");
        } finally {
            setLoading(false);
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

    const strength = passwordStrength(newPassword);
    const strengthInfo = strengthLabel(strength);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 select-none relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.3),transparent)]" />
            <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md space-y-8 relative z-10">
                {/* Logo */}
                <div className="text-center space-y-4">
                    <Link href="/" className="inline-block">
                        <div className="relative w-14 h-14 overflow-hidden rounded-xl bg-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                            <Image src="/assets/logo.png" alt="SmartLink" fill className="object-cover" />
                        </div>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-extrabold text-white font-display">
                            {step === "email" ? "Reset Password" : "Create New Password"}
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            {step === "email"
                                ? "Enter your admin email to reset your password"
                                : "Choose a strong new password for your account"}
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
                    {step === "email" ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@smartlink.rw"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
                            >
                                Continue
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetSubmit} className="space-y-5">
                            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
                                <Shield className="w-5 h-5 text-blue-400 shrink-0" />
                                <span className="text-xs text-blue-300 font-medium">{email}</span>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {newPassword && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className={`h-full ${strengthInfo.color} transition-all duration-300 rounded-full`} style={{ width: `${(strength / 6) * 100}%` }} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{strengthInfo.text}</span>
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
                                            <span key={req} className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${met ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"}`}>
                                                {met && <CheckCircle className="w-3 h-3" />}
                                                {req}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {confirmPassword && confirmPassword === newPassword && (
                                    <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1.5">
                                        <CheckCircle className="w-3 h-3" /> Passwords match
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Resetting...</>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep("email")}
                                className="w-full text-center text-xs text-slate-400 hover:text-slate-300 font-medium transition-colors"
                            >
                                ← Use a different email
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center text-xs text-slate-500">
                    <Link href="/admin/login" className="hover:text-slate-300 transition-colors">
                        ← Back to Admin Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
