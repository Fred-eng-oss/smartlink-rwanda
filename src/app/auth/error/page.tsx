"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowLeft, AlertTriangle, Loader2 } from "lucide-react";

const ERROR_MAP: Record<string, { title: string; description: string; iconBg: string; iconColor: string }> = {
    Configuration: {
        title: "Server Configuration Error",
        description: "There is a problem with the server configuration. Please contact the system administrator.",
        iconBg: "#FEE2E2",
        iconColor: "#EF4444",
    },
    AccessDenied: {
        title: "Access Denied",
        description: "You do not have permission to access this resource. Please contact an administrator if you believe this is an error.",
        iconBg: "#FFF7ED",
        iconColor: "#F97316",
    },
    Verification: {
        title: "Verification Expired",
        description: "The verification link has expired or has already been used. Please request a new one.",
        iconBg: "#FFFBEB",
        iconColor: "#F59E0B",
    },
    Default: {
        title: "Authentication Error",
        description: "An error occurred during authentication. Please check your credentials and try again.",
        iconBg: "#EFF6FF",
        iconColor: "#0F62FE",
    },
    CredentialsSignin: {
        title: "Invalid Credentials",
        description: "The email or password you entered is incorrect. Please double-check and try again.",
        iconBg: "#FEE2E2",
        iconColor: "#EF4444",
    },
    CallbackRouteError: {
        title: "Callback Error",
        description: "Something went wrong while redirecting. Please try signing in again.",
        iconBg: "#F5F3FF",
        iconColor: "#8B5CF6",
    },
    OAuthSignin: {
        title: "OAuth Sign-In Error",
        description: "An error occurred while connecting to the identity provider. Please try again.",
        iconBg: "#ECFEFF",
        iconColor: "#06B6D4",
    },
    SessionRequired: {
        title: "Session Required",
        description: "You must be signed in to access this page. Please sign in and try again.",
        iconBg: "#EEF2FF",
        iconColor: "#6366F1",
    },
};

function AuthErrorContent() {
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
        <div
            className="min-h-screen flex items-center justify-center px-4 select-none relative overflow-hidden"
            style={{ backgroundColor: "#0B1F3A" }}
        >
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: "#EF4444" }} />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: "#0F62FE" }} />
            </div>

            <div className="w-full max-w-lg relative z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-2xl" style={{ backgroundColor: "#0F62FE" }}>
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl" style={{ backgroundColor: errorInfo.iconBg }}>
                        <AlertTriangle className="w-8 h-8" style={{ color: errorInfo.iconColor }} />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-extrabold font-display" style={{ color: "#1F2937" }}>
                            {errorInfo.title}
                        </h1>
                        <p className="text-sm leading-relaxed max-w-sm mx-auto font-sans" style={{ color: "#6B7280" }}>
                            {errorInfo.description}
                        </p>
                    </div>

                    {errorKey !== "Default" && (
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{ backgroundColor: "#F8FAFC", border: "1px solid #E5E7EB" }}
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: errorInfo.iconColor }} />
                            <span className="text-xs font-mono font-medium" style={{ color: "#6B7280" }}>
                                Error: {errorKey}
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <Link
                            href="/admin/login"
                            className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all"
                            style={{ backgroundColor: "#0F62FE" }}
                        >
                            Try Again
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl border transition-all"
                            style={{ color: "#6B7280", border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </div>
                </div>

                <p className="text-center text-xs mt-6 font-sans" style={{ color: "#6B7280" }}>
                    SmartLink Rwanda &mdash; Secure Admin Portal
                </p>
            </div>
        </div>
    );
}

export default function AuthErrorPage() {
    return (
        <Suspense
            fallback={
                <div
                    className="flex h-screen items-center justify-center"
                    style={{ backgroundColor: "#0B1F3A" }}
                >
                    <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#0F62FE" }} />
                </div>
            }
        >
            <AuthErrorContent />
        </Suspense>
    );
}
