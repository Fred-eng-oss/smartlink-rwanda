import { NextRequest, NextResponse } from "next/server";
import { readCollection, createItem, updateItem, deleteItem, seedDefaults } from "@/lib/store";
import { defaultNews } from "@/lib/data";

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET(req: NextRequest) {
    try {
        seedDefaults("news", defaultNews);
        const id = req.nextUrl.searchParams.get("id");
        if (id) {
            const { findById } = await import("@/lib/store");
            const item = findById("news", id);
            if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
            return NextResponse.json(item);
        }
        return NextResponse.json(readCollection("news"));
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, slug, summary, content, author, featuredImageUrl } = body;
        if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });

        const article = createItem("news", {
            id: "n" + Date.now(),
            title,
            slug: slug || slugify(title),
            summary: summary || "",
            content: content || "",
            author: author || "Admin",
            featuredImageUrl: featuredImageUrl || "",
            createdAt: new Date().toISOString(),
        });
        return NextResponse.json(article, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, title, slug, summary, content, author, featuredImageUrl } = body;
        if (!id) return NextResponse.json({ error: "ID is required." }, { status: 400 });

        const updated = updateItem("news", id, {
            ...(title && { title }),
            ...(slug && { slug }),
            ...(summary !== undefined && { summary }),
            ...(content !== undefined && { content }),
            ...(author !== undefined && { author }),
            ...(featuredImageUrl !== undefined && { featuredImageUrl }),
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
        const deleted = deleteItem("news", id);
        if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
