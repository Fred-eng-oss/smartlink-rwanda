"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw, Shield } from "lucide-react";

const ERROR_MAP: Record<string, { title: string; description: string; color: string }> = {
    Configuration: {
        title: "Server Configuration Error",
        description: "There is a problem with the server configuration. Please contact the system administrator.",
        color: "text-red-500 bg-red-500/10 border-red-500/20",
    },
    AccessDenied: {
        title: "Access Denied",
        description: "You do not have permission to access this resource. Please contact an administrator if you believe this is an error.",
        color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    },
    Verification: {
        title: "Verification Expired",
        description: "The verification link has expired or has already been used. Please request a new one.",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    Default: {
        title: "Authentication Error",
        description: "An error occurred during authentication. Please check your credentials and try again.",
        color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    CredentialsSignin: {
        title: "Invalid Credentials",
        description: "The email or password you entered is incorrect. Please double-check and try again.",
        color: "text-red-500 bg-red-500/10 border-red-500/20",
    },
    CallbackRouteError: {
        title: "Callback Error",
        description: "Something went wrong while redirecting. Please try signing in again.",
        color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
    OAuthSignin: {
        title: "OAuth Sign-In Error",
        description: "An error occurred while connecting to the identity provider. Please try again.",
        color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    },
    SessionRequired: {
        title: "Session Required",
        description: "You must be signed in to access this page.",
        color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
};

export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const [errorKey, setErrorKey] = useState("Default");

    useEffect(() => {
        const error = searchParams.get("error");
        if (error && ERROR_MAP[error]) {
            setErrorKey(error);
        }
    }, [searchParams]);

    const errorInfo = ERROR_MAP[errorKey] || ERROR_MAP.Default;

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 select-none relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.15),transparent)]" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

            <div className="w-full max-w-lg space-y-8 relative z-10">
                {/* Logo */}
                <div className="text-center">
                    <Link href="/" className="inline-block">
                        <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                    </Link>
                </div>

                {/* Error Card */}
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/50 rounded-2xl p-8 shadow-2xl text-center space-y-6">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border ${errorInfo.color}`}>
                        <AlertTriangle className="w-8 h-8" />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-extrabold text-white font-display">
                            {errorInfo.title}
                        </h1>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                            {errorInfo.description}
                        </p>
                    </div>

                    {/* Error code badge */}
                    {errorKey !== "Default" && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                            <span className="text-xs font-mono text-slate-400">Error: {errorKey}</span>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <Link
                            href="/admin/login"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl border border-slate-700/50 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-600">
                    SmartLink Rwanda &mdash; Secure Admin Portal
                </p>
            </div>
        </div>
    );
}
