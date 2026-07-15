"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, Lock, Key, Loader2, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<"email" | "reset">("email");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [emailValidated, setEmailValidated] = useState(false);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/admin/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Email not found");
            setEmailValidated(true);
            setStep("reset");
            toast.success("Email verified! Set your new password.");
        } catch (err: any) {
            toast.error(err.message || "Email not found in our system");
        } finally {
            setLoading(false);
        }
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPassword) {
            toast.error("New password is required");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

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
            setTimeout(() => {
                window.location.href = "/admin/login";
            }, 1500);
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
        if (score <= 2) return { text: "Weak", color: "#EF4444" };
        if (score <= 4) return { text: "Fair", color: "#F59E0B" };
        return { text: "Strong", color: "#00A86B" };
    };

    const strength = passwordStrength(newPassword);
    const strengthInfo = strengthLabel(strength);

    const passwordReqs = [
        { label: "8+ characters", met: newPassword.length >= 8 },
        { label: "Uppercase", met: /[A-Z]/.test(newPassword) },
        { label: "Lowercase", met: /[a-z]/.test(newPassword) },
        { label: "Number", met: /[0-9]/.test(newPassword) },
        { label: "Symbol", met: /[^A-Za-z0-9]/.test(newPassword) },
    ];

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 select-none relative overflow-hidden bg-[#0B1F3A]"
        >
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25" style={{ backgroundColor: "#0F62FE" }} />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15" style={{ backgroundColor: "#00A86B" }} />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center space-y-5 mb-8">
                    <Link href="/" className="inline-block">
                        <div className="relative w-16 h-16 overflow-hidden rounded-2xl flex items-center justify-center mx-auto shadow-2xl bg-[#0F62FE]">
                            <Image src="/assets/logo.png" alt="SmartLink" fill className="object-cover" />
                        </div>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white font-display">
                            {step === "email" ? "Reset Password" : "Create New Password"}
                        </h1>
                        <p className="text-sm mt-2 font-sans text-[#6B7280] dark:text-slate-400">
                            {step === "email"
                                ? "Enter your admin email to verify your identity"
                                : "Choose a strong new password for your account"}
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#132D52] rounded-2xl p-8 shadow-2xl">
                    {step === "email" ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-1.5 font-sans">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-slate-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@smartlink.rw"
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all border-0 bg-[#F8FAFC] dark:bg-[#0B1F3A] text-[#1F2937] dark:text-[#F8FAFC]"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                                style={{ background: "linear-gradient(135deg, #0F62FE, #0D4FCC)" }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify Email"
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetSubmit} className="space-y-5">
                            <div className="p-3 rounded-xl flex items-center gap-3 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E5E7EB] dark:border-slate-700">
                                <div className="p-1.5 rounded-lg bg-[#00A86B]/10">
                                    <CheckCircle className="w-4 h-4" style={{ color: "#00A86B" }} />
                                </div>
                                <span className="text-xs font-semibold text-[#1F2937] dark:text-[#F8FAFC]">{email}</span>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-1.5 font-sans">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all border-0 bg-[#F8FAFC] dark:bg-[#0B1F3A] text-[#1F2937] dark:text-[#F8FAFC]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors text-[#6B7280] dark:text-slate-400"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {newPassword && (
                                    <div className="flex items-center gap-3 mt-2.5">
                                        <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[#E5E7EB] dark:bg-slate-700">
                                            <div
                                                className="h-full rounded-full transition-all duration-300"
                                                style={{ width: `${(strength / 6) * 100}%`, backgroundColor: strengthInfo.color }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: strengthInfo.color }}>
                                            {strengthInfo.text}
                                        </span>
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-1.5 mt-2.5">
                                    {passwordReqs.map((req) => (
                                        <span
                                            key={req.label}
                                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{
                                                backgroundColor: req.met ? "#00A86B15" : "#F8FAFC",
                                                color: req.met ? "#00A86B" : "#6B7280",
                                                border: req.met ? "none" : "1px solid #E5E7EB",
                                            }}
                                        >
                                            {req.met && <CheckCircle className="w-3 h-3" />}
                                            {req.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-wider mb-1.5 font-sans">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-slate-400" />
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all border-0 bg-[#F8FAFC] dark:bg-[#0B1F3A] text-[#1F2937] dark:text-[#F8FAFC]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors text-[#6B7280] dark:text-slate-400"
                                    >
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {confirmPassword && confirmPassword === newPassword && (
                                    <p className="text-xs font-semibold flex items-center gap-1 mt-1.5" style={{ color: "#00A86B" }}>
                                        <CheckCircle className="w-3 h-3" /> Passwords match
                                    </p>
                                )}
                                {confirmPassword && confirmPassword !== newPassword && (
                                    <p className="text-xs font-semibold flex items-center gap-1 mt-1.5" style={{ color: "#EF4444" }}>
                                        <AlertCircle className="w-3 h-3" /> Passwords do not match
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                                style={{ background: "linear-gradient(135deg, #00A86B, #008F5C)" }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Resetting...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setStep("email");
                                    setEmailValidated(false);
                                    setNewPassword("");
                                    setConfirmPassword("");
                                }}
                                className="w-full text-center text-xs font-medium transition-colors flex items-center justify-center gap-1 text-[#6B7280] dark:text-slate-400"
                            >
                                <ArrowLeft className="w-3 h-3" />
                                Use a different email
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center text-xs mt-6 font-sans text-[#6B7280] dark:text-slate-400">
                    <Link href="/admin/login" className="hover:text-white transition-colors">
                        ← Back to Admin Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
