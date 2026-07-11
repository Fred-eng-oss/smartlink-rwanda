import { NextRequest, NextResponse } from "next/server";
import { readCollection, createItem, updateItem, deleteItem, seedDefaults } from "@/lib/store";
import { defaultServices } from "@/lib/data";

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET(req: NextRequest) {
    try {
        seedDefaults("services", defaultServices);
        const id = req.nextUrl.searchParams.get("id");
        if (id) {
            const { findById } = await import("@/lib/store");
            const item = findById("services", id);
            if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
            return NextResponse.json(item);
        }
        const services = readCollection("services");
        return NextResponse.json(services);
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, slug, description, benefits, process, features } = body;
        if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });

        const service = createItem("services", {
            id: "s" + Date.now(),
            name,
            slug: slug || slugify(name),
            description: description || "",
            benefits: benefits || [],
            process: process || [],
            features: features || [],
        });
        return NextResponse.json(service, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name, slug, description, benefits, process, features } = body;
        if (!id) return NextResponse.json({ error: "ID is required." }, { status: 400 });

        const updated = updateItem("services", id, {
            ...(name && { name }),
            ...(slug && { slug }),
            ...(description !== undefined && { description }),
            ...(benefits !== undefined && { benefits }),
            ...(process !== undefined && { process }),
            ...(features !== undefined && { features }),
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
        const deleted = deleteItem("services", id);
        if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
