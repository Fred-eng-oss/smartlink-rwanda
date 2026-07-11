"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, Eye, Search, X, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

interface Message {
    id: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Message | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    async function fetchMessages() {
        try {
            const res = await fetch("/api/admin/messages");
            const data = await res.json();
            setMessages(Array.isArray(data) ? data : []);
        } catch {
            toast.error("Failed to load messages.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this message? This cannot be undone.")) return;
        setDeleting(id);
        try {
            const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setMessages((prev) => prev.filter((m) => m.id !== id));
            toast.success("Message deleted.");
        } catch {
            toast.error("Failed to delete message.");
        } finally {
            setDeleting(null);
        }
    }

    const filtered = messages.filter(
        (m) =>
            m.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            m.email?.toLowerCase().includes(search.toLowerCase()) ||
            m.subject?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl text-blue-500 bg-blue-500/10">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                            Messages
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {messages.length} total message{messages.length !== 1 && "s"}
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 w-64"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                            <MessageSquare className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                            {messages.length === 0
                                ? "No messages yet."
                                : "No messages match your search."}
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
                                        Subject
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
                                {filtered.map((msg) => (
                                    <tr
                                        key={msg.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {msg.fullName}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {msg.email}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                                            {msg.subject}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                                            {msg.createdAt
                                                ? new Date(msg.createdAt).toLocaleDateString()
                                                : "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelected(msg)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    disabled={deleting === msg.id}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-extrabold text-slate-900 dark:text-white font-display">
                                Message Details
                            </h3>
                            <button
                                onClick={() => setSelected(null)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        From
                                    </p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {selected.fullName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        Email
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        {selected.email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        Subject
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        {selected.subject}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        Date
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        {selected.createdAt
                                            ? new Date(selected.createdAt).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              })
                                            : "—"}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Message
                                </p>
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                                    {selected.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
