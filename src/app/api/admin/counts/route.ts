import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { readCollection } from "@/lib/store";

interface CollectionItem {
    id: string;
}

function count(name: string): number {
    try {
        return readCollection<CollectionItem>(name).length;
    } catch {
        return 0;
    }
}

export async function GET() {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
        services: count("services"),
        programs: count("programs"),
        news: count("news"),
        messages: count("messages"),
        registrations: count("registrations"),
        serviceRequests: count("serviceRequests"),
        testimonials: count("testimonials"),
        team: count("team"),
    });
}
