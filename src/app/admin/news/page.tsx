"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Newspaper, Search, ImageIcon } from "lucide-react";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  slug: string;
  author?: string;
  featuredImageUrl?: string;
  createdAt?: string;
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/news");
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setArticles(data);
    } catch {
      toast.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Article deleted");
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      toast.error("Failed to delete article");
    }
  };

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase()) ||
      (a.author ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <Newspaper className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                News
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {articles.length} article{articles.length !== 1 && "s"} total
              </p>
            </div>
          </div>
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-600 active:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Article
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500 dark:border-slate-700 dark:border-t-blue-500" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Newspaper className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {search ? "No articles match your search" : "No articles yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-3.5 font-medium text-slate-500 dark:text-slate-400 w-16">
                      Image
                    </th>
                    <th className="px-6 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                      Title
                    </th>
                    <th className="px-6 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                      Author
                    </th>
                    <th className="px-6 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                      Date
                    </th>
                    <th className="px-6 py-3.5 text-right font-medium text-slate-500 dark:text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.map((article) => (
                    <tr
                      key={article.id}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-6 py-4">
                        {article.featuredImageUrl ? (
                          <Image
                            src={article.featuredImageUrl}
                            alt={article.title}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                            unoptimized
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                            <ImageIcon className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {article.title}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 dark:text-slate-400">
                          {article.author || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 dark:text-slate-400">
                          {article.createdAt
                            ? new Date(article.createdAt).toLocaleDateString()
                            : "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/news/${article.id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id, article.title)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-500/20 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
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
      </div>
    </div>
  );
}
