import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { BookOpen, GraduationCap, LogOut, Clock, Award, BarChart3, CheckCircle, Calendar } from "lucide-react";

export const metadata = {
    title: "Student Dashboard",
};

export default async function ELearningDashboardPage() {
    const session = await auth();
    if (!session) {
        redirect("/e-learning/login");
    }

    const studentName = session.user.name || "Student";

    const stats = [
        {
            label: "Enrolled Courses",
            value: "3",
            icon: BookOpen,
            iconBg: "#0F62FE15",
            iconColor: "#0F62FE",
        },
        {
            label: "Completed",
            value: "11",
            icon: CheckCircle,
            iconBg: "#00A86B15",
            iconColor: "#00A86B",
        },
        {
            label: "Hours Learned",
            value: "48",
            icon: Clock,
            iconBg: "#F59E0B15",
            iconColor: "#F59E0B",
        },
        {
            label: "Certificates",
            value: "2",
            icon: Award,
            iconBg: "#0F62FE15",
            iconColor: "#0F62FE",
        },
    ];

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
        <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
            <header className="bg-white border-b shadow-sm" style={{ borderColor: "#E5E7EB" }}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl" style={{ backgroundColor: "#00A86B15" }}>
                            <GraduationCap className="w-5 h-5" style={{ color: "#00A86B" }} />
                        </div>
                        <div>
                            <h1 className="text-lg font-extrabold font-display" style={{ color: "#1F2937" }}>
                                Student Dashboard
                            </h1>
                            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#6B7280" }}>
                                SmartLink E-Learning
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold font-display" style={{ color: "#1F2937" }}>
                                {studentName}
                            </p>
                            <p className="text-[10px] font-semibold" style={{ color: "#6B7280" }}>
                                {session.user.email}
                            </p>
                        </div>
                        <div className="w-px h-8" style={{ backgroundColor: "#E5E7EB" }} />
                        <form action="/api/auth/signout" method="post">
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors hover:bg-red-50"
                                style={{ color: "#6B7280" }}
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
                <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold font-display" style={{ color: "#1F2937" }}>
                        Welcome back, {studentName}
                    </h2>
                    <p className="text-sm font-sans" style={{ color: "#6B7280" }}>
                        Continue your learning journey with SmartLink Academy.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                                style={{ border: "1px solid #E5E7EB" }}
                            >
                                <div
                                    className="p-2.5 rounded-xl w-fit mb-4"
                                    style={{ backgroundColor: stat.iconBg }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: stat.iconColor }} />
                                </div>
                                <p className="text-2xl font-extrabold font-display" style={{ color: "#1F2937" }}>
                                    {stat.value}
                                </p>
                                <p className="text-xs font-bold uppercase tracking-wider mt-1 font-sans" style={{ color: "#6B7280" }}>
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-6">
                        <h3 className="text-lg font-extrabold font-display" style={{ color: "#1F2937" }}>
                            My Courses
                        </h3>
                        <div className="space-y-4">
                            {enrolledCourses.map((course) => (
                                <div
                                    key={course.name}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                                    style={{ border: "1px solid #E5E7EB" }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-bold text-sm font-display" style={{ color: "#1F2937" }}>
                                            {course.name}
                                        </h4>
                                        <span className="text-xs font-bold" style={{ color: "#6B7280" }}>
                                            {course.completed}/{course.lessons} lessons
                                        </span>
                                    </div>
                                    <div className="w-full rounded-full h-2.5 mb-3" style={{ backgroundColor: "#E5E7EB" }}>
                                        <div
                                            className="h-2.5 rounded-full transition-all"
                                            style={{ width: `${course.progress}%`, background: course.progress > 0 ? "linear-gradient(135deg, #00A86B, #0F62FE)" : "#E5E7EB" }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold" style={{ color: "#6B7280" }}>
                                            {course.progress}% complete
                                        </span>
                                        <button
                                            className="text-xs font-bold hover:underline"
                                            style={{ color: "#00A86B" }}
                                        >
                                            Continue Learning →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-lg font-extrabold font-display" style={{ color: "#1F2937" }}>
                            Upcoming Deadlines
                        </h3>
                        <div className="space-y-3">
                            {upcomingDeadlines.map((item) => (
                                <div
                                    key={item.title}
                                    className="bg-white rounded-2xl p-4 shadow-sm"
                                    style={{ border: "1px solid #E5E7EB" }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-3.5 h-3.5" style={{ color: "#F59E0B" }} />
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-wider"
                                            style={{ color: "#F59E0B" }}
                                        >
                                            {item.type}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-xs mb-1" style={{ color: "#1F2937" }}>
                                        {item.title}
                                    </h4>
                                    <p className="text-[10px] font-semibold" style={{ color: "#6B7280" }}>
                                        {item.date}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div
                            className="rounded-2xl p-6"
                            style={{ backgroundColor: "#00A86B10", border: "1px solid #00A86B20" }}
                        >
                            <h4 className="font-bold text-sm mb-2 font-display" style={{ color: "#00A86B" }}>
                                E-Learning Portal
                            </h4>
                            <p className="text-xs leading-relaxed font-sans" style={{ color: "#6B7280" }}>
                                Your courses, quizzes, and progress tracking are available here. Complete lessons and pass quizzes to earn your SmartLink certification.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
