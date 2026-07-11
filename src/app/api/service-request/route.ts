import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createItem } from "@/lib/store";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, companyName, email, phone, serviceId, projectDescription, budget, preferredDate } = body;

        if (!fullName || !email || !phone || !serviceId || !projectDescription) {
            return NextResponse.json(
                { error: "Full name, email, phone, service, and project description are required." },
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

        let serviceExists = false;
        try {
            const service = await db.service.findFirst({
                where: { slug: serviceId },
            });
            serviceExists = !!service;
        } catch {
            console.log("Database unavailable, accepting service request");
        }

        if (!serviceExists) {
            const { defaultServices } = await import("@/lib/data");
            const found = defaultServices.find((s) => s.slug === serviceId);
            if (!found) {
                return NextResponse.json(
                    { error: "Selected service not found." },
                    { status: 400 }
                );
            }
        }

        let serviceDbId: string = serviceId;
        try {
            const service = await db.service.findFirst({
                where: { slug: serviceId },
            });
            if (service) {
                serviceDbId = service.id;
            }
        } catch {
            // Use the slug as fallback
        }

        createItem("serviceRequests", {
            id: "sr" + Date.now(),
            fullName,
            companyName: companyName || null,
            email,
            phone,
            serviceId: serviceDbId,
            projectDescription,
            budget: budget || null,
            preferredDate: preferredDate || null,
            status: "PENDING",
            createdAt: new Date().toISOString(),
        });

        try {
            await db.serviceRequest.create({
                data: {
                    fullName,
                    companyName: companyName || null,
                    email,
                    phone,
                    serviceId: serviceDbId,
                    projectDescription,
                    budget: budget || null,
                    preferredDate: preferredDate || undefined,
                    status: "PENDING",
                },
            });
        } catch {
            console.log("Service request stored locally (database unavailable)");
        }

        return NextResponse.json(
            { message: "Service request submitted successfully. Our team will contact you within 24-48 hours." },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
