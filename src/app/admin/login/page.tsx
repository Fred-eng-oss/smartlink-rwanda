"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

    useEffect(() => {
        router.prefetch("/admin");
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error("Please enter both email and password.");
            return;
        }
        setLoading(true);
        try {
            const result = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });
            if (result?.error) {
                toast.error("Invalid credentials. Please try again.");
            } else {
                setForm({ email: "", password: "" });
                toast.success("Login successful!");
                router.push("/admin");
                router.refresh();
            }
        } catch {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 select-none relative overflow-hidden"
            style={{ backgroundColor: "#0B1F3A" }}
        >
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30" style={{ backgroundColor: "#0F62FE" }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: "#00A86B" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] opacity-10" style={{ backgroundColor: "#0F62FE" }} />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center space-y-5 mb-8">
                    <Link href="/" className="inline-block">
                        <div className="relative w-16 h-16 overflow-hidden rounded-2xl flex items-center justify-center mx-auto shadow-2xl" style={{ backgroundColor: "#0F62FE" }}>
                            <Image src="/assets/logo.png" alt="SmartLink" fill className="object-cover" />
                        </div>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white font-display">Admin Portal</h1>
                        <p className="text-sm mt-2 font-sans" style={{ color: "#6B7280" }}>Sign in to manage SmartLink Rwanda</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 font-sans" style={{ color: "#6B7280" }}>
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6B7280" }} />
                                <input
                                    type="email"
                                    autoComplete="new-email"
                                    name="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="admin@smartlink.rw"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all border-0"
                                    style={{ backgroundColor: "#F8FAFC", color: "#1F2937" }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider font-sans" style={{ color: "#6B7280" }}>
                                    Password
                                </label>
                                <Link href="/admin/forgot-password" className="text-xs font-medium transition-colors hover:opacity-80" style={{ color: "#0F62FE" }}>
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6B7280" }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    name="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent transition-all border-0"
                                    style={{ backgroundColor: "#F8FAFC", color: "#1F2937" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                                    style={{ color: "#6B7280" }}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
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
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs mt-6 font-sans" style={{ color: "#6B7280" }}>
                    <Link href="/" className="hover:text-white transition-colors">
                        ← Back to SmartLink Rwanda
                    </Link>
                </p>
            </div>
        </div>
    );
}
