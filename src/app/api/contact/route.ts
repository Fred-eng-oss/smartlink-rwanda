import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createItem } from "@/lib/store";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, email, phone, subject, content } = body;

        if (!fullName || !email || !subject || !content) {
            return NextResponse.json(
                { error: "Full name, email, subject, and message are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        createItem("messages", {
            id: "msg" + Date.now(),
            fullName,
            email,
            phone: phone || null,
            subject,
            content,
            isRead: false,
            createdAt: new Date().toISOString(),
        });

        try {
            await db.message.create({
                data: {
                    fullName,
                    email,
                    phone: phone || null,
                    subject,
                    content,
                    isRead: false,
                },
            });
        } catch {
            console.log("Message stored in memory (database unavailable)");
        }

        return NextResponse.json(
            { message: "Your message has been received. We will get back to you soon." },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
