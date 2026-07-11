import { NextRequest, NextResponse } from "next/server";
import { readCollection, updateItem } from "@/lib/store";

export async function GET() {
    try {
        const serviceRequests = readCollection("serviceRequests");
        return NextResponse.json(serviceRequests);
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "Id and status are required." }, { status: 400 });
        }

        const updated = updateItem("serviceRequests", id, { status } as any);
        if (!updated) {
            return NextResponse.json({ error: "Service request not found." }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
