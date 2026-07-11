"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ELearningLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

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
                toast.success("Login successful!");
                router.push("/e-learning/dashboard");
                router.refresh();
            }
        } catch {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 select-none relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.3),transparent)]" />
            <div className="absolute top-1/3 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center space-y-4">
                    <Link href="/" className="inline-block">
                        <div className="relative w-14 h-14 overflow-hidden rounded-xl bg-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                            <Image src="/assets/logo.png" alt="SmartLink" fill className="object-cover" />
                        </div>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-extrabold text-white font-display">Student Portal</h1>
                        <p className="text-sm text-slate-400 mt-1">Access your e-learning dashboard</p>
                    </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="student@smartlink.rw"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Access Portal"
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center space-y-3">
                    <p className="text-xs text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-bold">
                            Register here
                        </Link>
                    </p>
                    <p className="text-xs text-slate-500">
                        <Link href="/" className="hover:text-slate-300 transition-colors">
                            ← Back to SmartLink Rwanda
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
