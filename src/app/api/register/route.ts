import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createItem } from "@/lib/store";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, gender, dob, email, phone, address, programId } = body;

        if (!fullName || !gender || !dob || !email || !phone || !address || !programId) {
            return NextResponse.json(
                { error: "All fields are required." },
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

        let programExists = false;
        try {
            const program = await db.program.findFirst({
                where: { slug: programId },
            });
            programExists = !!program;
        } catch {
            console.log("Database unavailable, accepting registration");
        }

        if (!programExists) {
            const { defaultPrograms } = await import("@/lib/data");
            const found = defaultPrograms.find((p) => p.slug === programId);
            if (!found) {
                return NextResponse.json(
                    { error: "Selected program not found." },
                    { status: 400 }
                );
            }
        }

        let programDbId: string = programId;
        try {
            const program = await db.program.findFirst({
                where: { slug: programId },
            });
            if (program) {
                programDbId = program.id;
            }
        } catch {
            // Use the slug as fallback
        }

        createItem("registrations", {
            id: "reg" + Date.now(),
            fullName,
            gender,
            dob,
            email,
            phone,
            address,
            programId: programDbId,
            status: "PENDING",
            createdAt: new Date().toISOString(),
        });

        try {
            await db.registration.create({
                data: {
                    fullName,
                    gender,
                    dob: new Date(dob),
                    email,
                    phone,
                    address,
                    programId: programDbId,
                    status: "PENDING",
                    passportPhoto: null,
                },
            });
        } catch {
            console.log("Registration stored locally (database unavailable)");
        }

        return NextResponse.json(
            { message: "Registration submitted successfully. We will contact you within 48 hours." },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
