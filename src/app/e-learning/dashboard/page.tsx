import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { BookOpen, GraduationCap, LogOut, Clock, CheckCircle, BarChart3, Trophy } from "lucide-react";

export const metadata = {
    title: "Student Dashboard",
};

export default async function ELearningDashboardPage() {
    const session = await auth();
    if (!session) {
        redirect("/e-learning/login");
    }

    const enrolledCourses = [
        { name: "Introduction to Web Development", progress: 65, lessons: 12, completed: 8 },
        { name: "Database Fundamentals", progress: 30, lessons: 10, completed: 3 },
        { name: "Networking Basics", progress: 0, lessons: 8, completed: 0 },
    ];

    const upcomingDeadlines = [
        { title: "Web Dev - Assignment 3", date: "July 15, 2026", type: "Assignment" },
        { title: "Database Quiz", date: "July 18, 2026", type: "Quiz" },
        { title: "Networking Lab Submission", date: "July 22, 2026", type: "Lab" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Top Nav */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h1 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                        Student Dashboard
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-500">
                        {session.user.name || session.user.email}
                    </span>
                    <form action="/api/auth/signout" method="post">
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-500 transition-colors uppercase tracking-wider"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
                {/* Welcome */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                        Welcome back, {session.user.name || "Student"}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Continue your learning journey with SmartLink Academy.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm">
                        <div className="p-2.5 bg-indigo-500/10 rounded-xl w-fit mb-4">
                            <BookOpen className="w-5 h-5 text-indigo-500" />
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">3</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Enrolled Courses</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm">
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl w-fit mb-4">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">11</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Lessons Completed</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm">
                        <div className="p-2.5 bg-blue-500/10 rounded-xl w-fit mb-4">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">32%</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Overall Progress</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm">
                        <div className="p-2.5 bg-amber-500/10 rounded-xl w-fit mb-4">
                            <Trophy className="w-5 h-5 text-amber-500" />
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">2</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Quizzes Passed</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Courses */}
                    <div className="lg:col-span-8 space-y-6">
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                            My Courses
                        </h3>
                        <div className="space-y-4">
                            {enrolledCourses.map((course) => (
                                <div key={course.name} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white font-display">
                                            {course.name}
                                        </h4>
                                        <span className="text-xs font-bold text-slate-400">
                                            {course.completed}/{course.lessons} lessons
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-3">
                                        <div
                                            className="bg-indigo-500 h-2.5 rounded-full transition-all"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-400">{course.progress}% complete</span>
                                        <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                            Continue Learning →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                            Upcoming Deadlines
                        </h3>
                        <div className="space-y-3">
                            {upcomingDeadlines.map((item) => (
                                <div key={item.title} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-4 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                                            {item.type}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">{item.title}</h4>
                                    <p className="text-[10px] text-slate-400 font-semibold">{item.date}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 rounded-2xl p-6">
                            <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 mb-2 font-display">
                                E-Learning Portal
                            </h4>
                            <p className="text-xs text-blue-700/80 dark:text-blue-300/70 leading-relaxed">
                                Your courses, quizzes, and progress tracking are available here. Complete lessons and pass quizzes to earn your SmartLink certification.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
