"use client";

import { useEffect, useState } from "react";
import { Settings, Save, Globe, Phone, MapPin, Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface SettingGroup {
    label: string;
    icon: React.ElementType;
    keys: string[];
}

const groups: SettingGroup[] = [
    {
        label: "Company Info",
        icon: Globe,
        keys: ["company_name", "logo_url", "about_overview", "business_hours"],
    },
    {
        label: "Contact Info",
        icon: Phone,
        keys: ["contact_email", "contact_phones", "whatsapp_number", "office_address"],
    },
    {
        label: "Social Links",
        icon: Share2,
        keys: ["instagram_url", "twitter_url", "linkedin_url"],
    },
];

function formatLabel(key: string): string {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            setSettings(data || {});
        } catch {
            toast.error("Failed to load settings.");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(key: string, value: string) {
        setSettings((prev) => ({ ...prev, [key]: value }));
    }

    async function handleSave() {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (!res.ok) throw new Error();
            toast.success("Settings saved successfully.");
        } catch {
            toast.error("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    }

    const allKeys = groups.flatMap((g) => g.keys);
    const extraKeys = Object.keys(settings).filter((k) => !allKeys.includes(k));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl text-slate-500 bg-slate-500/10">
                        <Settings className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                            Site Settings
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Configure your website content and contact details
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving || loading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-colors disabled:opacity-50 shadow-sm shadow-emerald-500/20"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Save Settings"}
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-6 h-6 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="space-y-6">
                    {groups.map((group) => (
                        <div
                            key={group.label}
                            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm overflow-hidden"
                        >
                            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                <group.icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white font-display uppercase tracking-wider">
                                    {group.label}
                                </h2>
                            </div>
                            <div className="px-6 py-5 space-y-4">
                                {group.keys.map((key) => {
                                    const isLong =
                                        key.includes("overview") || key.includes("hours");
                                    return (
                                        <div key={key}>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                                {formatLabel(key)}
                                            </label>
                                            {isLong ? (
                                                <textarea
                                                    value={settings[key] || ""}
                                                    onChange={(e) =>
                                                        handleChange(key, e.target.value)
                                                    }
                                                    rows={3}
                                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-none"
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={settings[key] || ""}
                                                    onChange={(e) =>
                                                        handleChange(key, e.target.value)
                                                    }
                                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {extraKeys.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm overflow-hidden">
                            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white font-display uppercase tracking-wider">
                                    Additional Settings
                                </h2>
                            </div>
                            <div className="px-6 py-5 space-y-4">
                                {extraKeys.map((key) => (
                                    <div key={key}>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                            {formatLabel(key)}
                                        </label>
                                        <input
                                            type="text"
                                            value={settings[key] || ""}
                                            onChange={(e) =>
                                                handleChange(key, e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
