import { NextRequest, NextResponse } from "next/server";
import { readCollection, createItem, updateItem, deleteItem, seedDefaults } from "@/lib/store";
import { defaultTestimonials } from "@/lib/data";

export async function GET(req: NextRequest) {
    try {
        seedDefaults("testimonials", defaultTestimonials);
        const id = req.nextUrl.searchParams.get("id");
        if (id) {
            const { findById } = await import("@/lib/store");
            const item = findById("testimonials", id);
            if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
            return NextResponse.json(item);
        }
        return NextResponse.json(readCollection("testimonials"));
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, role, company, content, rating } = body;
        if (!name || !content) return NextResponse.json({ error: "Name and content required." }, { status: 400 });

        const testimonial = createItem("testimonials", {
            id: "t" + Date.now(),
            name, role: role || "", company: company || "", content, rating: rating || 5,
        });
        return NextResponse.json(testimonial, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name, role, company, content, rating } = body;
        if (!id) return NextResponse.json({ error: "ID is required." }, { status: 400 });

        const updated = updateItem("testimonials", id, {
            ...(name && { name }),
            ...(role !== undefined && { role }),
            ...(company !== undefined && { company }),
            ...(content !== undefined && { content }),
            ...(rating !== undefined && { rating }),
        });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID is required." }, { status: 400 });
        const deleted = deleteItem("testimonials", id);
        if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
