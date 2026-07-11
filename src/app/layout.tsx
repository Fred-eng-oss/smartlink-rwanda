import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SmartLink Rwanda",
    default: "SmartLink Rwanda - Premium ICT Services, Training & Consultancy",
  },
  description:
    "SmartLink Rwanda bridges the digital divide with expert software development, IT consulting, professional certification trainings, web hosting, and corporate logistics.",
  keywords: [
    "ICT Rwanda",
    "Web Development Kigali",
    "IT Training Kigali",
    "Computer Repair Rwanda",
    "Prisma",
    "Next.js 15",
    "Next.js 16",
    "SmartLink Rwanda",
  ],
  openGraph: {
    title: "SmartLink Rwanda",
    description: "Bridging the technology gap in the digital economy.",
    url: "https://smartlink.rw",
    siteName: "SmartLink Rwanda",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans">
        <ThemeProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
