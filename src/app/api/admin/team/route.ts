import { NextRequest, NextResponse } from "next/server";
import { readCollection, createItem, updateItem, deleteItem, seedDefaults } from "@/lib/store";
import { defaultTeam } from "@/lib/data";

export async function GET(req: NextRequest) {
    try {
        seedDefaults("team", defaultTeam);
        const id = req.nextUrl.searchParams.get("id");
        if (id) {
            const { findById } = await import("@/lib/store");
            const item = findById("team", id);
            if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
            return NextResponse.json(item);
        }
        return NextResponse.json(readCollection("team"));
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, role, bio, imageUrl, email, phone } = body;
        if (!name || !role) return NextResponse.json({ error: "Name and role required." }, { status: 400 });

        const member = createItem("team", {
            id: "tm" + Date.now(),
            name, role, bio: bio || "", imageUrl: imageUrl || "", email: email || "", phone: phone || "",
        });
        return NextResponse.json(member, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name, role, bio, imageUrl, email, phone } = body;
        if (!id) return NextResponse.json({ error: "ID is required." }, { status: 400 });

        const updated = updateItem("team", id, {
            ...(name && { name }),
            ...(role !== undefined && { role }),
            ...(bio !== undefined && { bio }),
            ...(imageUrl !== undefined && { imageUrl }),
            ...(email !== undefined && { email }),
            ...(phone !== undefined && { phone }),
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
        const deleted = deleteItem("team", id);
        if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
