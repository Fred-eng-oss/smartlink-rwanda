import { NextRequest, NextResponse } from "next/server";
import { readCollection, deleteItem } from "@/lib/store";

export async function GET() {
    try {
        const messages = readCollection("messages");
        return NextResponse.json(messages);
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Message id is required." }, { status: 400 });
        }

        const deleted = deleteItem("messages", id);
        if (!deleted) {
            return NextResponse.json({ error: "Message not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Message deleted successfully." });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
